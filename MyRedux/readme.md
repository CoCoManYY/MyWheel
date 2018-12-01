## react图例
![](https://github.com/CoCoManYY/MyWheel/blob/master/MyRedux/redux%E5%9B%BE%E4%BE%8B.jpg?raw=true)
## createStore
1. 首先定义两个变量，一个state，一个是listener，state用来存放全局状态，listeners用来存储状态发生变化的回调函数。
2. 定义三个方法，subscribe、getstate、dispatch。
3. 定义一个初始化函数，最后法案回一个store对象。
## combineReducer
使用一个conbineReducers方法将所有reducer合并成一个，方便传给createStore方法。
## bindActionCreators
这是redux提供的一种辅助方法，能够让我们以方法的形式来调用action。
**小知识**：JavaScript函数永远不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型。因为JavaScript的参数在内部是用一个数组来表示的。函数接受到的始终是这个数组，而不关心数组包含了多少元素和参数。**argument对象知识与数组类似，不是array的实例**
## compose
compose方法是redux里面的一个辅助方法，其作用是把一些列的函数，组装成一个新的函数，并且使从后到前依次执行的，后面函数的执行结果作为前一个函数执行的参数。（嵌套执行）。
核心代码：
```
function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}`
```
举个例子：
```
let composeFn = compose(fn1, fn2, fn3, fn4)
let b = composeFn(x)
```
主要利用了Array的reduce方法：

|第几轮循环|a的值|b的值|返回的值|
|-|-|-|-|
|第一轮循环|fn1|fn2|(...args)=>fn1(fn2(...args))|
|第二轮循环|fn1(fn2(...args))|fn3|(...args)=>fn1(fn2(fn3(...args)))|
|第一轮循环|fn1(fn2(fn3(...args)))|fn4|fn1(fn2(fn3(fn4((...args))))|
## applyMiddleware
### 单个中间件
总的来说applyMiddleware方法是用来改造dispatch来增强功能的
**大致做成过程**：当我们执行```const store = createStore(reducer,applyMiddleware(logger))```时，首先```applyMiddleware(logger)```执行，将logger存在闭包里，然后返回了一个接收createStore方法的函数，并作为第二个参数传入createStore方法。因为有了第二个参数，就会执行这段代码：
```
if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer)
}
```
我们继续执行的时刚刚返回的函数，把createStore函数存到了它的闭包里面，返回一个函数，传入参数reducer，最终返回reducer参数的结果。

**其实最主要的是最后函数内部封装了dispatch并且覆盖store对象中的原始方法**
### 多个中间件
 多个中间件主要就是利用了一个chain数组装上所有中间件将```{dispatch，getSate}```传入闭包后的返回函数，然后再采用之前实现的函数compose进行层次封装。如下图所示
![](https://github.com/CoCoManYY/MyWheel/blob/master/MyRedux/%E5%A4%9A%E4%B8%AA%E4%B8%AD%E9%97%B4%E4%BB%B6.jpg?raw=true)

## 一些中间件的实现（redux-logger、redux-thunk、redux-promise）
**实现redux-thunk时**是判断如果传入function就执行这个function，否则```next(action)```。
**实现redux-promise时**同理，当action或action的payload上面有then方法时，我们认为它是promise对象，就让dispatch到promise的then里面再执行，直到dispatch提交的action没有then方法，我们认为他不是promise了，就可以执行next(action)交给下一个中间件执行了。*dispatch是更新后的那个dispatch*在applyMiddleware.js可以看到：
```
//包装dispatch
const middlewareAPI={
    getState:store.getState,
    dispatch:(action)=>dispatch(action)
}
let mid=middleware(middlewareAPI);
dispatch=mid(store.dispatch);
```
