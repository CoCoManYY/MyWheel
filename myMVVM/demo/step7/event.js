let uid=0;
export class Event{
    constructor(){
        this.id=++uid;
        this._events={}
    }
    $on(eventName,fn){
        let object=this;
        (object._events[eventName]||(object._events[eventName]=[])).push(fn);
        return object;
    }

    $off(eventName){
        let object=this
        const cbs=object._events[eventName];
        if(cbs){
            object._events[eventName]=null;
        }
        return object;
    }

    $once(eventName,fn){
        let object=this;
        function on(){
            // 先取消，然后触发
            object.$off(eventName);
            fn.apply(object,arguments);
        }
        // on.fn=fn;//把fn放到自己的作用域
        object.$on(eventName,on);
        return object;
    }

    $emit(eventName, ...args) {
        let object = this
        let cbs = object._events[eventName]
        if (cbs) {
            cbs.forEach(func => func.apply(object, args))
        }
        return object
    }

}