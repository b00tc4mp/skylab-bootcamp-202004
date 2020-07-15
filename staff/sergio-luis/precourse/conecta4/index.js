//----------------------
//----- CONECTA 4 ------
//----------------------
var choisePlayer = {
    humanPlayer: true,
    computerPlayer: false,
}
var column = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
var row = ['1', '2', '3', '4', '5', '6'];
var pointshumanPlayer = 0;
var pointsPlayer2 = 0;
//Audio Variables
var pieceAudio = new Audio('./sonido/coin.wav');
var winAudio = new Audio('./sonido/win.wav');
var loseAudio = new Audio('./sonido/lose.flac');
var clickAudio = new Audio('./sonido/click.wav');

//--------------
//CREATE A BROAD 
//--------------
var arrBoard = [];

function cell() {
    return {
        empty: true,
        red: false,
        yellow: false
    }
}

//Creat a bord with diferents cell
column.forEach(column => {
    row.forEach(row => {
        arrBoard[column + row] = cell();
    })
})

//Chose Player
humanPlayer.addEventListener('click', function() {
    clickAudio.play();
    choisePlayer.computerPlayer = false;
    game.classList.add('block');
    choiseGame.style.display = 'none';
})
computerPlayer.addEventListener('click', function() {
    clickAudio.play();
    choisePlayer.computerPlayer = true;
    game.classList.add('block');
    choiseGame.style.display = 'none';
    computer.innerHTML = 'Computer';
})

//------------------------
//ICONS HOVER FUNCIONALITY
//-----------------------
var arrIcon = document.getElementsByClassName('fas');

for(icon of arrIcon){
    icon.onmouseover = function(event) {
        if (choisePlayer.humanPlayer) {
            document.getElementById(event.target.id).style.color = 'red';
        } else {
            document.getElementById(event.target.id).style.color = 'yellow';
        }
    }
   icon.onmouseleave = function(event) {
        document.getElementById(event.target.id).style.color = 'silver';
    }
}

//-----------------------------
//FUNCIONALITY FOR PUT THE COINS
//------------------------------
var arrButton = document.getElementsByClassName('button');
// For each column creat a click event
for (var button of arrButton) {
    button.onclick = function() {
        turn(choisePlayer.humanPlayer, choisePlayer.computerPlayer);
    }
}


//-----------
//CHANGE TURN
//-----------

function turn(player, computerPlayer) {
    if (player) {
        printRed(event);
        finishGame('red');
    } else if (!player && !computerPlayer) {
        printYellow(event);
        finishGame('yellow');
    } else if (!player && computerPlayer) {
        ramdonColumnComputer();
    }
}


//-----------
//PRINT RED
//-----------
function printRed(event) {
    column.forEach(element => {
        iconClickPlayer(event, 'player2', 'red', element, '1', '2', '3', '4', '5', '6');
    })
}
//-----------
//PRINT YELLOW
//-----------
function printYellow(event) {
    column.forEach(element => {
        iconClickPlayer(event, 'humanPlayer', 'yellow', element, '1', '2', '3', '4', '5', '6');
    })
}

//--------------------------------------
//FUNCTION FOR BUTTONS WHO PUT THE COINS
//--------------------------------------
function iconClickPlayer(event, player, color, column, row1, row2, row3, row4, row5, row6) {
    if (arrBoard[column + row1].empty && event.target.id === column) {
        printCoin(column, row1, player, color)
    } else if (arrBoard[column + row2].empty && event.target.id === column) {
        printCoin(column, row2, player, color)
    } else if (arrBoard[column + row3].empty && event.target.id === column) {
        printCoin(column, row3, player, color)
    } else if (arrBoard[column + row4].empty && event.target.id === column) {
        printCoin(column, row4, player, color)
    } else if (arrBoard[column + row5].empty && event.target.id === column) {
        printCoin(column, row5, player, color)
    } else if (arrBoard[column + row6].empty && event.target.id === column) {
        printCoin(column, row6, player, color)
    }
}

function printCoin(column, row, player, color) {
    document.getElementById(column + row).style.backgroundColor = color;
    arrBoard[column + row].empty = false;
    arrBoard[column + row][color] = true;
    writePlayer(player);
    pieceAudio.play();
}
//Write name of player1/player2/computer 
function writePlayer(player) {
    var writePlayer = document.getElementById('player');
    if (player === 'humanPlayer') {
        choisePlayer.humanPlayer = true;
        setTimeout(function() {
            writePlayer.innerHTML = 'Player 1';
            writePlayer.classList.remove('writeYellow');
            writePlayer.classList.add('writeRed');
        }, 700);

    } else if (player === 'player2' && choisePlayer.computerPlayer === false) {
        choisePlayer.humanPlayer = false;
        setTimeout(function() {
            writePlayer.innerHTML = 'Player 2';
            writePlayer.classList.remove('writeRed');
            writePlayer.classList.add('writeYellow');
        }, 700);
    } else if (player === 'player2' && choisePlayer.computerPlayer === true) {
        choisePlayer.humanPlayer = false;
        setTimeout(function() {
            writePlayer.innerHTML = 'Computer';
            writePlayer.classList.remove('writeRed');
            writePlayer.classList.add('writeYellow');
        }, 1000);
        setTimeout(function() { turn(choisePlayer.humanPlayer, choisePlayer.computerPlayer);; }, 1000);
    }
};

//----------------------
//ANALISE OF FINISH GAME
//----------------------

function finishGame(color) {
    console.log(arrBoard)
    //analise column
    column.forEach(column => {
            for (var i = 0; i < 3; i++) {
                analiseColumn(column, row[i], row[i + 1], row[i + 2], row[i + 3], color)
            }
        })
        //analise row
    row.forEach(row => {
            for (var i = 0; i < 4; i++) {
                analiseRow(column[i], column[i + 1], column[i + 2], column[i + 3], row, color)
            }
        })
        //analise diagonal
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 6; j++) {
            if (j < 3) {
                analiseDiagonal(column[i], column[i + 1], column[i + 2], column[i + 3], row[j], row[j + 1], row[j + 2], row[j + 3], color)
            } else {
                analiseDiagonal(column[i], column[i + 1], column[i + 2], column[i + 3], row[j], row[j - 1], row[j - 2], row[j - 3], color)
            }
        }
    }
    //analise board complete
    allBoardComplet(column, row);
}


//-------------------------------------
//FUNCTION WHO ANALISE DIFERENTS CASES
//------------------------------------
function analiseColumn(column, row1, row2, row3, row4, color) {
    if (arrBoard[column + row1][color] && arrBoard[column + row2][color] && arrBoard[column + row3][color] && arrBoard[column + row4][color]) {
        setTimeout(function() { win(color) }, 700);
    }
}

function analiseRow(column1, column2, column3, column4, row, color) {
    if (arrBoard[column1 + row][color] && arrBoard[column2 + row][color] && arrBoard[column3 + row][color] && arrBoard[column4 + row][color]) {
        setTimeout(function() { win(color); }, 700);
    }
}

function analiseDiagonal(column1, column2, column3, column4, row1, row2, row3, row4, color) {
    if (arrBoard[column1 + row1][color] && arrBoard[column2 + row2][color] && arrBoard[column3 + row3][color] && arrBoard[column4 + row4][color]) {
        setTimeout(function() { win(color); }, 700);
    }
}

function allBoardComplet(column, row) {
    var count = 0;
    column.forEach(element1 => {
        row.forEach(element2 => {
            if (!arrBoard[element1 + element2].empty) {
                count++;
            }
        })
    })

    if (count === 42) {
        setTimeout(function() { draw(); }, 700);
    };
}


//------------
//FUNCTION WIN or LOSE
//------------
function win(color) {
    if (color === 'red') {
        writeResult('Player 1 Win!!!','red','&#128513;',winAudio)
        pointshumanPlayer++;
    } else if (color === 'yellow' && !choisePlayer.computerPlayer) {
        writeResult('Player 2 Win!!!', 'yellow', '&#128513;', winAudio)
        pointsPlayer2++;
    } else if (color === 'yellow' && choisePlayer.computerPlayer) {
        writeResult('You Lose!!!','yellow','&#128542;',loseAudio)
        pointsPlayer2++;
    }
}
//------------
//FUNCTION DRAW
//------------
function draw() {
    writeResult('DRAW!!!','white','&#128529;',winAudio)
}

function writeResult(winResultParameter,colorResult,emojiParameter,audio){
    winBoard.classList.add('block');
    winResult.innerHTML = winResultParameter;
    winResult.style.color = colorResult;
    emoji.innerHTML = emojiParameter;
    audio.play();
}

//-----------------
//BUTTONS OF BOARDS FUNCIONALITY
//-----------------

restart.addEventListener('click', function() {
    clickAudio.play();
    restartBoard.classList.add('block');
});
restartYes.addEventListener('click', function() {
    clickAudio.play();
    restartGame();
    restartBoard.classList.remove('block');
});
restartNo.addEventListener('click', function() {
    clickAudio.play();
    restartBoard.classList.remove('block');
});
exit.addEventListener('click', function() {
    clickAudio.play();
    exitBoard.classList.add('block');
});
exitYes.addEventListener('click', function() {
    clickAudio.play();
    setTimeout(function() { location.reload(); }, 400);
});
exitNo.addEventListener('click', function() {
    clickAudio.play();
    exitBoard.classList.remove('block');
});
yes.addEventListener('click', function() {
    clickAudio.play();
    playAgainYes();
});
no.addEventListener('click', function() {
    clickAudio.play();
    setTimeout(function() { location.reload(); }, 400);
});


function restartGame() {
    codeResetBoard()
    pointshumanPlayer = 0;
    pointsPlayer2 = 0;
    resulthumanPlayer.innerHTML = '0';
    resultPlayer2.innerHTML = '0';
    writePlayer('humanPlayer');
}


function playAgainYes() {
    codeResetBoard();
    winBoard.classList.remove('block')
    resulthumanPlayer.innerHTML = pointshumanPlayer;
    resultPlayer2.innerHTML = pointsPlayer2;
    writePlayer('humanPlayer');
}


function codeResetBoard() {
    column.forEach(element1 => {
        row.forEach(element2 => {
            arrBoard[element1 + element2].empty = true;
            arrBoard[element1 + element2].red = false;
            arrBoard[element1 + element2].yellow = false;
            document.getElementById(element1 + element2).style.backgroundColor = 'white';
        });
    });
}


//----------------------------------------------------------------------------
// IA COMPUTER (Yellow)
//----------------------------------------------------------------------------
function ramdonColumnComputer() {
    var randomColumn = Math.floor(Math.random() * 7);

    

    iconClickComputer('humanPlayer', 'yellow', column[randomColumn], '1', '2', '3', '4', '5', '6');
    finishGame('yellow');
}

function iconClickComputer(player, color, column, row1, row2, row3, row4, row5, row6) {
    if (arrBoard[column + row1].empty) {
        printCoinComputer(player, color, column, row1)
    } else if (arrBoard[column + row2].empty) {
        printCoinComputer(player, color, column, row2)
    } else if (arrBoard[column + row3].empty) {
        printCoinComputer(player, color, column, row3)
    } else if (arrBoard[column + row4].empty) {
        printCoinComputer(player, color, column, row4)
    } else if (arrBoard[column + row5].empty) {
        printCoinComputer(player, color, column, row5)
    } else if (arrBoard[column + row6].empty) {
        printCoinComputer(player, color, column, row6)
    } else {
        ramdonColumnComputer();
    }
}

function printCoinComputer(player, color, column, row) {
    document.getElementById(column + row).style.backgroundColor = color;
    arrBoard[column + row].empty = false;
    arrBoard[column + row][color] = true;
    document.getElementById(column).style.color = color;
    setTimeout(function() { document.getElementById(column).style.color = ''; }, 1000);
    writePlayer(player);
    pieceAudio.play();
}



