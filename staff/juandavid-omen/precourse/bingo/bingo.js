const MATCHED_NUMBER = 'x';

function createCard() {
    let card = [];
    for (let i = 1; i <= 5; i++) {
        card.push(i);
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

function numberGenerator() {
    let number = Math.floor(Math.random()* 5 + 1); 
    return number;
}

function modifyCard(card, number) {
    for (let i = 0; i < card.length; i++) {
        if (card[i] === number) {
            alert(`El número ${number} está en el cartón.`);
            card[i] = MATCHED_NUMBER;
            console.log(card);
            break;
        }
    }
}

function startNewTurn(card) {
    let number = numberGenerator();
    modifyCard(card, number);
    askTurn(card);
}

function askTurn(card) {
    if (checkCardCompleted(card)) {
        alert('Felicidades, has ganado!\nAdios!');
    } else {
        let isNewTurn = confirm('Quieres pasar al siguiente turno?');
        if (isNewTurn) {
            startNewTurn(card);
        } else {
            alert('El juego ha finalizado.\nAdios!');
        }
    } 
}

function bingo() {
    let playerName = prompt('Escribe tu nombre');
    let card = createCard(); 
    alert(`Hola ${playerName}, éste es tu cartón de bingo: ${card}.`);
    askTurn(card);
}
 
bingo();
