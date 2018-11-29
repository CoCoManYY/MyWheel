let Promise=require('./mypromise');
let path=require('path');
let fs=require('fs');

let readFile=Promise.promisify(fs.readFile);

readFile(path.join(__dirname,'../file/1.txt')).then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});