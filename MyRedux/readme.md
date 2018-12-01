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
