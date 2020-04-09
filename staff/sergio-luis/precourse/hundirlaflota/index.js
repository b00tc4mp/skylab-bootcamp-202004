//**************************************
//************CONFIGURATION*************
//**************************************
var column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var turn = 1;
var arrComputerShots = [];
var player = {
    playerOne: true
}
var playerBoardWithBoats = [];
var computerBoard = [];
var computerBoardWithBoats = [];


function cell(A, B, C, D, E, F, G, H, I, J) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
    this.F = F;
    this.G = G;
    this.H = H;
    this.I = I;
    this.J = J;
}

// create Diferents boards
for (var i = 0; i < row.length; i++) {
    playerBoardWithBoats.push(new cell('🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦'))
    computerBoard.push(new cell('🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦'))
    computerBoardWithBoats.push(new cell('🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦', '🟦'));
};

//Type of boats
var boats = [{
        type: 'carrier',
        size: 5,
        times: 1
    },
    {
        type: 'battleship',
        size: 4,
        times: 1
    },
    {
        type: 'cruiser',
        size: 3,
        times: 1
    },
    {
        type: 'submarine',
        size: 2,
        times: 1
    },
    {
        type: 'destroyer',
        size: 1,
        times: 1
    },
]

generateBoats('player', boats);
generateBoats('computer', boats)
//----------------------------------------------------------------------------
// This part of code just generate boats in vertical position need more work!!!
//---------------------------------------------------------------------------
function generateBoats(player, boats) {
    var timesColumnPlayer = [];
    var timesColumnComputer = [];
    var timesRowPlayer = [];
    var timesRowComputer = [];

    if (player === 'player') {
        boats.forEach(element => {
            //this part of the code is for not repeat column an row random!!
            do {
                var columnIndex = Math.floor(Math.random() * 10);
            } while (timesColumnPlayer.includes(columnIndex));
            timesColumnPlayer.push(columnIndex);

            do {
                var randomRow = Math.floor(Math.random() * 5); //row begin position
            } while (timesRowPlayer.includes(randomRow));
            timesRowPlayer.push(randomRow);

            var randomColumn = column[columnIndex]; //colum begin position

            // var randomDirection = Math.floor(Math.random() * 2); // 0- horizontal 1-vertical
            for (var i = 0; i < element.times; i++) {
                // if (randomDirection === 0) { //horizontal
                //     for (var i =columnIndex; i <= (element.size+columnIndex) ; i++) {
                //         playerBoardWithBoats[randomRow][column[i]] = '⬛'
                //     }
                // } else { //vertical
                for (var j = randomRow; j <= (element.size + randomRow); j++) {
                    playerBoardWithBoats[j][randomColumn] = '⬛'
                }

                // }
            }
        });

    } else {
        boats.forEach(element => {
            //this part of the code is for not repeat column an row random!!
            do {
                var columnIndex = Math.floor(Math.random() * 10);
            } while (timesColumnComputer.includes(columnIndex));
            timesColumnComputer.push(columnIndex);

            do {
                var randomRow = Math.floor(Math.random() * 5);
            } while (timesRowComputer.includes(randomRow));
            timesRowComputer.push(randomRow);

            var randomColumn = column[columnIndex];

            for (var i = 0; i < element.times; i++) {
                for (var j = randomRow; j <= (element.size + randomRow); j++) {
                    computerBoardWithBoats[j][randomColumn] = '⬛'
                }
            }
        });
    }
}

//***************************** 
//************GAME*************
//*****************************
welcome(); 

function welcome() {
    var choisePlay = confirm('Quiere empezar a jugar?')
    if (choisePlay) {
        do {
            player.name = prompt('Este es el juego de la Batalla naval!\nEl juego está executado en consola!\nIntroduce tu nombre para empezar a jugar!');
        } while (!isNaN(player.name));
        showBoard();
        program();
    } else {
        alert('Bye!!!');
    }
}

function showBoard() {
    console.log('******** Computer Board ***********');
    console.table(computerBoard)
    console.log('******** Player Board ***********');
    console.table(playerBoardWithBoats);
}


function program() {
    console.log('***********************************************************************************')
    console.log('************* TURNO N* ' + turn + ' ***************************************************')
    console.log('***********************************************************************************')

    if (player.playerOne) {
        playerChoise()
    } else {
        computerChoise();
    }

}

function playerChoise() {
    console.log('*********************************************')
    console.log('************* TURNO JUGADOR *****************')
    console.log('*********************************************')
        //Column posiition
    do {
        var columnPosition = prompt('Introduce la columna A-J').toUpperCase();
    } while (columnPosition !== 'A' &&
        columnPosition !== 'B' &&
        columnPosition !== 'C' &&
        columnPosition !== 'D' &&
        columnPosition !== 'E' &&
        columnPosition !== 'F' &&
        columnPosition !== 'G' &&
        columnPosition !== 'H' &&
        columnPosition !== 'I' &&
        columnPosition !== 'J');

    //Row poaition
    do {
        var rowPosition = parseInt(prompt('Introduce la linea 0-' + (row.length - 1) + '!'));
    } while (0 < rowPosition && rowPosition > row.length)

    console.log('Columna: ' + columnPosition + ', Linea: ' + rowPosition);

    setTimeout(function() {
        if (computerBoardWithBoats[rowPosition][columnPosition] === '🟦') {
            console.log('AGUA!!!!😔😔😔')
            computerBoard[rowPosition][columnPosition] = '🟢'
            computerBoardWithBoats[rowPosition][columnPosition] = '🟦'

        } else if (computerBoardWithBoats[rowPosition][columnPosition] === '⬛') {
            console.log('BOMBA!!!!😄😄😄')
            computerBoard[rowPosition][columnPosition] = '🔴'
            computerBoardWithBoats[rowPosition][columnPosition] = '🟦'
        }
    }, 2000);

    setTimeout(function() {
        showBoard();
        player.playerOne = false;
        turn++;
        finishGame('player');

    }, 3000);

}

function computerChoise() {
    console.log('*********************************************')
    console.log('************* TURNO ORDENADOR ***************')
    console.log('*********************************************')
    console.log('Ordenador pensando.....');

    do {
        var randomColumn = column[Math.floor(Math.random() * 5)];
        var randomRow = Math.floor(Math.random() * 5);
    } while (arrComputerShots.includes(randomColumn + randomRow));
    arrComputerShots.push(randomColumn + randomRow);

    setTimeout(function() {
        console.log('Columna: ' + randomColumn + ', Linea: ' + randomRow);
    }, 1000);

    setTimeout(function() {
        if (playerBoardWithBoats[randomRow][randomColumn] === '🟦') {
            console.log('AGUA!!!!😄😄😄')
            playerBoardWithBoats[randomRow][randomColumn] = '🟢';

        } else if (playerBoardWithBoats[randomRow][randomColumn] === '⬛') {
            console.log('BOMBA!!!!😔😔😔')
            playerBoardWithBoats[randomRow][randomColumn] = '🔴'
        }
    }, 3000);

    setTimeout(function() {
        showBoard();
        player.playerOne = true;
        turn++;
        finishGame('computer');

    }, 4000);

}


function finishGame(player) {
    if (player === 'player') {
        var cont1 = true;
        row.forEach(element1 => {
            column.forEach(element2 => {
                if (computerBoardWithBoats[element1][element2] === '⬛') {
                    cont1 = false;
                }
            })
        })
        if (cont1) {
            do {
                var option = prompt('HA GANADO!😄😄😄 en '+turn+' tunos!\nDesea volver a jugar?y/n').toLowerCase()
            } while (option != 'n' && option != 'y')
            if (option === 'y') {
                resetValues()
                welcome()
            } else {
                alert('Bye!')
            }

        } else {
            program();
        }
    } else if (player === 'computer') {
        var cont2 = true;
        row.forEach(element1 => {
            column.forEach(element2 => {
                if (playerBoardWithBoats[element1][element2] === '⬛') {
                    cont2 = false;
                }
            })
        })
        if (cont1) {
            do {
                var option = prompt('HA PERDIDO!😔😔😔 en '+turn+' tunos!\nDesea volver a jugar?y/n').toLowerCase()
            } while (option != 'n' && option != 'y')
            if (option === 'y') {
                resetValues()
                welcome()
            } else {
                alert('Bye!')
            }
        } else {
            program();
        }
    }
}

function resetValues() {
    turn = 1;
    arrComputerShots = [];
    player.playerOne=true;

    row.forEach(element1 => {
        column.forEach(element2 => {
            computerBoardWithBoats[element1][element2] === '🟦';
            computerBoard[element1][element2] === '🟦';
            playerBoardWithBoats[element1][element2] === '🟦';
        });
    });
    generateBoats('player', boats);
    generateBoats('computer', boats);
}

