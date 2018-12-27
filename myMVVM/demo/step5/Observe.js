import Dep from './Dep';
export class Observe{
    constructor(value){
        this.value=value;
        this.walk(value);
        // 标志这个独享已经被遍历过了，同时要保存observer
        Object.defineProperty(value,'__ob__',{
            value:this,
            enumerable:false,//nice
            writable:true,
            configurable:true
        })
    }

    walk(obj){
        const keys=Object.keys(obj);//返回一个包含所有给定对象自身可枚举属性名称的数组。
        for(let i=0;i<keys.length;i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
}
//确保一个对象下的Observer实例仅被实例化一次
export function observe(value){
    //确保obseerve为一个对象
    if(typeof value!== 'object'){
        return ;
    }
    let ob;
    if(value.hasOwnProperty('__ob__')&&value.__ob__ instanceof Observe){
        ob=value.__ob__;
    }else if(Object.isExtensible(value)){
        ob=new Observe(value);
    }
    return ob;
}

export function defineReactive(object,key,value){
    let dep=new Dep();
    // 遍历value下面的属性
    observe(value);
    Object.defineProperty(object,key,{
        configurable:true,
        enumerable:true,
        get: function(){
            if(Dep.target){
                dep.addSub(Dep.target);
                Dep.target.addDep(dep);
            }
            return value;
        },
        set:function(newValue){
            if(newValue!=value){
                value=newValue;
                dep.notify();
            }
        }
    })
}