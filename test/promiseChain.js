// human('jack').eat().sleep(5).go().rest(10);

function human(name){
    return new Human(name);
}

function Human(name){
    this.name=name;
    this.sayHello;
    this.queue=Promise.resolve();
}

Human.prototype.sayHello=function(){
    console.log(`I am ${this.name}`);
}

Human.prototype.eat=function(){
    this.queue=this.queue.then(()=>{
        return new Promise((resolve)=>{
            console.log('Eat');
            resolve();
        })
    })
    return this;
}

Human.prototype.sleep=function(time){
    this.queue=this.queue.then(()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log(`sleep ${time}s`);
                resolve();
            },time*1000)
        })
    })
    return this;//重点
}

Human.prototype.go=function(){
    this.queue=this.queue.then(()=>{
        return new Promise((resolve)=>{
        console.log('go');
        resolve();
        })
    })
    return this;
}

Human.prototype.rest=function(time){
    this.queue=this.queue.then(()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log(`rest ${time}s`);
                resolve();
            },time*1000);
        })
    })
    return this;
}

human('Jack').eat().sleep(5).go().rest(10);