let Promise=require('./mypromise');
let path=require('path');
let fs=require('fs');

let p1=new Promise((resolve,reject)=>{
    fs.readFile(path.join(__dirname,'../file/1.txt'),'utf8',(err,data)=>{
        err?reject(err):resolve(data);
    })
})

let p2=new Promise((resolve,reject)=>{
    setTimeout(() => {
        fs.readFile(path.join(__dirname,'../file/2.txt'),'utf8',(err,data)=>{
        err?reject(err):resolve(data);
    })
    }, 3000); 
})

Promise.all([p1, p2]).then(function(result) {
    console.log(result);
}, function(error) {
    console.log(error)
});

Promise.race([p1, p2]).then(function(result) {
    console.log(result);
}, function(error) {
    console.log(error)
});