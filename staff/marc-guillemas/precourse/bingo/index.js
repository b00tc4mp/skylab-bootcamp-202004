function generateRandomNumber(){
    var randomNum = Math.floor(Math.random() * (100 - 1) + 1);
    return randomNum;
};

function bomboRandomizer(){
    var arr = [];
    while(arr.length < 98){
        var random = Math.floor((Math.random()*99)+1);
        if((arr.indexOf(random) === -1)){
            
            arr.push(random);
        }
    }
    return arr;
}

function newTurn(bingoCard,bomboCont) {
    // var randomNum = generateRandomNumber();
    // console.log(randomNum);
    // debugger
    // var bombo = bomboRandomizer();
    
    
    // console.log(bombo[j]);
    console.log(bomboCont);
    
    for(var i = 0; i < bingoCard.length; i++){
        if(bomboCont === bingoCard[i]){
            bingoCard[i] = "x";
        }
    }

    
    
    return bingoCard;   
}

function bingo() {
    var user = prompt("Let's play bingo! Type your name: ");
    var bingoCard = [5,23,76,31,45];
    var bombo = bomboRandomizer();
    console.log(bombo);
    console.log(bingoCard);

    
    var cont = 0;
    while(!bingoCheck(bingoCard)) {
        
        var roll = confirm("Do you want to roll again?")
        bingoCard = newTurn(bingoCard,bombo[cont]);
        console.log(bingoCard);

        cont++;
        if(!roll){
            break;
        }
        
    }
    
    if(bingoCheck(bingoCard)){
        alert(user +" has sung bingoo!!");
    }
    
    var newgame = prompt("Do you want play another time? y/n");
    if(newgame === "y"){
        bingo();
    } else {
        alert(user +" has left the game.");
    }
}

function bingoCheck(bingoCard){
    for(var i = 0; i < bingoCard.length; i++){
        if(bingoCard[i] != "x"){
            return false;            
        }
    }
    
    return true;
}

bingo();