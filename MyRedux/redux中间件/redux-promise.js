export default promise =({getState,dispatch})=>(next)=>(action)=>{
    if(action.then){//是否thenable,是不是promise
        action.then(dispatch);
    }else if(action.payload&&action.payload.then){
        action.payload.then(payload=>dispatch({...action,payload}),payload=>dispatch({...action,payload}));
    }else{
        next(action);
    }
}