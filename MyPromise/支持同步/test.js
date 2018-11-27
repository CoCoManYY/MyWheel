//基础代码不支持同步，因为同步执行时还没有调用then方法来注册成功或失败时要调用的函数
let Promise = require('./mypromise');
let fs=require('fs');

let promise=new Promise((resolve,reject)=>{
    resolve('执行同步任务');
});

function resolve(value){
    console.log(value);
}
function reject(err){
    console.log(err);
}

promise.then(resolve,reject);