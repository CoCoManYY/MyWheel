//静态变量用法
function Test(){
    this.num=Test.num++;
}
Test.num=0;

let test1=new Test();
console.log(test1.num);
let test2=new Test();
console.log(test2.num);
console.log(test1.hasOwnProperty('num'))