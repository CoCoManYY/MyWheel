import compose from './compose';
import createStore from './createStore';

export default function applyMiddleware(...middlewares){
    (createStore)=>(reducer)=>{
        const store=createStore(reducer);
        let dispatch=store.dispatch;
        let chain=[];

        const middlewareAPI={
            getState:store.getState,
            dispatch:(action)=>dispatch(action)
        }
        chain=middlewares.map(middleware=>middleware(middlewareAPI));
        dispatch=compose(...chain)(store.dispatch);

        return {
            ...store,
            dispatch
        }
    }
}

let loggerone=({dispatch,getState})=>(next)=>(action)=>{
    console.log("loggerone:", getState());
    next(action)
    console.log("loggerone:", getState())
}
let loggertwo=({dispatch,getState})=>(next)=>(action)=>{
    console.log("loggerone:", getState());
    next(action)
    console.log("loggerone:", getState())
}
const store=createStore(reducer,applyMiddleware([loggerone,loggertwo]))