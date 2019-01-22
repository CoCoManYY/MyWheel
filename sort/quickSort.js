let array=[5,7,2,9,3,8,4,7,1];
//因为选的基准为前面的所以前面的顺序更重要
function quickSort(array){
    if(array.length<2) return array;
    let left=0;
    let right=array.length-1;
    while(left<right){
        //两个循环的顺序很重要
        while(array[right]>=array[0]&&left<right) right--;
        while(array[left]<=array[0]&&left<right) left++;//left<right很重要
        if(left==right){
            let mid=array[right];
            array[right]=array[0];
            array[0]=mid;
            break;
        }
        let temp=array[right];
        array[right]=array[left];
        array[left]=temp;
    }
    return quickSort(array.slice(0,left)).concat(array.slice(right,left+1)).concat(quickSort(array.slice(left+1)))
}

console.log(quickSort(array));