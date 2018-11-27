const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(fn){
    let self = this;
    self.value=null;
    self.error=null;
    self.status=PENDING;
    self.onFulfilled=null;
    self.onRejected=null;

    function resolve(value){
        if(self.status===PENDING){//先判断状态
            setTimeout(()=>{
                self.status=FULFILLED;
                self.value=value;
                self.onFulfilled(self.value);
            },0);
        };
    };
    function reject(error){
        if(self.status===PENDING){
            setTimeout(() => {
                self.status=REJECTED;
                self.error=error;
                self.onRejected(self.error);
            }, 0);
        }
    }
    fn(resolve,reject);
}

MyPromise.prototype.then=function(onFulfilled,onRejected){
    //状态改变一次就不允许再改变了
    if(this.status===PENDING){
        this.onFulfilled=onFulfilled;
        this.onRejected=onRejected;
    }else if(this.status===FULFILLED){
        onFulfilled(this.value);
    }else{
        onRejected(this.error);
    }
}
module.exports=MyPromise;