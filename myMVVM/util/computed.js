import Watcher from './Watcher';

function noop(){

}

let uid=0;

export default class Computed{
    constructor(ctx,key,option){
        this.uid=uid++;
        this.key=key;
        this.option=option
        this.ctx=ctx;
        this._init();
    }

    _init(){
        let watcher=new Watcher(
            this.ctx,
            this.option.get||noop,
            noop,
            //告诉Watcher来一个lazy Watcher
            {lazy:true}
        )

        Object.defineProperty(this.ctx,this.key,{
            enumerable:true,
            configurable:true,
            set:this.option.set||noop,
            get(){
                if(watcher.dirty){
                    watcher.evaluate();
                }
                return watcher.value;
            }
        })
    }
}