let arrayLike={
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
console.log(Array.prototype.slice.call(arrayLike,0));

console.log(Array.from(arrayLike));

console.log(Array.prototype.concat.apply([],arrayLike));