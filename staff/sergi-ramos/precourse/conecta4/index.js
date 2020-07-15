var circles = [{ number: 1, state: 0, player: 0 }, { number: 2, state: 0, player: 0 }, { number: 3, state: 0, player: 0 }, { number: 4, state: 0, player: 0 },
{ number: 5, state: 0, player: 0 }, { number: 6, state: 0, player: 0 }, { number: 7, state: 0, player: 0 }, { number: 8, state: 0, player: 0 },
{ number: 9, state: 0, player: 0 }, { number: 10, state: 0, player: 0 }, { number: 11, state: 0, player: 0 }, { number: 12, state: 0, player: 0 },
{ number: 13, state: 0, player: 0 }, { number: 14, state: 0, player: 0 }, { number: 15, state: 0, player: 0 }, { number: 16, state: 0, player: 0 },
{ number: 17, state: 0, player: 0 }, { number: 18, state: 0, player: 0 }, { number: 19, state: 0, player: 0 }, { number: 20, state: 0, player: 0 },
{ number: 21, state: 0, player: 0 },
{ number: 22, state: 0, player: 0 }, { number: 23, state: 0, player: 0 }, { number: 24, state: 0, player: 0 }, { number: 25, state: 0, player: 0 },
{ number: 26, state: 0, player: 0 }, { number: 27, state: 0, player: 0 }, { number: 28, state: 0, player: 0 }, { number: 29, state: 0, player: 0 },
{ number: 30, state: 0, player: 0 }, { number: 31, state: 0, player: 0 }, { number: 32, state: 0, player: 0 }, { number: 33, state: 0, player: 0 },
{ number: 34, state: 0, player: 0 }, { number: 35, state: 0, player: 0 }, { number: 36, state: 0, player: 0 }, { number: 37, state: 0, player: 0 },
{ number: 38, state: 0, player: 0 }, { number: 39, state: 0, player: 0 }, { number: 40, state: 0, player: 0 }, { number: 41, state: 0, player: 0 },
{ number: 42, state: 0, player: 0 }];


var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var exitGame = document.getElementById('close');
var restartGame = document.getElementById('restart');
var restartCircles = document.getElementsByClassName('circle');
var turnSentence = document.getElementById('turn');
var lineOne = [circles[0].player, circles[7].player, circles[14].player, circles[21].player, circles[28].player, circles[35].player];
var lineTwo = [circles[1].player, circles[8].player, circles[15].player, circles[22].player, circles[29].player, circles[36].player];
var lineThree = [circles[2].player, circles[9].player, circles[16].player, circles[23].player, circles[30].player, circles[37].player];
var lineFour = [circles[3].player, circles[10].player, circles[17].player, circles[24].player, circles[31].player, circles[38].player];
var lineFive = [circles[4].player, circles[11].player, circles[18].player, circles[25].player, circles[32].player, circles[39].player];
var lineSix = [circles[5].player, circles[12].player, circles[19].player, circles[26].player, circles[33].player, circles[40].player];
var lineSeven = [circles[6].player, circles[13].player, circles[20].player, circles[27].player, circles[34].player, circles[41].player];
var lineRowOne = [circles[0].player, circles[1].player, circles[2].player, circles[3].player, circles[4].player, circles[5].player, circles[6].player];
var lineRowTwo = [circles[7].player, circles[8].player, circles[9].player, circles[10].player, circles[11].player, circles[12].player, circles[13].player];
var lineRowThree = [circles[14].player, circles[15].player, circles[16].player, circles[17].player, circles[18].player, circles[19].player, circles[20].player];
var lineRowFour = [circles[21].player, circles[22].player, circles[23].player, circles[24].player, circles[25].player, circles[26].player, circles[27].player];
var lineRowFive = [circles[28].player, circles[29].player, circles[30].player, circles[31].player, circles[32].player, circles[33].player, circles[34].player];
var lineRowSix = [circles[35].player, circles[36].player, circles[37].player, circles[38].player, circles[39].player, circles[40].player, circles[41].player];
var diagonalOne = [circles[0].player, circles[8].player, circles[16].player, circles[24].player, circles[32].player, circles[40].player];
var diagonalTwo = [circles[1].player, circles[9].player, circles[17].player, circles[25].player, circles[33].player, circles[41].player];
var diagonalThree = [circles[2].player, circles[10].player, circles[18].player, circles[26].player, circles[34].player];
var diagonalFour = [circles[3].player, circles[11].player, circles[19].player, circles[27].player];
var diagonalFive = [circles[7].player, circles[15].player, circles[23].player, circles[31].player, circles[39].player];
var diagonalSix = [circles[14].player, circles[22].player, circles[30].player, circles[38].player];
var diagonalSeven = [circles[3].player, circles[9].player, circles[15].player, circles[21].player];
var diagonalEight = [circles[4].player, circles[10].player, circles[16].player, circles[22].player, circles[28].player];
var diagonalNine = [circles[5].player, circles[11].player, circles[17].player, circles[23].player, circles[29].player, circles[35].player];
var diagonalTen = [circles[6].player, circles[12].player, circles[18].player, circles[24].player, circles[30].player, circles[36].player];
var diagonalEleven = [circles[13].player, circles[19].player, circles[25].player, circles[31].player, circles[37].player];
var diagonalTwelve = [circles[20].player, circles[26].player, circles[32].player, circles[38].player];
var turnColor = '#c53500'
var player = 1;


one.addEventListener('mouseover', function () {
    one.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
one.addEventListener('mouseout', function () {
    one.style.boxShadow = 'none';
});
two.addEventListener('mouseover', function () {
    two.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
two.addEventListener('mouseout', function () {
    two.style.boxShadow = 'none';
});
three.addEventListener('mouseover', function () {
    three.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
three.addEventListener('mouseout', function () {
    three.style.boxShadow = 'none';
});
four.addEventListener('mouseover', function () {
    four.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
four.addEventListener('mouseout', function () {
    four.style.boxShadow = 'none';
});
five.addEventListener('mouseover', function () {
    five.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
five.addEventListener('mouseout', function () {
    five.style.boxShadow = 'none';
});
six.addEventListener('mouseover', function () {
    six.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
six.addEventListener('mouseout', function () {
    six.style.boxShadow = 'none';
});
seven.addEventListener('mouseover', function () {
    seven.style.boxShadow = 'inset 1px 1px 2px 2px #004a8f';
});
seven.addEventListener('mouseout', function () {
    seven.style.boxShadow = 'none';
});

one.addEventListener('click', checkColumnOne);
two.addEventListener('click', checkColumnTwo);
three.addEventListener('click', checkColumnThree);
four.addEventListener('click', checkColumnFour);
five.addEventListener('click', checkColumnFive);
six.addEventListener('click', checkColumnSix);
seven.addEventListener('click', checkColumnSeven);
exitGame.addEventListener('click', exit);
restartGame.addEventListener('click', restart);


function exit() {
    window.close();
}


function restart() {
    debugger
    debugger
    turnColor = '#c53500'
    player = 1;

    for (var i = 0; i < restartCircles.length; i++) {
        restartCircles[i].style.backgroundColor = '';
    }
    var colorPlayer2 = document.getElementsByClassName('put');
    for (var i = 0; i < colorPlayer2.length; i++) {
        colorPlayer2[i].style.backgroundColor = '#c53500'
    }
    document.getElementById('colorPlayer').style.backgroundColor = '#c53500';

    for (var i = 0; i < circles.length; i++) {
        circles[i].state = 0;
        circles[i].player = 0;
    }
    document.getElementById('container-pointers').style.display = 'flex';
    document.getElementById('container-header').style.paddingBottom = '0px';
    document.getElementById('trumpet1').style.display = 'none';
    document.getElementById('trumpet2').style.display = 'none';
    turnSentence.innerHTML = 'TURNO PARA LAS';
    stopSound();
}

function playerAsignCircles() {
    lineOne = [circles[0].player, circles[7].player, circles[14].player, circles[21].player, circles[28].player, circles[35].player];
    lineTwo = [circles[1].player, circles[8].player, circles[15].player, circles[22].player, circles[29].player, circles[36].player];
    lineThree = [circles[2].player, circles[9].player, circles[16].player, circles[23].player, circles[30].player, circles[37].player];
    lineFour = [circles[3].player, circles[10].player, circles[17].player, circles[24].player, circles[31].player, circles[38].player];
    lineFive = [circles[4].player, circles[11].player, circles[18].player, circles[25].player, circles[32].player, circles[39].player];
    lineSix = [circles[5].player, circles[12].player, circles[19].player, circles[26].player, circles[33].player, circles[40].player];
    lineSeven = [circles[6].player, circles[13].player, circles[20].player, circles[27].player, circles[34].player, circles[41].player];
    lineRowOne = [circles[0].player, circles[1].player, circles[2].player, circles[3].player, circles[4].player, circles[5].player, circles[6].player];
    lineRowTwo = [circles[7].player, circles[8].player, circles[9].player, circles[10].player, circles[11].player, circles[12].player, circles[13].player];
    lineRowThree = [circles[14].player, circles[15].player, circles[16].player, circles[17].player, circles[18].player, circles[19].player, circles[20].player];
    lineRowFour = [circles[21].player, circles[22].player, circles[23].player, circles[24].player, circles[25].player, circles[26].player, circles[27].player];
    lineRowFive = [circles[28].player, circles[29].player, circles[30].player, circles[31].player, circles[32].player, circles[33].player, circles[34].player];
    lineRowSix = [circles[35].player, circles[36].player, circles[37].player, circles[38].player, circles[39].player, circles[40].player, circles[41].player];
    diagonalOne = [circles[0].player, circles[8].player, circles[16].player, circles[24].player, circles[32].player, circles[40].player];
    diagonalTwo = [circles[1].player, circles[9].player, circles[17].player, circles[25].player, circles[33].player, circles[41].player];
    diagonalThree = [circles[2].player, circles[10].player, circles[18].player, circles[26].player, circles[34].player];
    diagonalFour = [circles[3].player, circles[11].player, circles[19].player, circles[27].player];
    diagonalFive = [circles[7].player, circles[15].player, circles[23].player, circles[31].player, circles[39].player];
    diagonalSix = [circles[14].player, circles[22].player, circles[30].player, circles[38].player];
    diagonalSeven = [circles[3].player, circles[9].player, circles[15].player, circles[21].player];
    diagonalEight = [circles[4].player, circles[10].player, circles[16].player, circles[22].player, circles[28].player];
    diagonalNine = [circles[5].player, circles[11].player, circles[17].player, circles[23].player, circles[29].player, circles[35].player];
    diagonalTen = [circles[6].player, circles[12].player, circles[18].player, circles[24].player, circles[30].player, circles[36].player];
    diagonalEleven = [circles[13].player, circles[19].player, circles[25].player, circles[31].player, circles[37].player];
    diagonalTwelve = [circles[20].player, circles[26].player, circles[32].player, circles[38].player];

};


function changePlayer() {
    debugger

    if (turnColor == '#c53500') {
        var colorPlayer = document.getElementsByClassName('put');
        for (var i = 0; i < colorPlayer.length; i++) {
            colorPlayer[i].style.backgroundColor = '#edac00'
        }
        document.getElementById('colorPlayer').style.backgroundColor = '#edac00';
        player = 2;
        turnColor = '#edac00';
    } else {
        var colorPlayer2 = document.getElementsByClassName('put');
        for (var i = 0; i < colorPlayer2.length; i++) {
            colorPlayer2[i].style.backgroundColor = '#c53500'
        }

        document.getElementById('colorPlayer').style.backgroundColor = '#c53500';
        player = 1;
        turnColor = '#c53500';
    }
}

function checkColumnOne() {


    if (circles[35].state == 0) {
        document.getElementById('circle36').style.backgroundColor = turnColor;
        circles[35].state = 1;
        circles[35].player = player;
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowSix);
        checkWinner(diagonalNine);
    } else if (circles[28].state == 0) {
        document.getElementById('circle29').style.backgroundColor = turnColor;
        circles[28].state = 1;
        circles[28].player = player;
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowFive);
        checkWinner(diagonalEight);
    } else if (circles[21].state == 0) {
        document.getElementById('circle22').style.backgroundColor = turnColor;
        circles[21].state = 1;
        circles[21].player = player;
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowFour);
        checkWinner(diagonalSeven);
    } else if (circles[14].state == 0) {
        document.getElementById('circle15').style.backgroundColor = turnColor;
        circles[14].state = 1;
        circles[14].player = player;
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowThree);
        checkWinner(diagonalSix);
    } else if (circles[7].state == 0) {
        document.getElementById('circle8').style.backgroundColor = turnColor;
        circles[7].state = 1;
        circles[7].player = player
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowTwo);
        checkWinner(diagonalFive);
    } else if (circles[0].state == 0) {
        document.getElementById('circle1').style.backgroundColor = turnColor;
        circles[0].state = 1;
        circles[0].player = player
        playerAsignCircles();
        changePlayer()
        checkWinner(lineOne);
        checkWinner(lineRowOne);
        checkWinner(diagonalOne);
    }
}

function checkColumnTwo() {
    if (circles[36].state == 0) {
        document.getElementById('circle37').style.backgroundColor = turnColor;
        circles[36].state = 1;
        circles[36].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowSix);
        checkWinner(diagonalTen);
    } else if (circles[29].state == 0) {
        document.getElementById('circle30').style.backgroundColor = turnColor;
        circles[29].state = 1;
        circles[29].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowFive);
        checkWinner(diagonalNine);
    } else if (circles[22].state == 0) {
        document.getElementById('circle23').style.backgroundColor = turnColor;
        circles[22].state = 1;
        circles[22].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowFour);
        checkWinner(diagonalSix);
        checkWinner(diagonalEight);
    } else if (circles[15].state == 0) {
        document.getElementById('circle16').style.backgroundColor = turnColor;
        circles[15].state = 1;
        circles[15].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowThree);
        checkWinner(diagonalFive);
        checkWinner(diagonalSeven);
    } else if (circles[8].state == 0) {
        document.getElementById('circle9').style.backgroundColor = turnColor;
        circles[8].state = 1;
        circles[8].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowTwo);
        checkWinner(diagonalOne);
    } else if (circles[1].state == 0) {
        document.getElementById('circle2').style.backgroundColor = turnColor;
        circles[1].state = 1;
        circles[1].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineTwo);
        checkWinner(lineRowOne);
        checkWinner(diagonalTwo);
    }
}

function checkColumnThree() {
    if (circles[37].state == 0) {
        document.getElementById('circle38').style.backgroundColor = turnColor;
        circles[37].state = 1;
        circles[37].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowSix);
        checkWinner(diagonalEleven);
    } else if (circles[30].state == 0) {
        document.getElementById('circle31').style.backgroundColor = turnColor;
        circles[30].state = 1;
        circles[30].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowFive);
        checkWinner(diagonalSix);
        checkWinner(diagonalTen);
    } else if (circles[23].state == 0) {
        document.getElementById('circle24').style.backgroundColor = turnColor;
        circles[23].state = 1;
        circles[23].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowFour);
        checkWinner(diagonalFive);
        checkWinner(diagonalNine);
    } else if (circles[16].state == 0) {
        document.getElementById('circle17').style.backgroundColor = turnColor;
        circles[16].state = 1;
        circles[16].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowThree);
        checkWinner(diagonalOne);
        checkWinner(diagonalEight);
    } else if (circles[9].state == 0) {
        document.getElementById('circle10').style.backgroundColor = turnColor;
        circles[9].state = 1;
        circles[9].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowTwo);
        checkWinner(diagonalTwo);
        checkWinner(diagonalSeven);

    } else if (circles[2].state == 0) {
        document.getElementById('circle3').style.backgroundColor = turnColor;
        circles[2].state = 1;
        circles[2].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineThree);
        checkWinner(lineRowOne);
        checkWinner(diagonalThree);
    }
}

function checkColumnFour() {
    if (circles[38].state == 0) {
        document.getElementById('circle39').style.backgroundColor = turnColor;
        circles[38].state = 1;
        circles[38].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowSix);
        checkWinner(diagonalSix);
        checkWinner(diagonalTwelve);
    } else if (circles[31].state == 0) {
        document.getElementById('circle32').style.backgroundColor = turnColor;
        circles[31].state = 1;
        circles[31].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowFive);
        checkWinner(diagonalFive);
        checkWinner(diagonalEleven);
    } else if (circles[24].state == 0) {
        document.getElementById('circle25').style.backgroundColor = turnColor;
        circles[24].state = 1;
        circles[24].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowFour);
        checkWinner(diagonalOne);
        checkWinner(diagonalTen);
    } else if (circles[17].state == 0) {
        document.getElementById('circle18').style.backgroundColor = turnColor;
        circles[17].state = 1;
        circles[17].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowThree);
        checkWinner(diagonalTwo);
        checkWinner(diagonalNine);
    } else if (circles[10].state == 0) {
        document.getElementById('circle11').style.backgroundColor = turnColor;
        circles[10].state = 1;
        circles[10].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowTwo);
        checkWinner(diagonalThree);
        checkWinner(diagonalEight);
    } else if (circles[3].state == 0) {
        document.getElementById('circle4').style.backgroundColor = turnColor;
        circles[3].state = 1;
        circles[3].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFour);
        checkWinner(lineRowOne);
        checkWinner(diagonalFour);
        checkWinner(diagonalSeven);
    }
}

function checkColumnFive() {
    if (circles[39].state == 0) {
        document.getElementById('circle40').style.backgroundColor = turnColor;
        circles[39].state = 1;
        circles[39].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowSix);
        checkWinner(diagonalFive);
    } else if (circles[32].state == 0) {
        document.getElementById('circle33').style.backgroundColor = turnColor;
        circles[32].state = 1;
        circles[32].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowFive);
        checkWinner(diagonalOne);
        checkWinner(diagonalTwelve);
    } else if (circles[25].state == 0) {
        document.getElementById('circle26').style.backgroundColor = turnColor;
        circles[25].state = 1;
        circles[25].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowFour);
        checkWinner(diagonalTwo);
        checkWinner(diagonalEleven);
    } else if (circles[18].state == 0) {
        document.getElementById('circle19').style.backgroundColor = turnColor;
        circles[18].state = 1;
        circles[18].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowThree);
        checkWinner(diagonalThree);
        checkWinner(diagonalTen);
    } else if (circles[11].state == 0) {
        document.getElementById('circle12').style.backgroundColor = turnColor;
        circles[11].state = 1;
        circles[11].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowTwo);
        checkWinner(diagonalFour);
        checkWinner(diagonalNine);
    } else if (circles[4].state == 0) {
        document.getElementById('circle5').style.backgroundColor = turnColor;
        circles[4].state = 1;
        circles[4].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineFive);
        checkWinner(lineRowOne);
        checkWinner(diagonalEight);
    }
}

function checkColumnSix() {
    debugger
    if (circles[40].state == 0) {
        document.getElementById('circle41').style.backgroundColor = turnColor;
        circles[40].state = 1;
        circles[40].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowSix);
        checkWinner(diagonalOne);
    } else if (circles[33].state == 0) {
        document.getElementById('circle34').style.backgroundColor = turnColor;
        circles[33].state = 1;
        circles[33].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowFive);
        checkWinner(diagonalTwo);
    } else if (circles[26].state == 0) {
        document.getElementById('circle27').style.backgroundColor = turnColor;
        circles[26].state = 1;
        circles[26].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowFour);
        checkWinner(diagonalThree);
        checkWinner(diagonalTwelve);
    } else if (circles[19].state == 0) {
        document.getElementById('circle20').style.backgroundColor = turnColor;
        circles[19].state = 1;
        circles[19].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowThree);
        checkWinner(diagonalFour);
        checkWinner(diagonalEleven);
    } else if (circles[12].state == 0) {
        document.getElementById('circle13').style.backgroundColor = turnColor;
        circles[12].state = 1;
        circles[12].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowTwo);
        checkWinner(diagonalTen);
    } else if (circles[5].state == 0) {
        document.getElementById('circle6').style.backgroundColor = turnColor;
        circles[5].state = 1;
        circles[5].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSix);
        checkWinner(lineRowOne);
        checkWinner(diagonalNine);
    }
}

function checkColumnSeven() {
    debugger
    if (circles[41].state == 0) {
        document.getElementById('circle42').style.backgroundColor = turnColor;
        circles[41].state = 1;
        circles[41].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowSix);
        checkWinner(diagonalTwo);
    } else if (circles[34].state == 0) {
        document.getElementById('circle35').style.backgroundColor = turnColor;
        circles[34].state = 1;
        circles[34].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowFive);
        checkWinner(diagonalThree);
    } else if (circles[27].state == 0) {
        document.getElementById('circle28').style.backgroundColor = turnColor;
        circles[27].state = 1;
        circles[27].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowFour);
        checkWinner(diagonalFour);
    } else if (circles[20].state == 0) {
        document.getElementById('circle21').style.backgroundColor = turnColor;
        circles[20].state = 1;
        circles[20].player = player;
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowThree);
        checkWinner(diagonalTwelve);
    } else if (circles[13].state == 0) {
        document.getElementById('circle14').style.backgroundColor = turnColor;
        circles[13].state = 1;
        circles[13].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowTwo);
        checkWinner(diagonalEleven);
    } else if (circles[6].state == 0) {
        document.getElementById('circle7').style.backgroundColor = turnColor;
        circles[6].state = 1;
        circles[6].player = player
        playerAsignCircles();
        changePlayer();
        checkWinner(lineSeven);
        checkWinner(lineRowOne);
        checkWinner(diagonalTen);
    }
}
function winnnerSound() {
    document.getElementById('hitSound').play();
}

function stopSound() {
    document.getElementById('hitSound').stop();
}
//funcion que checkea si hay 4 en linia
function checkWinner(arr) {
    debugger
    debugger

    var player1 = 0;
    var player2 = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            player1++;
            player2 = 0;

            if (player1 == 4) {
                changePlayer();
                turnSentence.innerHTML = 'EL GANADOR ES ';
                winnnerSound();
                document.getElementById('trumpet1').style.display = 'inline';
                document.getElementById('trumpet2').style.display = 'inline';
                document.getElementById('container-pointers').style.display = 'none';
                document.getElementById('container-header').style.paddingBottom = '34px';

                return true;
            }
        } else if (arr[i] == 2) {
            player1 = 0;
            player2++;
            if (player2 == 4) {
                changePlayer();
                turnSentence.innerHTML = 'EL GANADOR ES ';
                winnnerSound();
                document.getElementById('trumpet1').style.display = 'inline';
                document.getElementById('trumpet2').style.display = 'inline';
                document.getElementById('container-pointers').style.display = 'none';
                document.getElementById('container-header').style.paddingBottom = '34px';

                return true;
            }
        } else {
            player1 = 0;
            player2 = 0;
        }
    }
    return false;

}