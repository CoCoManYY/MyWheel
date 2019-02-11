function myInstanceof(left,right){
    right=right.prototype;//获取构造函数的原型对象
    left=left.__proto__;//获取对象的原型对象
    while(true){
        if(left===right){
            return true;
        }else if(left===null){
            return false;
        }
        left=left.__proto__;
    }
}