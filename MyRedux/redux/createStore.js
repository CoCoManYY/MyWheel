export default function createStore(reducer,enhancer){
    //支持中间件
    if(typeof enhancer!=='undefined'){
        return enhancer(createStore)(reducer);
    }
    let state=null//用来存储全局状态
    let listeners =[];//用来存储状态发生变化时的回掉函数数组

    const  subscribe=(listener)=>{//注册回掉函数
        listeners.push(listener);
    }
    const getState=()=>state;//获取最新的全局状态
    const dispatch=(action)=>{
        state=reducer(state,action)//生成新的state
        listeners.forEach((listener)=>listener())//执行回调函数
    }
    dispatch({});//初始化全局状态
    return {
        getState,
        dispatch,
        subscribe
    }
}