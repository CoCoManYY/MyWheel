Function.prototype.myCall=function(context){
    if(typeof this !=='function'){
        throw new TypeError('error');
    }
    context=context||window;
    const args=[...arguments].slice(1);
    const symbol=new Symbol();
    context[symbol]=this;//使用symbol防止覆盖
    const result=context[symbol](args);
    delete context[symbol];
    return result
}