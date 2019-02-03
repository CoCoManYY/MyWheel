function solution1(){
    for(let i=1000;i<99000;i++){
        if(i==i.toString().split('').reverse().join(''))
            console.log(i);
    }
}

function solution2(){
    for(let i=10;i<=989;i++){
        let res=i+i.toString().split('').reverse().join('');
        console.log(res);
    }
}

solution2();