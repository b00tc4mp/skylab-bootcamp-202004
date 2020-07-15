var LINE = 5;

function bingo() {
    function player() {
        let name = prompt("¿Cómo se llama?");
        if (!name) {
            alert("Introduzca su nombre");
            name = player();
        }
        return name
    }
    let name = player();

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

    let confirmation;
    function checkBingoCard(card){
        for (let i = 0; i < card.length; i++) {
            if (card[i] !== 0) {
                return true;
            }
        }
        return false
    }
    
    do {
        bingoCard = turn(bingoCard)
        console.log(bingoCard);
        confirmation = confirm("¿Desea seguir jugando?");
    } while (confirmation && checkBingoCard(bingoCard));

    console.log("¡Línea!")

    // De aquí para arriba, todo revisado y OK
}

bingo();