let  array=[2,5,5,4,6,3,5,3,12,9];

function select (array){
    let len=array.length;
    for(let i=0;i<len;i++){
        let min=array[i];
        let minIndex=i;
        for(let j=i+1;j<len;j++){
            if(array[j]<min){
                min=array[j];
                minIndex=j;
            }
        }
        let temp;
        temp=array[i];
        array[i]=min;
        array[minIndex]=temp;
    }
    return array;
}

console.log(select(array));
