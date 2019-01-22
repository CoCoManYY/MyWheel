let array=[1,2,3,2,1,4,5,67,4,3,2,1,3,4,5];

function insert(array){
    for(let i=1;i<array.length;i++){
        let key=array[i];
        let j=i-1;
        while(j>=0&&array[j]>key){
            array[j+1]=array[j];
            j--;
        }
        array[j+1]=key;
    }
    return array;
}

console.log(insert(array));