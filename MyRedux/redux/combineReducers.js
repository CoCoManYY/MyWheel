export default combineReducers=reducers=>(state={},action)=>{
    let currentState={};
    for(let key in reducers){
        currentState[key]=reducers[key](state[key],action);
    }
    return currentState;
}