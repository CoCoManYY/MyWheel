let Promise = require("./mypromise")
let fs = require("fs")
let path = require("path");
let promise=new Promise((resolve,reject)=>{
    //规范的路径写法
    fs.readFile(path.join(__dirname,'../file/1.txt'),"utf8",function(err,data){
        err?reject(err):resolve(data);//调用函数改变状态(异步回调)
    });
});

function successLog(data){
    console.log(data);
}
function errorLog(error){
    console.log(error);
}
promise.then(successLog,errorLog);//then方法注册 当resolve(成功)/reject(失败)的回调函数