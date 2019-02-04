function solution1(array){
    // array.sort((a,b)=>a-b);
    let temp=new Set();
    array.forEach(element => {
        temp.add(element);
    });
    let res= Array.from(temp);
    console.log(res)
}

function solution2(array){
    console.log([...new Set(array)])
    console.log(Array.from(new Set(array)))
}
let array=[1,13,24,11,11,14,1,2];
solution2(array);