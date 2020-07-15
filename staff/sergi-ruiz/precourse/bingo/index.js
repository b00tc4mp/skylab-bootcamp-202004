function askPlayerName() {
    let name = prompt("Insert your name");
    return name;
}

function randomLottery() {
    return Math.floor(Math.random() * 100);
}

function newCardboard () {
    let cardboard = [];
    for (let i = 0; i<5; i++) {
        var stack = randomLottery();
        let found = false;
        for (let j = 0; j<cardboard.length; j++) {
            if (stack === cardboard[j]) {
                found = true;
            }  
        }
        if (found === false) {
            cardboard.push(stack); 
        }
    }
    return cardboard;
}


function matchCardboard (cardNum) {
    let stack = randomLottery();
    console.log(stack);
    for (let i = 0; i<cardNum.length; i++) {
        if (cardNum[i] === stack) {
            cardNum[i] = 'X';
	    
        }
    }
    console.log(cardNum);
    return cardNum;
}

function newTurn() {
   let newRound = prompt("New round? Y/N");
   newRound = newRound.toLowerCase();
   if (newRound == 'y') {
	return true;
   } else {
	return false; 
   }
}

function bingo() {
   var pName = askPlayerName();
   var cardboard = newCardboard();
   var cardboard = matchCardboard(cardboard);
   while (newTurn() == true) {
      var cardboard = matchCardboard(cardboard);
   }
}

bingo();

