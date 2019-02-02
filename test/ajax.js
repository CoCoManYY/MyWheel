
function ajax(options){
    let url=options.url;
    const methods=options.methods.toLocaleLowerCase()||'get';
    const async=options.async!=false;
    const data=options.data;
    const xhr=new XMLHttpRequest();
    if(options.timeout&&options.timeout>0){
        xhr.timeout=options.timeout;
    }
    return new Promise((resolve,reject)=>{
        xhr.ontimeout=()=>reject&&reject('请求超时');
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4){
                if(xhr.status>=200&&xhr.status<300||xhr.status==304){
                    resolve&&resolve(xhr.responseText);
                }else{
                    reject&&reject();
                }
            }
        }
        xhr.onerror=()=>reject&&reject(err);

        let paramArr=[];
        let encodeData;
        if(data instanceof Object){
            for(let key in data){
                paramArr.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));
            }
            encodeData=paramArr.join('&');
        }
        if(methods==='get'){
            const index=url.indexOf('?');
            if(index===-1) url+='?';//木有就加
            else if(index!==url.length-1) url+='&';//不是最后一个
            //拼接url
            url+=encodeData;
        }

        xhr.open(methods,url,async);
        if(methods=='get') xhr.send(null);
        else{
            //post 方式需要设置请求头
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF8');
            xhr.send(encodeData);
        }
    })
}


ajax({
    url:'https://www.baidu.com',
    methods:'get',
    timeout:3000
}).then(
    res=>{console.log('okk'+res)},
    err=>{console.log('err'+err)}
)