a={
    x:'hhh',
    y:{
        z:'444'
    }
}
b=JSON.parse(JSON.stringify(a));
b.y.z='hhhhh';
console.log(a);
console.log(b);


function deepClone(source){//数组和对象都包括了！！
    //类型判断
    if(!source||typeof source!=='object'){
        throw new TypeError('err');
    }
    let targetObj=source instanceof Array?[]:{};
    for(let key in source){
        if(source[key]&&typeof source[key]==='object'){
            targetObj[key]=deepClone(source[key]);
        }else{
            targetObj[key]=source[key];
        }
    }
    return targetObj;
}

// test example
var o1 = {
    arr: [1, 2, 3],
    obj: {
      key: 'value'
    },
    func: function(){
      return 1;
    }
  };
  var o3 = deepClone(o1);
  console.log(o3 === o1); // => false
  console.log(o3.obj === o1.obj); // => false
  console.log(o3.func === o1.func); // => true
    