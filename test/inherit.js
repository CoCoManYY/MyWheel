//原型链继承
function Parent(){
    this.name='父亲';
    this.arr=[1];
}

Parent.prototype.say=function(){
    console.log('hello');
}

function Child(like){
    this.like=like;
}

Child.prototype=new Parent();

///组合继承
function Person(name){
    this.name=name;
}

Person.prototype.sayName=function(){
    console.log(this.name+' '+this.gender+' '+this.age);
}

function Female(name,gender,age){
    Person.call(this,name);//拷贝一份父类的实例属性
    this.gender=gender;
    this.age=age;
}

Female.prototype=new Person();//第一次，修复constructor指向
Female.prototype.constructor=Female;
//寄生组合式：借用构造函数来继承属性、原型链方式继承方法     好处：避免两次调用构造函数创建多余属性。
function Person(name){
    this.name=name;
}

Person.prototype.sayName=function(){
    console.log(this.name+' '+this.gender+' '+this.age);
}

function Female(name,gender,age){
    Person.call(this,name);
    this.gender=gender;
    this.age=age;
}

let protoType=Object.create(Person.prototype);
protoType.constructor=Female;
Female.prototype=protoType;
// the best寄生组合
function object(o) {
    function F(){}
    F.prototype = o;
    return new F();
  }
  function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype;  // 指定对象
  }
  
  function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  SuperType.prototype.sayName = function() {
    alert(this.name);
  }
  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }
  inheritPrototype(SubType, SuperType);
  
  SubType.prototype.sayAge = function() {
    alert(this.age);
  }
  
  var subType=new SubType('sss',111);
  console.log(subType);