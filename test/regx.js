// 注意开头或者结尾
// 注意次数
let s1="get-11element-by-id";

let f=function(s){
    return  s.replace(/-\w/g,function(x){
        return x.slice(1).toUpperCase();
    })
}

console.log(f(s1));


function containNumber(s1){
    let regx=/\d/;
    if(s1.search(regx)===-1){
        return false;
    }
    return true;
}

console.log(containNumber(s1));

function isPhone(s1){
    let regx=/^1[345678]\d{9}$/g;
    if(s1.search(regx)===-1){
        return false;
    }
    return true;
}
console.log(isPhone('18817202254'))

function isRight(s1){
    let regx=/\d{3}-\d{3}-\d{4}/g;
    return regx.test(s1);
}
console.log(isRight('112-255-8887'))

function isUSD(s1){
    let regx=/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/g
    return regx.test(s1);
}

console.log(isUSD('$1,023,032.03'));
console.log(isUSD('$3,432,12.12'));

function format(s1){
    let regx=/\d{1,3}(?=(\d{3})+$)/g
    return (s1+'').replace(regx,(x)=>x+',')
}
console.log(format(13456789));

function getUrlParam(url,key){
    let arr={};
    let regx=/\??(\w+)-(\w+)&?/g;
    url.replace(regx,(match,matchKey,matchValue)=>{
        console.log(match,matchKey,matchValue);
    })
}

getUrlParam('yy-uuu&jj-jj&nnn-jjj')
