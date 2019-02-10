function A(){
    let flag=1;
    function help(){
        flag=!flag;
        console.log(flag+1);
        return help;
        
    }
    return help();
}
A()()()()()();


function add(x){
    let sum=x;
    console.log(sum);
    let help=function (y){
        sum=sum+y;
        console.log(sum);
        return help;
    }
    help.valueOf=function(){
        return sum;
    }
    help.toString=function(){
        return sum;
    }
    return help;
}


add(1)(2)(3)(4);
// 柯里化
function add(){
    let _args=[].slice.apply(arguments);
    let _adder=function(){
        _args.push(...arguments);
        return _adder;
    }
    _adder.toString=function(){
        return _args.reduce((a,b)=>a+b); 
    }
    return _adder;
}
console.log(add(1, 2, 3, 4, 5));  // 15
console.log(add(1, 2, 3, 4)(5));  // 15
console.log(add(1)(2)(3)(4)(5));  // 15