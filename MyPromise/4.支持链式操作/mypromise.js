//三种状态
const PENDING ='pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn){
    let self = this;
    self.value=null;
    self.error=null;
    self.status=PENDING;
    self.onFulfilled=null;
    self.onRejected=null;
    self.onFulfilledCallbacks=[];
    self.onRejectedCallbacks=[];

    function resolve(value){
        if(self.status===PENDING)
        setTimeout(()=>{
            self.value=value;
            console.log(self.onFulfilledCallbacks);
            self.onFulfilledCallbacks.forEach((callback) => callback(self.value));
        },0)
    }
    function reject(error){
        if(self.status===PENDING)
        setTimeout(() => {
            self.error=error;
            self.onRejectedCallbacks.forEach((callback) => callback(self.error));
        }, 0);
    }
    
    //调用回调函数
    fn(resolve,reject);
}

MyPromise.prototype.then=function(onFulfilled,onRejected){
    if(this.status===PENDING){
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
    }else if(this.status===FULFILLED){
        onFulfilled(this.value);
    }else{
        onRejected(this.value);
    }
    //注意返回了一个promise
    return this;
}

module.exports= MyPromise;