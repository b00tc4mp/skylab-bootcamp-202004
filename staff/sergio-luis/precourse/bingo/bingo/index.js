// =========== BINGO PROGRAM ============

var bingoCard = [
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false }
];
var listRanking = [];
var arrRandomNum = [0];
var arrNumberBingoCart = [0];
var name;
var showLine = true;
var line1 = 0;
var line2 = 0;
var line3 = 0;
var point = 100;
var turn = 1;


bingo()

function bingo() {
    do {
        console.log('******** Nuevo juego! *********')
        var game = prompt('Bienvenido al bingo!\nQuieres jugar?Yes/No').toLowerCase();
        if (game === 'yes') {
            createCard();
            acceptCard();
            generateCoincidence();
        }
    } while (game !== 'no');
    alert('Ciao!');
}

//***************************
//**** FUNCTIONS ************
//***************************

// Function for creat cart whith a random num whith al diferents numbers
function createCard() {
    for (var i = 0; i < bingoCard.length; i++) {
        do {
            var number = Math.floor((Math.random() * 60) + 1);
        } while (arrNumberBingoCart.includes(number));
        arrNumberBingoCart.push(number);
        bingoCard[i].number = number;
        bingoCard[i].matched = false;
    }
    showCard()
};

// Function showCart() by console
function showCard() {
    console.log('***********************************')
    console.log(bingoCard[0].number + '  ' + bingoCard[1].number + '  ' + bingoCard[2].number + '  ' + bingoCard[3].number + '  ' + bingoCard[4].number)
    console.log(bingoCard[5].number + '  ' + bingoCard[6].number + '  ' + bingoCard[7].number + '  ' + bingoCard[8].number + '  ' + bingoCard[9].number)
    console.log(bingoCard[10].number + '  ' + bingoCard[11].number + '  ' + bingoCard[12].number + '  ' + bingoCard[13].number + '  ' + bingoCard[14].number)
    console.log('***********************************')
};


//Function  for confirm if you want this cart or you want generate another one
function acceptCard() {
    do {
        var accept = confirm('Aceptas la tarjeta?\nPara confirmar click "Ok"!\nPara generar otra click en "Cancel"!');
        if (accept) {
            name = prompt('El jugador tendrá inicialmente ' + point + ' puntos!\nA la medidada que vayan pasando los turnos,\neses puntos se van restando!\nPor favor introduce tu nombre! para empezar a jugar!');
        } else {
            console.log('******** Nueva Tarjeta *********');
            createCard();
        }
    } while (!accept)
};

//Function to generate coincidence and change
function generateCoincidence() {
    console.log('******** NUEVO TURNO *************')
    var random = generateNum();
    for (var i = 0; i < bingoCard.length; i++) {
        if (bingoCard[i].number === random) {
            bingoCard[i].matched = true;
            bingoCard[i].number = 'X';
            console.log('Hay coincidencia!!!!!')
        }
    };
    console.log('Turno nº' + turn + ' **  Número generado fue el ' + random + '!');
    turn++
    point--

    showCard()
    finishGame();

};

//Generate a random Number al time diferent
function generateNum() {
    do {
        var number = Math.floor((Math.random() * 60) + 1);
    } while (arrRandomNum.includes(number));
    arrRandomNum.push(number);

    return number
};

//Function for finish teh game
function finishGame() {
    for (var i = 0; i < 15; i++) {
        if (i < 5 && bingoCard[i].matched) {
            line1++
        } else if (i < 10 && bingoCard[i].matched) {
            line2++
        } else if (i < 15 && bingoCard[i].matched) {
            line3++
        }
    }
    if (line1 === 5 && line2 === 5 && line3 === 5) {
        console.log('******************************');
        console.log('****** TERMINO EL JUEGO ******');
        console.log('******* EN ' + (turn - 1) + ' TUNOS *******');
        console.log('******************************');

        listRanking.push(generateRanking(name, point));
        orderRanking();

        console.log('RANKING DE JUGADORES:')
        for (var i = 0; i < listRanking.length; i++) {
            console.log(listRanking[i].name + ' -------- ' + listRanking[i].point + ' puntos')
        }

        alert('Ciao!')
        resetValues();
    } else if (line1 === 5 || line2 === 5 || line3 === 5) {
        if (line1 === 5 && showLine) {
            console.log('LINEA !!!!!')
            console.log('*********************************')
            showLine = false;
        }
        if (line2 === 5 && showLine) {
            console.log('LINEA !!!!!')
            console.log('*********************************')
            showLine = false;
        }
        if (line3 === 5 && showLine) {
            console.log('LINEA !!!!!')
            console.log('*********************************')
            showLine = false;
        }
        line1 = 0;
        line2 = 0;
        line3 = 0;
        console.log('********FINAL DEL TURNO***********')
        askNewTurn()
    } else {
        line1 = 0;
        line2 = 0;
        line3 = 0;
        console.log('********FINAL DEL TURNO***********')
        askNewTurn();
    }

}
//Ask for a newTurn
function askNewTurn() {
    var conf = confirm('¿ ' + name + ', quieres jugar un nuevo turno ?')
    if (conf) {
        generateCoincidence();
    }
};
//Function to reset all values and begin a new game
function resetValues() {
    name = '';
    point = 100;
    turn = 1;
    showLine = true;
    line1 = 0;
    line2 = 0;
    line3 = 0;
    arrRandomNum = [0];
    arrNumberBingoCart = [0];
}
// Function to generate ranquing
function generateRanking(name, point) {
    return {
        name: name,
        point: point
    }
}
// Function to order number of points

// Function to order number of points
function orderRanking() {
    listRanking.sort(function(a, b) {
        return b.point - a.point;
    })
}