function palindromic(s){
    let max=0;
    let f=[];
    for(let i=0;i<s.length;i++){
        f[i]=new Array();
    }
    console.log(f);
    for(let i=0;i<s.length;i++){
        f[i][i]=true;
    }
    for(let i=0;i+1<s.length;i++){
        f[i][i+1]=s[i]==s[i+1];
    }
    for(j=2;j<s.length;j++){
        for(let i=0;i+j<s.length;i++){
            if(s[i]==s[i+j]&&f[i+1][i+j-1]){
                max=max>j+1?max:j+1;
                f[i][i+j]=true; 
            }else{
                f[i][i+j]=false;
            }
        }
    }
    console.log(f);
    console.log(f[1][3]);
    console.log(max);
}



let str='12211';
palindromic(str)