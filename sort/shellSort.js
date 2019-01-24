let array=[1,2,3,4,3,2,1,5,6,7,56,4,2,1];

function shellSort(arr){
    for(let gap=Math.floor(array.length/2);gap>0;gap=Math.floor(gap/2)){
        //内层插入排序
        for(let i=gap;i<arr.length;i++){
            let key=arr[i];
            let j=i-gap;
            while(j>=0&&key<arr[j]){
                arr[j+gap]=arr[j];
                j=j-gap;
            }
            arr[j+gap]=key;
        }
    }
    return arr;
}
console.log(shellSort(array));