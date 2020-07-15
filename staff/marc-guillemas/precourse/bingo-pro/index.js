

function randomizer(numOfLength){
    var arr = [];
    while(arr.length < numOfLength){
        var random = Math.floor((Math.random()*99)+1);
        if((arr.indexOf(random) === -1)){
            
            arr.push(random);
        }
    }
    return arr;
}

function markCoincidences(bombo, card) {
    
    for(var i = 0; i < card.length;i++){
        if(bombo === card[i]){
            card[i] = "X";
            alert(card.slice(0,5)+"\n"+card.slice(5,10)+"\n"+card.slice(10,15))
            return card;
        }
    }
}

function lineCheck(card) {
    var one = card.slice(0,5);
    var two = card.slice(5,10);
    var three = card.slice(10,15);

    var eachArray = [one,two,three];
   
    for(var i = 0; i < eachArray.length; i++){
        var checked = (num) => num === "X";
        var check = eachArray[i].every(checked);
        if(check){
            alert("LINEEEEEEE!!!");
            console.log("LINEEE!!!!");
            
            return true;
        }
        
    }
    return false;
}

function bingoCheck(card) {
    var checked = (num) => num === "X";
    var check = card.every(checked);
    if(check){
        alert("BINGOOOO!!")
        return true;
    }
    return false;
}
function puntuationSystem(rounds) {
    switch (rounds) {
        case rounds === 15:
            return 100; 
            break;
        case rounds > 15 && rounds < 40:
            return 80;
            break;
        case rounds >= 40 && rounds < 60:
            return 40;
            break;
        case rounds >= 60 && rounds < 80:
            return 20;
            break;
        case rounds >= 80 && rounds < 90:
            return 5;
            break;
        case rounds >= 90 && rounds <= 100:
            return 0;
            break; 
    }
}




var ranking = [];

function initGame() {
    var obj = {};
    var roll = true;
    var userID = prompt("Write your name:");
    while (userID === "") {
        userID = prompt("Please type your name here!");
    }
    obj.userID = userID;
    // debugger
    var bombo = randomizer(99);

   
    var card = randomizer(15);
    var cardConfirm = confirm("This is your bingo card. Are you agree with this numbers or you want another bingo card? \n \n "+card.slice(0,5)+"\n"+card.slice(5,10)+"\n"+card.slice(10,15));
    while (!cardConfirm) {
        card = randomizer(15);
        cardConfirm = confirm("This is your bingo card. Are you agree with this numbers or you want another bingo card? \n \n "+card.slice(0,5)+"\n"+card.slice(5,10)+"\n"+card.slice(10,15));
    }

    alert("Let's start to play");

    var round = 0;
    var line = false;
    var bingo = false;
    while (roll) {
        alert(bombo[round]);

        markCoincidences(bombo[round],card);
        
        if(line === false){
            line = lineCheck(card)
        }
        // lineCheck(card)
        
        // console.log(card.slice(0,5));
        // console.log(card.slice(5,10));
        // console.log(card.slice(10,15));

        bingo = bingoCheck(card);
        
        if(!bingo){
            roll = confirm("Do you want to roll again?");
            if(roll){
                round++;
            }
        }else{
            roll = null;
            var points = puntuationSystem(round);
            obj.points = points;
            ranking.push(obj);
        }

        
    }  


}
initGame()