Function.prototype.myBind=function(context){
    //返回一个函数
    if(typeof this !=='function'){
        throw new TypeError('err');
    }
    context=context||window;
    const args=[...arguments].slice(1);
    const _this=this;//可以直接挂在一个变量上面
    return function F(){
        if(this instanceof F){//如果调用new会进入当前分支
            return new _this(...args,...arguments);
        }
        return _this.apply(context,args.concat(arguments));
    }

}