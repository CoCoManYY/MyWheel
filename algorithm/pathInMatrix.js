// 递归要注意，对于原数据进行修改的，需要
function findPath(arr,str){
    let statusTag=0;
    let flagArr=[];
    for(let i=0;i<arr.length;i++){
        flagArr[i]=(new Array(arr[0].length)).fill(true);
    }
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[0].length;j++){
            if(arr[i][j]==str[0]){
                //开始遍历
                statusTag=1;
                recursion(arr,i,j,statusTag,str,flagArr);
            }
        }
    }
}

function recursion(arr,i,j,statusTag,str,flagArr){
    console.log(arr[i][j],flagArr);
    flagArr[i][j]=false;
    if(i+1<arr.length&&arr[i+1][j]==str[statusTag]&&flagArr[i+1][j]==true){//right
        recursion(arr,i+1,j,statusTag+1,str,flagArr)
    }else if(j+1<arr[0].length&&arr[i][j+1]==str[statusTag]&&flagArr[i][j+1]==true){//down
        recursion(arr,i,j+1,statusTag+1,str,flagArr)
    }else if(i-1>=0&&arr[i-1][j]==str[statusTag]&&flagArr[i-1][j]==true){//left
        recursion(arr,i-1,j,statusTag+1,str,flagArr)
    }else if(j-1>=0&&arr[i][j-1]==str[statusTag]&&flagArr[i][j-1]==true){//up
        recursion(arr,i,j-1,statusTag+1,str,flagArr)
    }
    flagArr[i][j]=true;//注意递归这种，记得进行还原操作
    return;
    
}

let arr=[['a', 'b' ,'c'],[ 'e', 's', 'f'], ['c', 's' ,'a'], ['d' ,'e' ,'e']]
let str="bcfaee";
findPath(arr,str);