function arrange(array,k){
    if(k===1){
        console.log(array);
    }
    else{
        for(let i=array.length-k;i<array.length;i++){
            swap(array,array.length-k,i);
            arrange(array,k-1);
            swap(array,array.length-k,i);
        }
    }
}
function swap(array,from,to){
    let temp=array[from];
    array[from]=array[to];
    array[to]=temp;
}

arrange(['a','b','c','d'],4)