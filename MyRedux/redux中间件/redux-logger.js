export default logger=({dispatch,getState})=>(next)=>(action)=>{
    console.log(getState());
    next(action);
    console.log(getState());
}