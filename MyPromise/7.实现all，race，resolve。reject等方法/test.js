let Promise=require('./mypromise');
let path=require('path');
let fs=require('fs');

let p1=new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'../file/1.txt'),'utf8',(err,data)=>{
        err?reject(err):resolve(data);
    })
})

let p2=new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'../file/2.txt'),'utf8',(err,data)=>{
        err?reject(err):resolve(data);
    })
})

Promise.all([p1,p2]).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
})

Promise.race([p1,p2]).then(result=>{
    console.log(result);
},err=>{
    console.log(err);
})