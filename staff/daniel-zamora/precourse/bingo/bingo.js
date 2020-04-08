//Bingo

var name = '';
var cardNumbers = [];
var newRandomNumber = [];

function bingo() {
    hello();
    alert('******** AVISO ********\nTen en cuenta que tienes una cuota inicial de 115 puntos, entre mas turnos menos puntos.\nAsi que te deseamos suerte y que quedes con muchos puntos.')
    cardNumbers = generateNewBingoCard(15);
    showMeTheCards(cardNumbers);
    do {
        cardNumbers = generateNewBingoCard(15);
        var line = showMeTheCards(cardNumbers);
        var keepCard = confirm('Este es tu carton ' + name + ', presione cancelar para buscar uno nuevo o  aceptar para continuar\n' + line);
    } while (keepCard == false);

    var keepPlaying = true;
    var turns = 0;
    var points = 115;
    while (keepPlaying && !bingoWin) {
        var currentBallot = getNewBallotAndMarkBingoCard();
        evaluateBingoOrLine();
        var currentCard = showMeTheCards(cardNumbers);
        keepPlaying = confirm('Ha salido el ' + currentBallot + '\nQuieres seguir jugando. Presiona "Cancelar" para finalizar\nEste es tu carton actual:\n' + currentCard);
        turns++;
        points--;
        if (!keepPlaying) {
            alert('Lo sentimos, has perdido.');
        }

    }
    if (bingoWin) {
        alert('Bingoooooo!!!!\n' + name + ' Has ganado en ' + turns + ' turnos,\nlo que hace un total de ' + points + ' puntos.');
        var playAgain = confirm('Quieres volver a jugar?');
        if (playAgain) {
            clearVariables();
            bingo();
        } else {
            alert('Gracias por tu tiempo ' + name + '.');
            keepPlaying = false;
        }

    }

}

function clearVariables() {
    bingoWin = false;
    name = [];
    cardNumbers = [];
    newRandomNumber = [];
    var finishline1 = false;
    var finishline2 = false;
    var finishline3 = false;
}


function hello() {
    var namePrompt = prompt('Bienvenido al Bingo millonario\nPor favor indica tu nombre:');
    if (namePrompt === null) {
        return alert('Esperamos verlo pronto');
    } else if (namePrompt == "") {
        alert('No has introducido ningun nombre');
        hello();
    } else {
        alert('Bienvenido ' + namePrompt + '.');

    }
    name = namePrompt;
}


function generateNewBingoCard(cardNumbersLength) {
    var newCard = [];
    while (newCard.length < cardNumbersLength) {
        var randomNumber = Math.floor(Math.random() * 99) + 1
        if (newCard.indexOf(randomNumber) === -1) {
            newCard.push(randomNumber);
        }
    }
    return newCard;
}



function showMeTheCards(card) {
    var line = '______________________\n';
    for (var i = 0; i < card.length; i++) {
        if (card) {
            line += card[i] + ' | ';
        }
        if ((i + 1) % 5 === 0) {
            line += '\n______________________\n';
        }

    }
    return line;
}


function getNewBallotAndMarkBingoCard() {
    var ballot = createNewNumber();
    matchedNumbers(ballot);
    return ballot;
}

function evaluateBingoOrLine() {
    lineWinninCheck(cardNumbers);
    checkBingo(cardNumbers);
}


function createNewNumber() {
    do {
        var isRepeatedNumber = true;
        while (isRepeatedNumber) {
            var newNumber = Math.floor(Math.random() * 99) + 1;
            var isRepeatedNumber = newRandomNumber.includes(newNumber);
            if (!isRepeatedNumber) {
                newRandomNumber.push(newNumber);
                return newNumber;
            }
        }
    } while (newRandomNumber.length < 100)
}


function matchedNumbers(lastNumber) {
    //buscar lastNUmber dentro de cardNUmbers y marcarlo
    for (var i = 0; i < cardNumbers.length; i++)
        for (var j = 0; j < newRandomNumber.length; j++) {
            if (cardNumbers[i] == newRandomNumber[j]) {
                cardNumbers[i] = 'X';
            } else {
                cardNumbers[i] == "";
            }
        }

}

var finishline1 = false;
var finishline2 = false;
var finishline3 = false;

function lineWinninCheck() {
    var line1 = cardNumbers.slice(0, 5);
    var line2 = cardNumbers.slice(5, 10);
    var line3 = cardNumbers.slice(10, 15);

    var line1win = checkLine(line1);
    var line2win = checkLine(line2);
    var line3win = checkLine(line3);

    if (line1win && !finishline1) {
        finishline1 = true;
        finishline2 = true;
        finishline3 = true;
        alert("Felicidades!!! Has completado la linea 1");
    }
     else if (line2win && !finishline2) {
        finishline2 = true;
        finishline1 = true;
        finishline3 = true;
        alert("Felicidades!!! Has completado la linea 2");
    }
     else if (line3win && !finishline3) {
        finishline3 = true;
        finishline1 = true;
        finishline2 = true;
        alert("Felicidades!!! Has completado la linea 3");
    }
}


function checkLine(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] !== 'X') {
            return false;
        }
    }
    return true;
}

var bingoWin = false;

function checkBingo(arr) {
    var checkBingowin = checkLine(cardNumbers);
    if (checkBingowin) {
        return bingoWin = true;
    }
    return

}

bingo();