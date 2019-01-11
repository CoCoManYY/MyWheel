function myInstanceof(left,right){
    right=right.prototype;//获取构造函数的原型对象
    left=left.__proto__;//获取对象的原型对象
    while(true){
        if(left===undefined||right===null){//左边没定义
            return false;
        }
        if(right===false)
            return true
        right=right.__proto__;
    }
}