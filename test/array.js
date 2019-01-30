var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    },[])
}

function flatten1(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr);
    }
    return arr;
}
arr = [1,2,2,3,3,4,4,5,5,5,6];
function simplify(arr){
    let result=new Set();
    arr.forEach(element => {
       result.add(element);
    });
    return Array.from(result);
}

console.log(flatten(arr))
console.log(flatten1(arr))
console.log(simplify(arr));