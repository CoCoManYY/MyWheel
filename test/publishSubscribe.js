function PubSub(){
    this.handlers={};
}
PubSub.prototype={
    on: function(type,handle){
        if(!this.handlers[type]){
            this.handlers[type]=[];
        }
        this.handlers[type].push(handle);
    },
    emit: function(type,...args){
        if(!this.handlers[type]){
            return false;
        }
        for(let i=0;i<this.handlers[type].length;i++){
            this.handlers[type][i].apply(this,args);
        }
    },
    off: function(type,handle){
        let value=this.handlers[type];
        if(value){
            if(handle){
                value.every((el,index)=>{
                    if(el===handle){
                        value.splice(index,1);
                        return false;
                    }
                })
            }else{
                value.length=0;
            }
        }
    }
}

//数组需要break的时候可以利用every和some，还可以利用其返回值进行后续判断                                                    