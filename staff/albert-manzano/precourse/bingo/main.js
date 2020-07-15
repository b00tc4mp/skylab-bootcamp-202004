var card=[];
var line1;
var line2;
var line3;
var continuePlaying=true;
var line=false;
var bingo=false;
var board=[];
var bomboNumber=[];


function greeting(){
    var name=prompt("Please introduce your name")
    alert("Hi "+ name + ",welcome to skylab Bingo")
    alert("you will start with 100 points, each turn that passes, 1 point will be deducted!")
    return name
}

function display(){
    line1=[card[0].number,card[1].number,card[2].number,card[3].number,card[4].number]
    line2=[card[5].number,card[6].number,card[7].number,card[8].number,card[9].number]
    line3=[card[10].number,card[11].number,card[12].number,card[13].number,card[14].number]
    console.log(line1)
    console.log(line2)
    console.log(line3)
}

function bingoCard(lenghtOfArray){
    newCard=[];
    while(newCard.length < lenghtOfArray){
        var randomNum = Math.floor((Math.random()*99)+1)
        if(newCard.indexOf(randomNum)=== -1){
            newCard.push(randomNum)
        }
    }

    newCard.forEach(item => {
        var element = {};
        element.number = item;
        element.matched = false;
        card.push(element);
    })

    display();

    if(confirm("Do you want to keep this card?")){
        return card;
    }else{
        card=[];
        return bingoCard(15);
    }
}

function createBomboNumber(){
    
    var random = Math.floor((Math.random()*99)+1);
    if(bomboNumber.indexOf(random)=== -1){
        bomboNumber.push(random);
        console.log(random);
        return random;
    }else{
        return createBomboNumber();
    }
}

function matching(random){
    for(var i=0;i<card.length;i++){
        if(card[i].number===random){
            card[i].number= "x";
            card[i].matched=true;
            alert("You got a number!");
        }
    }
}
 
function checkLine(card){
    
    if(card[0].matched && card[1].matched && card[2].matched && card[3].matched && card[4].matched === true){
        console.log("line!!!!!");
        return line=true;
    }
    if(card[5].matched && card[6].matched && card[7].matched && card[8].matched && card[9].matched === true){
        console.log("line!!!!!");
        return line=true;
    }
    if(card[10].matched && card[11].matched && card[12].matched && card[13].matched && card[14].matched === true){
        console.log("line!!!!!");
        return line=true;
    }
} 

function checkBingoCard(){
   
    var checks=0
    for(var i=0;i<card.length;i++){
        if(card[i].matched==true){
            checks += 1
        }
    }

    if(checks==15){
        continuePlaying=false
        bingo=true
        alert("Bingo!!")
        console.log("Bingo!!")
    }else{
        continuePlaying=confirm("Do you want to continue? if you quit you will loose 40 points");
    }
}


    
function boardDisplay(){
    board.sort((a,b)=> a.score - b.score);
    board.forEach(board => {
        console.log(` ${board.name} got ${board.score} points in ${board.turns} turns`);
    });
}

function bingoSkylab(){
    var count=100;
    var player={};
    var name=greeting();
    bingoCard(15);  
    while(continuePlaying){
        count--
        random=createBomboNumber();
        matching(random);
        display()
        if(!line){
            checkLine(card);
        }
        if(!bingo){
            checkBingoCard();
            }
    } 

    switch (bingo) {
        case false :
            player.name=name;
            player.score=(count-50);
            player.turns= (100-count);
            board.push(player);
            break;
        case true:
            player.name=name;
            player.score= (count+50);
            player.turns= (100-count);
            board.push(player);
            break;
    }
    boardDisplay()
}

bingoSkylab()