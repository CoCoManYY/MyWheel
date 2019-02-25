function maxSubArray(array){
    let maxSub=0;
    let currentSub=0;
    for(let i=0;i<array.length;i++){
        if(currentSub<0){
            currentSub=array[i];
        }else{
            currentSub=max(array[i],currentSub+array[i]);
        }
        maxSub=currentSub>maxSub?currentSub:maxSub;
    }
    return maxSub;
}

function max(a,b){
    return a>b?a:b;
}

let array=[1,2,3,4,-9,1,2,3,4,5,-9,2,-1];

console.log(maxSubArray(array));