let person=function(){
    let name='defalt';
    return {
        setName:function(newName){
            name=newName;
        },
        getName:function(){
            return name;
        }
    }
}()
console.log(person.getName());
person.setName('hhhh');
console.log(person.getName());


function test(){
    for(var i=0;i<100;i++){
        setTimeout(()=>{
            console.log(i)
        },0);
    }
}
test();

// let
function test1(){
    for(var i=0;i<100;i++){
        (function(j){
            setTimeout(()=>{
            console.log(j)
        })})(i)
    }
}

test1();