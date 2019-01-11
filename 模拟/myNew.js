function create(){
    let obj ={};//创建新对象
    let Constructor=[].shift.call(arguments);
    obj.__proto__=Constructor.prototype;//链接原型
    Constructor.apply(obj,arguments);//绑定this并且初始化
    return obj;//返回对象。
}