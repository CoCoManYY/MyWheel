function MyPromise(fn){
    let self =this;
    self.value=null;
    self.error=null;
    self.onFulfilled=null;
    self.onRejected=null;
    
    function resolve(value){
        setTimeout(()=>{
            self.value=value;
            self.onFulfilled(self.value);
        },0);
    };
    function reject(err){
        setTimeout(()=>{
            self.error=err;
            self.onRejected(self.error)
        })
    }
    fn(resolve,reject);//调回调
}

MyPromise.prototype.then=function(onFulfilled,onRejected){
    this.onFulfilled=onFulfilled;
    this.onRejected=onRejected;
}
module.exports = MyPromise;