export default thunk= ({getState,dispatch})=>(next)=>(action)=>{
    if(typeof action=='function'){
        action(dispatch,getState);
    }else{
        next(action);
    }
}