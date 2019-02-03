let num=document.getElementsByTagName('img').length;
var img=document.getElementsByTagName('img');
let n=0;//计数
lazyload();

window.onscroll=lazyload;

function lazyload(){
    let seeHeight=document.documentElement.clientHeight;//可见区域高度
    let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    for(let i=n;i<num;i++){
        if(img[i].offsetTop<seeHeight+scrollTop){
            if(img[i].getAttribute('src')=='default.jpg'){
                img[i].src=imh[i].getAttribute('data-src')
            }
            n=i+1;
        }
    }
}