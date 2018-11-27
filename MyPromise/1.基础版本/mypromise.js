function MyPromise(fn){
    let self=this;//一定要先缓存起来
    self.value=null;
    self.error=null;
    self.onFulfilled=null;
    self.onRejected=null;

    function resolve(value){
        self.value=value;
        self.onFulfilled(self.value);
    }
    function reject(error){
        self.error=error;
        self.onRejected(self.error);
    }
    fn(resolve,reject);
}

MyPromise.prototype.then=function(onFulfilled,onRejected){
    //注册成功或失败的回调函数
    this.onFulfilled=onFulfilled;
    this.onRejected=onRejected;
}
module.exports=MyPromise;