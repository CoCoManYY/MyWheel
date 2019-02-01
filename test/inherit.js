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