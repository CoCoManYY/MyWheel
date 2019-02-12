function maxSubArray(array){
    let maxSub=0;
    let currentSub=0;
    for(let i=0;i<array.length;i++){
        currentSub=max(array[i],currentSub+array[i]);
        if(maxSub>currentSub){
            currentSub=0
        }else{
            maxSub=currentSub;
        }
    }
    return maxSub;
}

function max(a,b){
    return a>b?a:b;
}

let array=[1,2,3,4,-9,-9,2,-1];

console.log(maxSubArray(array));