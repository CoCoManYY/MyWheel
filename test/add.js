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

var add=(function(){
    var args=[];
    function addInner(){
        if(arguments.length===0){
            return calResult;
        }else{
            Array.prototype.push.apply(args,Array.prototype.splice.call(arguments,0));
            return add;
        }

    }
    function calResult(){
        console.log(args)
        var result=args.reduce(function(previousValue, currentValue){
            return previousValue+currentValue;
        },0);
        return result;
    }
    addInner.valueOf=function(){
        return calResult();
    };

    addInner.toString=function(){
        return calResult()+'';
    };

    return addInner;
}());


console.log('%d',add(1)(2)(3)(4));