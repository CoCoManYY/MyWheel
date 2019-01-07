const aliquoSum=(num)=>Array.from(Array(num),(item,index)=>index)
                        .filter((item)=>num%item===0)
                        .reduce((prev,curr)=>prev+curr);
const isPerfectSum=(num)=>aliquoSum(num)===num;

console.log(isPerfectSum(6));