let Promise = require('./mypromise');
let path=require('path');
let fs=require('fs');
let promise=new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'../file/1.txt'),'utf8',function(err,data){
        err?reject(err):resolve(data);
    });
});

let f1=function(data){
    console.log(data);
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../file/2.txt'),'utf8',function(err,data){
            err?reject(err):resolve(data);
        });
    });
}
let f2=function(data){
    console.log(data);
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname,'../file/3.txt'),'utf8',function(err,data){
            err?reject(err):resolve(data);
        });
    });
}
let f3=function(data){
    console.log(data);
}
let errorLog=function(error){
    console.log(error);
}

promise.then(f1).then(f2).then(f3).catch(errorLog);