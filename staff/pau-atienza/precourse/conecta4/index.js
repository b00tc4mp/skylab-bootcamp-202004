const buttonPVP = document.getElementById('PvP');
const buttonPVB = document.getElementById('PvB');
const buttonPlayAgain = document.getElementById('Play');

const columns = Array.from(document.querySelectorAll('.column'));

for (i in columns){
    columns[i].addEventListener('mouseenter', (e)=>{
        e.target.classList.add('mouseoncolumn')
    })
    columns[i].addEventListener('mouseleave', (e)=>{
        e.target.classList.remove('mouseoncolumn')
    })
}


//We generate an array that represents the board column by column
const boardByColumns = [

    {column: 'a', full: false, content: 
    [{tag: 'a1', coordinates: [0,0], value: 0},
    {tag: 'a2', coordinates: [0,1], value: 0},
    {tag: 'a3', coordinates: [0,2], value: 0},
    {tag: 'a4', coordinates: [0,3], value: 0},
    {tag: 'a5', coordinates: [0,4], value: 0},
    {tag: 'a6', coordinates: [0,5], value: 0}
    ]}, 
    {column: 'b', full: false, content: 
    [{tag: 'b1', coordinates: [1,0], value: 0},
    {tag: 'b2', coordinates: [1,1], value: 0},
    {tag: 'b3', coordinates: [1,2], value: 0},
    {tag: 'b4', coordinates: [1,3], value: 0},
    {tag: 'b5', coordinates: [1,4], value: 0},
    {tag: 'b6', coordinates: [1,5], value: 0},
    ]},
    {column: 'c', full: false, content: 
    [{tag: 'c1', coordinates: [2,0], value: 0},
    {tag: 'c2', coordinates: [2,1], value: 0},
    {tag: 'c3', coordinates: [2,2], value: 0},
    {tag: 'c4', coordinates: [2,3], value: 0},
    {tag: 'c5', coordinates: [2,4], value: 0},
    {tag: 'c6', coordinates: [2,5], value: 0}
    ]},    
    {column: 'd', full: false, content: 
    [{tag: 'd1', coordinates: [3,0], value: 0},
    {tag: 'd2', coordinates: [3,1], value: 0},
    {tag: 'd3', coordinates: [3,2], value: 0},
    {tag: 'd4', coordinates: [3,3], value: 0},
    {tag: 'd5', coordinates: [3,4], value: 0},
    {tag: 'd6', coordinates: [3,5], value: 0},
    ]},  
    {column: 'e', full: false, content: 
    [{tag: 'e1', coordinates: [4,0], value: 0},
    {tag: 'e2', coordinates: [4,1], value: 0},
    {tag: 'e3', coordinates: [4,2], value: 0},
    {tag: 'e4', coordinates: [4,3], value: 0},
    {tag: 'e5', coordinates: [4,4], value: 0},
    {tag: 'e6', coordinates: [4,5], value: 0}
    ]}, 
    {column: 'f', full: false, content: 
    [{tag: 'f1', coordinates: [5,0], value: 0},
    {tag: 'f2', coordinates: [5,1], value: 0},
    {tag: 'f3', coordinates: [5,2], value: 0},
    {tag: 'f4', coordinates: [5,3], value: 0},
    {tag: 'f5', coordinates: [5,4], value: 0},
    {tag: 'f6', coordinates: [5,5], value: 0},
    ]},
    {column: 'g', full: false, content: 
    [{tag: 'g1', coordinates: [6,0], value: 0},
    {tag: 'g2', coordinates: [6,1], value: 0},
    {tag: 'g3', coordinates: [6,2], value: 0},
    {tag: 'g4', coordinates: [6,3], value: 0},
    {tag: 'g5', coordinates: [6,4], value: 0},
    {tag: 'g6', coordinates: [6,5], value: 0},
    ]}
];

//Generate the function that adds the values to the board
function addPiece(board, column){

    if (board[column].full === false){

        for (var i=0; i<6; i++){

            if (board[column].content[i].value === 0){
                if (turn1 === true){
                    board[column].content[i].value = 1;     
                }
                else if(turn1 === false){
                    board[column].content[i].value = 2;
                };

                if (i === 5){
                    board[column].full = true;
                }
                return
            }
        }
    }
};

//El juego empieza en turno 1 (Jugador 1), y cuando es falso es turno del jugador 2
var turn1 = true;
//Cambia de turno: cambia la variable y lo representa en el tablero
function changeTurn(){
    turn = document.getElementById('turn');
    if (turn1 === true){
        turn1 = false;

        turn.textContent = 'Player 2';
        turn.classList.remove('player1');
        turn.classList.add('player2');
    }
    else if(turn1 === false){
        turn1 = true;
       
        turn.textContent = 'Player 1';
        turn.classList.remove('player2');
        turn.classList.add('player1');
    }
}

//Function for the animation of the pieces
function pieceAnimation(column){
    if (turn1 === true){
        color = 'red';
    }
    else if (turn1 === false){
        color = 'yellow';
    }
    counter = 5;
    circle = document.getElementById(boardByColumns[column].content[counter].tag);
    circle.classList.add(color);
    interval = setInterval( ()=>{
        if (boardByColumns[column].content[counter].value !== 0){
            clearInterval(interval);
        }
        else if (boardByColumns[column].content[counter-1].value === 0){
            circle.classList.remove(color);
            counter -= 1;
            circle = document.getElementById(boardByColumns[column].content[counter].tag);
            circle.classList.add(color);
        }
        else if(boardByColumns[column].content[counter-1].value !== 0){
            circle.classList.remove(color);
            counter -= 1;
            circle = document.getElementById(boardByColumns[column].content[counter].tag);
            circle.classList.add(color);
            clearInterval(interval);
        }
    }, 50);
};

var end = false;

//Given an array, check if there's 4enralla and activates the ending
function check4InRow(array){
    for (var i=0; i<(array.length-3); i++) {
        if ( array[i].value !== 0 && 
            (array[i].value === array[i+1].value) && 
            (array[i+1].value === array[i+2].value) && 
            (array[i+2].value === array [i+3].value)){
                end = true;
                endGame(array, i);
            return;
        };
    };
};

function endGame(array, i){
    if (end === true){
        const endsentence = document.getElementById('endsentence');
        endsentence.textContent = `The Winner is Player ${turn1?1:2}!`
        const ending = document.getElementById('end');
        ending.classList.remove('hidden');
        for (var j=0; j<4; j++){
            var winspot = document.getElementById(array[i+j].tag);
            winspot.classList.add('winspot');
        }
    }
    if (draw === true){
        const endsentence = document.getElementById('endsentence');
        endsentence.textContent = `The Game Ended in a Draw!`
        const ending = document.getElementById('end');
        ending.classList.remove('hidden');
    }
    
}
//Checks4inARow in the direction of the columns
function checkColumns(){
    for (var i=0; i<boardByColumns.length; i++){
        check4InRow(boardByColumns[i].content)
    };
};

//Generates an array that represents the board row by row
function returnBoardByRows(boardByColumns){
    var boardByRows = []
    for (var i=0; i<6;i++){
        row = {content: []};
        for (var j=0; j<7; j++){
            row.content.push(
                boardByColumns[j].content[5-i]
            )
        }
        boardByRows.push(row);
    }
    return boardByRows;
}

//Checks4inARow in the direction of the rows
function checkRows(boardByColumns){
    boardByRows = returnBoardByRows(boardByColumns);

    for (var i=0; i<boardByRows.length; i++){
        check4InRow(boardByRows[i].content)
    };
}

//Generates an array that represents the board diagonal by diagonal (only de diagonals with 4 or more slots,
// which can actualy have relevant patterns)
function returnDiagonalsTopBot(boardByColumns){

    var diagonalsTopBot = []

    for(var i=0; i<3; i++){
        diagonal = {content: []};
        for (var j=0; j<(i+4); j++){
            diagonal.content.push(
                boardByColumns[j].content[i+3-j]
            );
        }
        diagonalsTopBot.push(diagonal);
    }

    for(var i=0; i<3; i++){
        diagonal = {content: []};
        for (var j=0; j<(6-i); j++){
            diagonal.content.push(
                boardByColumns[i+j+1].content[5-j]
            );
        }
        diagonalsTopBot.push(diagonal);
    }
    return diagonalsTopBot;
};
function returnDiagonalsBotTop(boardByColumns){
    var diagonalsBotTop = []

    for(var i=0; i<3; i++){
        diagonal = {diagonal: i+1, content: []};
        for (var j=0; j<(i+4); j++){
            diagonal.content.push(
                boardByColumns[j].content[2-i+j]
            );
        }
        diagonalsBotTop.push(diagonal);
    }

    for(var i=0; i<3; i++){
        diagonal = {diagonal: i+4, content: []};
        for (var j=0; j<(6-i); j++){
            diagonal.content.push(
                boardByColumns[i+j+1].content[j]
            );
        }
        diagonalsBotTop.push(diagonal);
    }
    return diagonalsBotTop;
};

//Checks4inARow in all the diagonals
function checkDiagonals(boardByColumns){
    var diagonalsTopBot = returnDiagonalsTopBot(boardByColumns);
    var diagonalsBotTop = returnDiagonalsBotTop(boardByColumns);

    for (var i=0; i<diagonalsTopBot.length; i++){
        check4InRow(diagonalsTopBot[i].content);
        check4InRow(diagonalsBotTop[i].content);
    }
};

var draw = false;
function checkDraw(){
    var drawScore = 0
    for (column of boardByColumns){
        if (column.full === true){
            drawScore += 1
        }
    }
    if (drawScore === 7){
        draw = true;
    }
}
//Checks4inARow in all possible positions
function checkResult(boardByColumns){
    checkColumns(boardByColumns);
    checkRows(boardByColumns);
    checkDiagonals(boardByColumns);
    checkDraw();
    endGame();
};


buttonPlayAgain.addEventListener('click',
    ()=>{
        //Resetboard
        for (var i=0; i<boardByColumns.length; i++){
            boardByColumns[i].full = false;
            for(var j=0; j<boardByColumns[i].content.length; j++){
                boardByColumns[i].content[j].value = 0;
                document.getElementById(boardByColumns[i].content[j].tag).classList.remove('red');
                document.getElementById(boardByColumns[i].content[j].tag).classList.remove('yellow');
                document.getElementById(boardByColumns[i].content[j].tag).classList.remove('winspot');
            }
            
        }
        //Hide end and show start
        const ending = document.getElementById('end');
        ending.classList.add('hidden');
        const startMenu = document.getElementById('choice');
        startMenu.classList.remove('hidden');
        //Reset turns
        turn1 = true;
        //Reset bot, end and draw
        bot = false;  
        end = false;
        draw = false;
    }
)

buttonPVP.addEventListener('click', 
    ()=>{
        const startMenu = document.getElementById('choice');
        startMenu.classList.add('hidden');
    }
);

//El juego tiene el botdesactivado por default
var bot = false;
//El botón player versus bot lo activa
buttonPVB.addEventListener('click', 
    ()=>{
        //Escondemos el menú de inicio
        const startMenu = document.getElementById('choice');
        startMenu.classList.add('hidden');
        //Activamos el bot
        bot = true;
    }
);

///Cuando se pulsen los botones del juego,
//se juega una ficha en la columna correspondiente,
//luego se ejecuta la animación,
//se chequea si hay un 4 en raya y se cambia de turno
//Si el bot está activo, se ejecuta su turno también y se devuelve el turno al jugador 1

function botTurn(){
    setTimeout(
        () =>{
            scores = simulateAllScores();
            bestColumn = pickScores(scores)
            addPiece(boardByColumns, bestColumn);
            pieceAnimation(bestColumn);
            checkResult(boardByColumns);
            changeTurn();
        }, 500
    )
}


columns[0].addEventListener('click', 
    function a(){
        addPiece(boardByColumns, 0);
        pieceAnimation(0);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
        
    }
);

columns[1].addEventListener('click',
    function b(){
        addPiece(boardByColumns, 1);
        pieceAnimation(1);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

columns[2].addEventListener('click',
    function c(){
        addPiece(boardByColumns, 2);
        pieceAnimation(2);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

columns[3].addEventListener('click',
    function d(){
        addPiece(boardByColumns, 3);
        pieceAnimation(3);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

columns[4].addEventListener('click',
    function e(){
        addPiece(boardByColumns, 4);
        pieceAnimation(4);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

columns[5].addEventListener('click',
    function f(){
        addPiece(boardByColumns, 5);
        pieceAnimation(5);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

columns[6].addEventListener('click',
    function g(){
        addPiece(boardByColumns, 6);
        pieceAnimation(6);
        checkResult(boardByColumns);
        changeTurn();
        if (bot === true && end === false){
            botTurn();
        }
    }
);

///////Aquí empieza el trabajo del BOT.

//La idea es utilizar un sistema de scores. en cada turno, el bot observará la posición que quedará en el tablerodespués de cada posible 
//jugada suya (7 posibles jugadas cada turno, una por columna). cada patrón diferente resultará en sumar o restar puntos al score.
//Después, el bot escogerá la jugada con el score más alto.

///////El criterio que dará más puntos es hacer 4 en raya. 

///  Pues haremos una función que busque eso.
function scores4inRow(array, score){
    // console.log(array)
    for (var i=0; i<(array.content.length-3); i++) {
        stringToCheck = array.content[i].value.toString() + array.content[i+1].value.toString() + array.content[i+2].value.toString() + array.content[i+3].value.toString()
        //Si es una jugada ganadora, se le añande 100 al score
        // console.log(arrayToCheck);
        if ( stringToCheck === '2222'){
            score += 100;
            
        }
        //Si cortamos el 4 en raya del oponente, añadimos 50 al score
        else if ( stringToCheck === '2111' || stringToCheck === '1211'|| stringToCheck === '1121'|| stringToCheck === '1112'){
            score += 25;
            
        };
        // console.log(score)
    };
    return score;
};

function scores02220(array, score){
    // console.log(array)
    for (var i=0; i<(array.content.length-4); i++) {
        stringToCheck = array.content[i].value.toString() + array.content[i+1].value.toString() + array.content[i+2].value.toString() + array.content[i+3].value.toString() + array.content[i+4].value.toString()
        //Si generamos una posición de victoria, añadimos 10
        
        if (stringToCheck === '02220'){


            score += 10;
    
        }
        // console.log(stringToCheck === '02110')
        // console.log(typeof stringToCheck)
        //Si evitamos esta misma posición del oponente, añadimos 5
        if (stringToCheck === '02110' || stringToCheck === '01210' || stringToCheck === '01120'){
            score += 5;
            // console.log(stringToCheck);
        }
    };
    return score;
};

function scoresAdditional4PiecePatterns(array, score){
    for (var i=0; i<(array.content.length-3); i++) {

        arrayInfo = [array.content[i], array.content[i+1], array.content[i+2], array.content[i+3]];
        stringToCheck = array.content[i].value.toString() + array.content[i+1].value.toString() + array.content[i+2].value.toString() + array.content[i+3].value.toString()
        // console.log(stringToCheck);

        //Si generamos una de las posiciones 'trampa', añadimos 3
        if (stringToCheck === '2220'){
           
            var coordinates = arrayInfo[3].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 0, 3)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '2202'){

            var coordinates = arrayInfo[2].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 0, 3)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '2022'){

            var coordinates = arrayInfo[1].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 0, 3)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '0222'){

            var coordinates = arrayInfo[0].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 0, 3)
            // console.log(score)
            // console.log(stringToCheck);
        }

        //Si le estamos regalando un 4 en raya al oponente, restamos 50 puntos

        if (stringToCheck === '1110'){

            var coordinates = arrayInfo[3].coordinates
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -50)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '1101'){

            var coordinates = arrayInfo[2].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -50)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '1011'){

            var coordinates = arrayInfo[1].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -50)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '0111'){

            var coordinates = arrayInfo[0].coordinates;
            // console.log(coordinates);
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -50)
            // console.log(score)
            // console.log(stringToCheck);
            // console.log(simulatedBoard);
        }

        //Si damos a nuestro oponente una oportunidad de cortar nestro 4 en raya, restamos 8
        if (stringToCheck === '2220'){
            //A menos que el patrón sea en vertical, en tal caso nos saltaría siempre el -8. chequeamos que no exista array.column,
            //lo cuál solo pasa si no estamos analizando una columna.
            if (!array.column){
                coordinates = arrayInfo[3].coordinates;
                // console.log(score)
                score = checkUnderCoordinates(coordinates, score, 2, -8);
                // console.log(score)
            }
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '2202'){

            var coordinates = arrayInfo[2].coordinates;
            // console.log(score)
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -8)
            // console.log(score)
            // console.log(score)
            // // console.log(stringToCheck);
        }
        else if (stringToCheck === '2022'){

            var coordinates = arrayInfo[1].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -8)
            // console.log(score)
            // console.log(stringToCheck);
        }
        else if (stringToCheck === '0222'){

            var coordinates = arrayInfo[0].coordinates;
            // console.log(score)
            score = checkUnderCoordinates(coordinates, score, 2, -8)
            // console.log(score)
            // console.log(stringToCheck);
        }
        
    };
    // console.log(score);
    return score;
};
//Pequeña función que chequea el espacio debajo de un espacio específico, donde coordinates es el espacio específico,
//score es el score en ese momento, number1 es el value que queremos encontrar en la posición de debajo del espacio específico,
//y number2 es cómo afecta encontrar esta posición al score.
function checkUnderCoordinates(coordinates, score, number1, number2){
    if((coordinates[1])>0){
        // console.log(coordinates[1]-1)
        var under0 = simulatedBoard[coordinates[0]].content[coordinates[1]-1].value;
        // console.log(simulatedBoard);
        // console.log(under0);
        // console.log(under0 === number1);
        if (under0 === number1){
            score += number2;
            // console.log(under0);
        }
    }
    // console.log(score);
    return score;
};

//Organizamos las pequeñas funciones en funciones más grandes:
//CheckScore hace check de todos los patrones en un array específico y aplica los cambios de score
function checkScore(simulatedBoard, score){
    for (var i=0; i<simulatedBoard.length; i++){
        
        score = scores4inRow(simulatedBoard[i], score);
        // console.log(score);
        score = scores02220(simulatedBoard[i], score);
        // console.log(score);
        score = scoresAdditional4PiecePatterns(simulatedBoard[i], score);
        // console.log(score);
    };
    return score;
};
//checkPatternsInColumns aplica checkScore a todas las columnas del tablero
function checkPatternsInColumns(simulatedBoard, score){
    
    score = checkScore(simulatedBoard, score);
    // console.log(score);
    return score;
};
//Lo mismo para todas las filas
function checkPatternsInRows(simulatedBoard, score){
    
    boardByRows = returnBoardByRows(simulatedBoard);
    score = checkScore(boardByRows, score);
    // console.log(score);
    return score;
};
//Lo mismo para todas las diagonales
function checkPatternsInDiagonals(simulatedBoard, score){
    
    diagonalsTopBot = returnDiagonalsTopBot(simulatedBoard);
    diagonalsBotTop = returnDiagonalsBotTop(simulatedBoard);
    score = checkScore(diagonalsTopBot, score);
    score = checkScore(diagonalsBotTop, score);
    // console.log(score);
    return score;
};
//updateScores ejecuta las 3 funciones anteriores para un score específico
function updateScore(simulatedBoard, score){
    
    score = checkPatternsInColumns(simulatedBoard, score);
    score = checkPatternsInRows(simulatedBoard, score);
    score = checkPatternsInDiagonals(simulatedBoard, score);
    // console.log(score);
    return score;
};

//Función que coge un score, simula una posible jugada en una columna específica y devuelve el score de esa jugada
function scoreForPlay(column, score){
    simulatedBoard = JSON.parse(JSON.stringify(boardByColumns))
    addPiece(simulatedBoard, column);
    score = updateScore(simulatedBoard, score);
    // console.log(score);
    return score;
}

//Función que simula todas las jugadas y genera un array de 7 objetos, cada uno con info de qué jugada és y en qué score resultaría
function simulateAllScores(){
    scores = [0, 1, 2, 3, 2, 1, 0];
    for (var i=0; i<scores.length; i++){
        scores[i] = scoreForPlay(i, scores[i]);
        // console.log(scores);
    };
    scoreObjects = [
        {column: 0, score: scores[0]}, 
        {column: 1, score: scores[1]}, 
        {column: 2, score: scores[2]}, 
        {column: 3, score: scores[3]}, 
        {column: 4, score: scores[4]}, 
        {column: 5, score: scores[5]}, 
        {column: 6, score: scores[6]}
    ];
    return scoreObjects;
}

//Función que coge el array con todos los scores y sus columnas y devuelve la columna de la mejor jugada
function pickScores(scores){
    scores = scores.sort(function(a, b){
        return b.score - a.score;
    })
    // console.log(scores);
    for (var i = 0; i<scores.length; i++){
        if (boardByColumns[scores[i].column].full === false){
            return scores[i].column;
        };
    };
};