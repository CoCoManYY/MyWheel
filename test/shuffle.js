function shuffle(arr){
    if(!arr){
        throw new Error('传参错误');
    }
    let newArr=arr.slice(0);
    for(let i=0;i<newArr.length;i++){
        let index=Math.floor(Math.random()*newArr.length);
        let temp=newArr[index];
        newArr[index]=newArr[i];
        newArr[i]=temp;
    }
    return newArr;
}


function generatePoker(){
    let cardType=['黑桃','红桃','梅花','方块'];
    let cardValue=['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let specialCard=['大王','小王'];
    let allCards=[];
    for(let i=0;i<cardType.length;i++){
        for(let j=0;j<cardValue.length;j++){
            allCards.push(cardType[i]+cardValue[j]);
        }
    }
    allCards=allCards.concat(specialCard);
    return allCards;
}

function dealPoker(num){
    if(!num||num>54||typeof num !=='number'){
        throw new Error('类型错误');
    }
    let allCards=generatePoker();
    let randomCards=shuffle(allCards);
    return randomCards.slice(0,num);
}

console.log(dealPoker(17));