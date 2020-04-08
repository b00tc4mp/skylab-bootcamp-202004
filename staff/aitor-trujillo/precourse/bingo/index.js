// SKYLAB BINGOOOOO!

// PLAYER + VARIABLES

var player = prompt('Crea un nombre de jugador.')
console.log('Bienvenido a Skylab Bingo '+player+'!');

var bingoCard = [];

var selectedNums = [];
var matchedNums = [];
var turnCount;
var saidLine = false;
var numbersFound = 0;

// PROGRAMA

createBingoCard();
showCard();
start();    // bingo() dentro

// FUNCIONES

// Crea el Cartón

function CreateNum() {
    this.number = newCardNumber(),
    this.matched = false
}

function createBingoCard(){
    for (var i = 0; i < 15; i++){
        bingoCard.push(new CreateNum());
    }
    selectedNums = [];
}

// Funcion start() para iniciar juego

function start() {
    var spinBombo = prompt('Escribe START para jugar')
    if (spinBombo == 'start' || spinBombo == 'START') {
        console.log('ENTRANDO A SKYLAB BINGO, SUERTE!')
        bingo();
    } else {
        console.log('Hasta pronto ' + player + ' :(')
    }
}

// Function bingo()

function bingo() {
    numBombo();
    checkCard();
    checkLine();
    checkBingo();
    showCard();
    if (numbersFound == bingoCard.length) {
        restartGame();
    } else {
        newTurn();
    }
}   

function showCard() {
    console.log(
        'Tu Cartón:',
        bingoCard[0].number,
        bingoCard[1].number,
        bingoCard[2].number,
        bingoCard[3].number,
        bingoCard[4].number,
    )
    console.log(
        '          ',
        bingoCard[5].number,
        bingoCard[6].number,
        bingoCard[7].number,
        bingoCard[8].number,
        bingoCard[9].number,
    )
    console.log(
        '          ',
        bingoCard[10].number,
        bingoCard[11].number,
        bingoCard[12].number,
        bingoCard[13].number,
        bingoCard[14].number,
    )
}

function numBombo() {
    // Generar num random
    var newNum = randomNum();
    // Checkear si ha salido
    if (matchedNums.indexOf(newNum) == -1) {
        matchedNums.push(newNum);
        console.log('HA SALIDO EL: '+newNum);
    } else {
        numBombo();
    } 
};

function newCardNumber() {
    // Generar num random
    var newNum = randomNum();
    // Checkear si ha salido
    if (selectedNums.indexOf(newNum) == -1) {
        selectedNums.push(newNum);
        return newNum;
    } else {
        return newCardNumber();
    } 
};


function checkCard() {
    for (var i = 0; i < bingoCard.length; i++) {
        for (var j = 0; j < matchedNums.length; j++) {
            if (bingoCard[i].number == matchedNums[j]) {
                bingoCard[i].number = 'X';
                bingoCard[i].matched = true;
            }
        }
    }
}

// Funcion nuevo turno
function newTurn() {
    var resume = prompt('Siguiente turno? S/N')
    if (resume == 'S' || resume == 's') {
        bingo();
    } else if (resume == 'N' || resume == 'n') {
        console.log('Hasta pronto!')
    } else {
        alert('Por favor introduce S o N.')
        newTurn();
    }
}

// Funciones LINEA Y BINGO

function checkLine() {
    if (!saidLine)
        if (
            bingoCard[0].number == 'X' &&
            bingoCard[1].number == 'X' &&
            bingoCard[2].number == 'X' &&
            bingoCard[3].number == 'X' &&
            bingoCard[4].number == 'X' 
        ) {
            console.log('LINEAAAA!');
            alert('LINEAAAA')
            saidLine = true;
        }
        else if (
            bingoCard[5].number == 'X' &&
            bingoCard[6].number == 'X' &&
            bingoCard[7].number == 'X' &&
            bingoCard[8].number == 'X' &&
            bingoCard[9].number == 'X'
        ) {
            console.log('LINEAAAA!');
            alert('LINEAAAA!')
            saidLine = true;
        }
        else if (
            bingoCard[10].number == 'X' &&
            bingoCard[11].number == 'X' &&
            bingoCard[12].number == 'X' &&
            bingoCard[13].number == 'X' &&
            bingoCard[14].number == 'X'
        ) {
            console.log('LINEAAAA!');
            alert('LINEAAAA!')
            saidLine = true;
        }
}

function checkBingo() {
    for (var i = 0; i < bingoCard.length; i++){
        if (bingoCard[i].number == 'X'){
            numbersFound++;
        }
    }
    if (numbersFound == bingoCard.length){
        turnCount = matchedNums.length;
        alert('BINGOOOOO!');
        console.log('BINGOOOOOOOOO!')
        console.log('HAS COMPLETADO EL BINGO EN '+turnCount+' TURNOS.')
    } else {
        numbersFound = 0;
    }
}

// Funcion RESTART GAME

function resetVars(){
    bingoCard = [];
    selectedNums = [];
    matchedNums = [];
    turnCount;
    saidLine = false;
    numbersFound = 0;
}

function restartGame(){
    var answer = prompt(
        'Has completado el Bingo, desea volver a jugar? S/N'
    )
    if (answer == 's' || answer == 'S'){
        // Resetear cartón
        resetVars();
        createBingoCard();
        showCard();
        start();
    } else if (answer == 'n' || 'N'){
        alert('Hasta pronto ' + player)
    } else {
        alert('Por favor introduce S o N.')
        restartGame();
    }
}

// Genera un número random entre 1-99

function randomNum() {
    return Math.floor(Math.random() * 99 + 1)
}
