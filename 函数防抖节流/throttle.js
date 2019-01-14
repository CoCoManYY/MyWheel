function throttle(fn,delay){
   let last=0;
   return function(){
       const context=this;
       const args=arguments;
       let now=+ new Date();//强制转换为数字
       if(now-last>delay||last===0){
           fn.apply(context,args);
           last=now;
       }
   }
}

const test=throttle(()=>{
    console.log('test')
},3000);

setInterval(test,1000);