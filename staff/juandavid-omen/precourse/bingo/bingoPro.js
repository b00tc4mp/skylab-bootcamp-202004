const MATCHED_NUMBER = 'x';
const MAX_VALUE = 90; 
let numbersDrum = [];
let turns = 0;
let hasUserLine = false;
let playerName = '';
let rankingGamers = {
    usersGamers: [],
    addGamer: function(playerName, points) {
        let userGamer = {
            gamer: playerName,
            gamerPoints: points,
        };
        this.usersGamers.push(userGamer);
        return this.usersGamers;
    }, 

    printRanking: function() {
        this.usersGamers.sort(function (gamer1, gamer2) {
           return gamer2.gamerPoints - gamer1.gamerPoints;
          });
          console.log('RANKING DE JUGADORES');
          for (let i = 0; i < this.usersGamers.length; i++){
              console.log(`${i + 1}.\t${this.usersGamers[i].gamer}\t${this.usersGamers[i].gamerPoints}`);
        }
        
    }
};

function numberGenerator() {
    let number = Math.floor(Math.random() * MAX_VALUE + 1); 
    return number;
}

function getNumberDrum() {
    let randomNumber;

    // generate random number not repeated
    do {
        randomNumber = numberGenerator();
    } while (numbersDrum[randomNumber - 1] === MATCHED_NUMBER);
    
    numbersDrum[randomNumber - 1] = MATCHED_NUMBER;
    return randomNumber;
}

function createCard(lengthCard) {
    let card = [];
    while (card.length < lengthCard) {
        let randomNumber = numberGenerator();
        if (card.indexOf(randomNumber) === -1) {
            card.push(randomNumber);
        }   
    }
    return card;
}

function checkCardCompleted(card) {
    for (let i = 0; i < card.length; i++) {
        if (card[i] != MATCHED_NUMBER) {
            return false;
        } 
    }
    return true;
}

function getCardFormat(card) {
    let cardFormat = '';
    let row = 0;
    for (let i = 0; i < card.length; i++) { 
        
        if (row !==  Math.floor(i/5)) {
            cardFormat += '\n';
        }
        cardFormat += card[i] + ' ';
        row = Math.floor(i/5); 
    }
    return cardFormat;
}

function modifyCard(card, number) {
    for (let i = 0; i < card.length; i++) {
        // if number if found on the card, set a 'x'
        if (card[i] === number) {
            console.log(`El número ${number} está en el cartón.`);
            card[i] = MATCHED_NUMBER;
            console.log(getCardFormat(card));
            break;
        }
    }
}

function startNewTurn(card) {
    let number = getNumberDrum();
    console.log(`El bombo ha sacado el número ${number}.`);
    turns++;
    modifyCard(card, number);
    askTurn(card); //recursive call to askTurn
}

function hasLineCompleted(card) {
    let isLine = true;
    let row = 0;
    for (let i = 0; i < card.length; i++) {
        //if last row is different of this row and isLine is true has found a line
        if (row !== Math.floor(i / 5)) {
            if (isLine === true) {
                return true;
            }
            isLine = true;
        }

        if (card[i] != MATCHED_NUMBER) {
            isLine = false;
        } 
        row = Math.floor(i / 5);
    }
    return isLine;
}

function getPlayerPoints(){
    let playerPoints = 0;
    
    if (turns >= 15 && turns <= 90){
        playerPoints = 90 - turns;
    }
    
    return playerPoints;
}

function askTurn(card) {
    if (checkCardCompleted(card)) {
        let pointsPlayer = getPlayerPoints();
        alert(`Felicidades, has ganado!\nHas completado el juego en ${turns} turnos.\nHas obtenido ${pointsPlayer} puntos!`);
        rankingGamers.addGamer(playerName, pointsPlayer);
        rankingGamers.printRanking();
    } else {
        if (!hasUserLine && hasLineCompleted(card)) { 
            hasUserLine = true;
            alert('felicidades, has hecho linea!');
        }
        
        let isNewTurn = confirm('Quieres pasar al siguiente turno?');
        if (isNewTurn) {
            startNewTurn(card);
        } else {
            alert('El juego ha finalizado.\nAdios!');
        }
    } 
}

function getCard() {
    let card;
    let isCardOk;
    do {
        card = createCard(15);
        isCardOk = confirm(`Éste es tu cartón de bingo:\n${getCardFormat(card)}\nEstas conforme con este cartón?`);
    } while (!isCardOk);
    return card;
}

function resetGame() {
    numbersDrum = [];
    turns = 0;
    hasUserLine = false;
    playerName = '';
}

function bingo() {
    
    let playAgain = true;
    do {
        playerName = prompt('Escribe tu nombre');

        if (playerName === null) {
            break;
        } else if (playerName === "") {
            alert('Introduce un valor valido');
            continue;
        } else {
            alert(`Hola ${playerName}, bienvenido/a!`
            +'\nEstas son las condiciones del juego: '
            +'Inicias con 90 puntos a medida que vaya saliendo los turnos iras perdiendo puntos.' 
            +'\nSi haces 15 turnos, tendras 75 puntos.\nSi haces 30 turnos, tendras 60 puntos, etc.');
        }

        let card = getCard();
        askTurn(card);
        resetGame();
        playAgain = confirm('Quieres iniciar una nueva partida?');
    } while (playAgain);

}
 
bingo();