let array=[1,2,3,4,3,2,1,5,6,7,56,4,2,1];

function merge_sort(arr){
    if(arr.length<2) return arr;
    let middle=parseInt(arr.length/2);
    let left=arr.slice(0,middle);
    let right=arr.slice(middle);
    return merge(merge_sort(left),merge_sort(right));
}

function merge(left,right){
    let result=[];
    let i=0;j=0;
    while(i<left.length&&j<right.length){
        if(left[i]>right[j]) result.push(right[j++]);
        else result.push(left[i++]);
    }
    while(i<left.length) result.push(left[i++]);
    while(j<right.length) result.push(right[j++]);
    return result;
}

console.log(merge_sort(array));