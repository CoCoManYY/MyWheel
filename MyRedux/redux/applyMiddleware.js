export default function(middleware){
    return (createStore)=>(reducer)=>{//高阶函数
        //取出原始的dispatch方法
        const store=createStore(reducer);
        let dispatch=store.dispatch;

        //包装dispatch
        const middlewareAPI={
            getState:store.getState,
            dispatch:(action)=>dispatch(action)
        }
        let mid=middleware(middlewareAPI);
        dispatch=mid(store.dispatch);

        //使用包装后的dispatch覆盖store.dispatch返回新的store对象
        return{
            ...store,
            dispatch
        }
    }
}
//中间件
let logger=({dispatch,getState})=>(next)=>(action)=>{//高阶函数
        console.log(getState());
        next(action);
        console.log(getState());
}
//reducer函数
function reducer(state,action){
    if(!state) state={count:0};
    console.log(action);
    switch(action.type){
        case 'add':
            return {...state,count:++state.count};
        case 'sub':
            return {...state,count:--state.count};
        default:
            return state;
    }
}

const store=createStore(reducer,applyMiddleware(logger));