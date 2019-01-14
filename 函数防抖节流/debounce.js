function debounce(fn,delay){
    let timer=null;
    return function(){
        const context=this;
        const args=arguments;
        if(timer){
            clearTimeout(timer);
            timer=null;
        }
        timer=setTimeout(()=>{
            fn.apply(context,args);
        },delay);
    }
}

const test=debounce(()=>{
    console.log('test')
},3000);

setInterval(test,1000);