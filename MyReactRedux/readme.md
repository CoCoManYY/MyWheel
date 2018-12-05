## provider
首先我们看一下provider，它是一个高阶组件，我们可以看到使用它时将包裹在跟组建的外边，并且store作为它的props传入禁区，它的作用就是将自己作为所有组件的根组件，然后将store挂载到它的context上，让它下面的所有子组件都可以共享全局状态。
## connect
如果仅仅只用provider行不行，当然可以，因为store已经挂载到了根组件上的context，所有子组件都可以通过context访问到store，然后使用store里的状态，并且用store的dispatch提交action更新状态，但是这样还是有些不便利，因为每个组件都对context的依赖过强，造成了组件与store打交道的逻辑和组建本身逻辑都耦合了一起，使得组件无法复用。
**我们的理想状态:**让组件与store打交道的部分放在外层组件，内层组件只负责自身的逻辑
![](https://github.com/CoCoManYY/MyWheel/blob/master/MyReactRedux/connect%E7%A4%BA%E4%BE%8B.jpg?raw=true)
**一个组件的渲染应该只依赖于外界传进去的props和自己的state，而并不依赖于其他外界的任何数据，这样的组件复用性是最强的。**
#### 具体实现步骤：
1. 首先接受```mapStateToProps```，```mapDispatchToProps```并返回一个函数，返回的函数接受一个组件。
2. 声明一个壳组件，我们可以通过context拿到store对象。
3. 在constructor里通过传进来的```mapStateToProps```是函数把组建尸体想要的状态通过上一步拿到的store对象里面的```getState```方法拿到并存在壳组件的state上。
4. 在壳组件```componentWillMount```的生命周期中注册当store状态发生变化的回掉函数：store变化，同步更新自己的state为最新的状态，与store上的状态保持一致。
5. 将组件要使用```dispatch```提交的相关action都封装成函数。
6. 将壳组件state上的所有属性以及上一步所有已经封装成函数的action都通过props的方法传给组件实体。
7. 最后，把包装后的组件返回出去，这是我们就可以使用```this.props.username```的方法获取store上面的状态，或者使用```this.props.userinfoActions,login(data)```的方法来提交action，此时组件与store打交道的逻辑和组件自身的逻辑分开，内部组件实体可以进行复用。