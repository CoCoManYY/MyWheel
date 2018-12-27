//其中wacher是存入subs数组里面的一个个元素
let Watcher= function(object,getter,callback){
    this.obj=object;
    this.getter=getter;
    this.cb=callback;
    this.deps=[];
    this.value=undefined;

    this.get=function(){
        Dep.target=this;
        let value=this.getter.call(object)//有个object、get操作
        Dep.target=null;
        return value;
    }

    this.update=function(){
        const value=this.getter.call(object);
        const oldValue=this.value;
        this.value=value;
        this.cb.call(this.obj,value,oldValue);
    }
    this.addDep=function(dep){
        this.deps.push(dep);
    }
    //新调节的取消依赖的方法
    this.teardown=function(){
        let i=this.deps.length;
        while(i--){
            this.deps[i].removeSub(this)
        }
        this.deps=[];
    }
    this.value=this.get();
}


let Dep=function(){
    this.subs=[];
    this.addSub=function(sub){
        this.subs.push(sub);
    }
    this.removeSub=function(sub){
        const index=this.subs.indexOf(sub);
        if(index>-1){
            this.subs.splice(index,1)
        }
    }
    this.notify=function(){
        this.subs.forEach(watcher => {
            watcher.update();
        });
    }
}

Dep.target=null;

let defineReactive=function(object,key,value){
    let dep=new Dep();
    Object.defineProperty(object,key,{
        configurable:true,
        enumerable:true,
        get:function(){
            if(Dep.target){
                dep.addSub(Dep.target)
                // 添加 watcher 对 dep 的引用
                Dep.target.addDep(dep)
            }
            return value;
        },
        set: function(newValue){
            if(newValue!=value){
                value=newValue;
                dep.notify();
            }
        }
    })
}

let object={};
defineReactive(object,'num1',2);
defineReactive(object,'num2',4);
let watcher=new Watcher(object,function(){
    return this.num1+this.num2
},function(newValue,oldValue){
    console.log(`这是一个监听函数，${object.num1} + ${object.num2} = ${newValue}`)
});
let watcher2=new Watcher(object,function(){
    return  this.num1*this.num2
},function(newValue,oldValue){
    console.log(`这是一个监听函数，${object.num1} * ${object.num2} = ${newValue}`);
});
object.num1=4;
object.num2=11;

//测试取消
watcher2.teardown();
object.num1=5;
object.num2=12;