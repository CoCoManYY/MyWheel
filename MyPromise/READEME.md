## mypromise
### 基础版本
- **首先定义类**：其中包括成功的值、错误的原因以及相应的回掉函数四个变量；紧接着声明两个函数：分别为成功状态的函数和失败状态的函数；再调用回调函数读取文件。
- 再在其原型链上then方法注册 当resolve(成功)/reject(失败)的回调函数
- 在测试代码中通过判断条件来进行resolve/reject的调用，改变promise实例的状态。


**问题**：1. 为什么一定要先将实例缓存起来？例如在resolve函数中的this指向本函数而不是promise对象了

### 支持串行异步任务
想了好久才想明白，算是较为理透了promise的原理。其实总的来说我觉得promise就是让天生异步的JavaScript能够不要那么放荡不羁，按一定的顺序执行。
整个代码十分的绕，理清楚不是很容易，其中还发现了Array.foreach是同步的（虽然这个和整个代码没有什么较大的关系）。
一条条理：
##### 最主要的路径
最主要的路径也是最宏观的路径，也就是代码
```
promise.then(f1).then(f2).then(f3).catch(errorLog);	
```
执行的这一段。
- 首先我们使用then方法将f1注册为promise成功的回调函数，将f1函数push进了promise对象的```onFulfilledCallbacks```数组里面，这时我们的then函数会为我们新返回一个```BridgePromise```，这也就是```promise.then(f1)```这个新的promise命名为P1，然后再在P1里面进行then方法注册P1成功的回掉函数，将f2函数push进了P1对象的```onFulfilledCallbacks```数组里面，这是我们的then函数又会给我们新返回一个```BridgePromise```，这也就是```promise.then(f1)```这个新的promise，我们命名为P2，后面的便以此类推。
- 这样我们promise状态改变（比如resolve）之后，会调用then方法中注册的回调函数f1方法，可以改变P1里面的状态，P1里面的f2可以改变P3里面的状态······这样就将他们串联成功了。
更加直观的方式，可以看一下下面这张图片

![](https://github.com/CoCoManYY/MyWheel/blob/master/MyPromise/5.%E6%94%AF%E6%8C%81%E4%B8%B2%E8%A1%8C%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/%E5%9B%BE%E4%BE%8B.jpg?raw=true)

##### 回调中的异步路径
这一段还是比较难理解的，也就是，我们回调函数f1是这么写的：
```
let f1=function(data){
    console.log(data);
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../file/2.txt'),'utf8',function(err,data){
            err?reject(err):resolve(data);
        });
    });
}
```
我们then注册的函数是这么写的：
```
let x =onFulfilled(value);
resolvePromise(bridgePromise,x,resolve,reject);
```

当我们当前主路径中的promise成功执行，并且调用resolve之后，我们会调用开始注册的f1方法，我们可以看到它的返回值并不是一个简单的正常数值，而是一个promise！！！（又开始异步了哭哭），这个时候我们就需要一个resolvePromise的函数来判断一波此次回调函数的返回值：
```
function resolvePromise(bridgePromise,x,resolve,reject){
    if(x instanceof MyPromise){
        if(x.status===PENDING){
            x.then(y=>{
                resolvePromise(bridgePromise,y,resolve,reject);
            },error=>{
                reject(error);
            });
        }else{
            x.then(resolve,reject);
        }
    }else{
        resolve(x);
    }
}
``` 
**这个函数里面传入了P1的resolve和reject函数，不管传多少层下去，resolvePromise都是P1的回调函数**这个一定要弄清楚。
如果我们传进来的x是一个pending状态的promise，那么我们就调用x的then方法给它注册回掉函数，如果成功就解析以下它resolve了什么值，如果还是promise就继续调用then，直到，resolve的值是一个正常值为止。
这是我们f1中返回的promise返回了一个正常值，我们需要的便是调用P1中的resolve函数将正常值作为参数，此时P1执行成功便会调用之前注册的f2函数，如此便可顺利进行下去。
#### reject线
刚刚把resolve这条线走通了，我们现在来看看reject。
1. 我们首先需要注意到，我们执行fn以及之侧的回调函数等等都会使用try-catch来包裹，无论哪里会有异常，我们都会进入reject分支。
2. 进入reject分支之后，我们会要执行```onRejectedCallbacks```里面的函数，**还记得吗？then方法在开始时如果onReject函数缺省则会直接```{throw error}```哦。所以错误就会一直一直往后抛，一直到最后抛到catch。
3. 哦，catch在这里只是一个语法糖，它也是调用一个then的方法，但是只传onReject函数！我们来see see
```
MyPromise.prototype.catch=function(onRejected){
    return this.then(null,onRejected);
}
```


#### 感想
这个让我真的绕了很久，一开始以为是同步异步的问题，后来才发现是逻辑的问题。写在这里避免忘记！
**重点**：
1. 一定要在then注册时返回一个新的promise，这样才能保证串行且异步的任务的顺序执行。
2. 注意要进行对回掉函数返回结果的处理，因为需要主要路径中的promise它resolve的参数需要正常值。
3. error是冒泡出来的~
### 达到promise/A+的标准
参考[promise/A+标准](https://segmentfault.com/a/1190000002452115)

