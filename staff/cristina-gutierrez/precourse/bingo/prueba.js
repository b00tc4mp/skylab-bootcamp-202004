const LINE = 5;

function bingo() {
    let name = prompt("¿Cómo se llama?");

    function randomNumber(numMin, numMax) {
        return Math.floor(Math.random() * (numMax - numMin)) + numMin;
    }

    let bingoCard = [];

    do {
        bingoCard.push(randomNumber(1,91))
    } while (bingoCard.length < LINE);

    console.log(bingoCard);

    function turn(card) {
        let randomNum = randomNumber(1, 91);
        console.log(randomNum);
        
        for (let i = 0; i < card.length; i++) {
            if (randomNum === card[i]) {
                card[i] = 0;
            }
        }

        return card
    }

    bingoCard = turn(bingoCard);

    console.log(bingoCard);

    let confirmation = confirm("¿Desea seguir jugando?");

    bingoCard = turn(bingoCard);
}

bingo();