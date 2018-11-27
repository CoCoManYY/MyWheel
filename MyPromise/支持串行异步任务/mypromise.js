const PENDING = 'pending';
const FULFILLED= 'fulfilled';
const REJECTED='rejected';

function MyPromise(fn){
    let self=this;
    self.value=null;
    self.error=null;
    self.status=PENDING;
    self.onFulfilledCallbacks=[];
    self.onRejectedCallbacks=[];

    function resolve(value){
        setTimeout(()=>{
            self.status = FULFILLED;
            self.value=value;
            //array.forEach是同步的！
            self.onFulfilledCallbacks.forEach(callback => {
                callback(self.value);
            });
        },0);
    }
    function reject(error){
        setTimeout(()=>{
            self.status = REJECTED;
            self.error=error;
            self.onRejectedCallbacks.forEach(callback=>{
                callback(self.error);
            });
        },0);
    }

    fn(resolve,reject);
}

function resolvePromise(bridgePromise,x,resolve,reject){
    if(x instanceof MyPromise){
        if(x.status===PENDING){
            x.then(y=>{
                resolvePromise(bridgePromise,y,resolve,reject);
            },error=>{
                reject(error);
            });
        }else{
            x.then(resolve,reject);
        }
    }else{
        resolve(x);
    }
}

MyPromise.prototype.then=function(onFulfilled,onRejected){
    const self=this;
    let bridgePromise;
    //防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
    onFulfilled=typeof onFulfilled==="function"?onFulfilled:value=>value;
    onRejected=typeof onRejected==='function'?onRejected:error=>{throw error};
    if(self.status===FULFILLED){
        return bridgePromise=new MyPromise((resolve,reject)=>{
            setTimeout(()=>{
                try{
                    let x=onFulfilled(self.value);
                    resolvePromise(bridgePromise,x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            },0)
        })
    }
    if(self.status===REJECTED){
        return bridgePromise=new MyPromise((resolve,reject)=>{
           setTimeout(()=>{
            try{
                let x=onRejected(self.error);
                resolvePromise(bridgePromise,x,resolve,reject);
            }catch(e){
                reject(e);
            }
           },0)
        })
    }
    if(self.status===PENDING){
        return bridgePromise=new MyPromise((resolve,reject)=>{
            self.onFulfilledCallbacks.push((value)=>{
                try{
                    let x =onFulfilled(value);
                    resolvePromise(bridgePromise,x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push((error)=>{
                try{
                    let x=onRejected(error);
                    resolvePromise(bridgePromise,x,resolve,reject);
                }catch(e){
                    reject(e);
                }
            });
        });
    }
}
MyPromise.prototype.catch=function(onRejected){
    return this.then(null,onRejected);
}
module.exports=MyPromise;