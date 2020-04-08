function askPlayerName() {

    var name = prompt("Insert your name");
    return name;
}

function generateCarton() { //generate the array cardBoard//
    //insert variable//
    var bingoCard = [
        [{ number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false }
        ],
        [{ number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false }
        ],
        [{ number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false },
            { number: randomNumber, matched: false }
        ]

    ];
    var newNumber;
    var numberArray = [];

    for (let i = 0; i < bingoCard.length; i++) {
        for (let j = 0; j < bingoCard[i].length; j++) {
            let found = false;
            while (found == false) {
                newNumber = randomNumber();
                if (finder(numberArray, newNumber) == false) {
                    bingoCard[i][j].number = newNumber;
                    numberArray.push(newNumber);
                    found = true;

                }
            }
        }
    }
    showCarton(bingoCard);
    return bingoCard;
}

function finder(array, number) { //finds if a numbers is in a array//
    let found = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == number) {
            found = true;
        }
    }
    return found;
}


function randomNumber() { //returns a random number between 1 and 50//
    return Math.floor(Math.random() * 50 + 1);
}

function checkPrematureEnd(carton) { //penalize the score if game finishes early
    var counter = 0;
    for (let i = 0; i < carton.length; i++) {
        for (let j = 0; j < carton[i].length; j++) {
            if (carton[i][j].matched == true) {
                counter++;
            }
        }
        if (counter == 15) { //if cardboard complete, return 0;
            counter = 40;
        }
        return (40 - counter);
    }
}



function checkBingo(carton, bingo) { //check bingo//
    var counter = 0; //if counter = 15 --> bingo//
    for (let i = 0;
        (i < carton.length) && (bingo == false); i++) {
        for (let j = 0; j < carton[i].length; j++) {
            if (carton[i][j].matched == true) {
                counter++;
            }
        }
    }
    if (counter == 15) {
        bingo = true;
    }
    return bingo;
}

function checkLine(carton, line) { //check line//
    var counter = 0;
    for (let i = 0;
        (i < carton.length) && (line == false); i++) {
        counter = 0;
        for (let j = 0; j < carton[i].length; j++) {
            if (carton[i][j].matched == true) {
                counter++;

            }
            if (counter == 5) {
                line = true;
                return line;
            }
        }
    }
    return line;
}

function newTurns(carton, ballNumbers) { //finding if the new number is not repeated and trying to match in the cardboard//
    var number = randomNumber();
    if (finder(ballNumbers, number) == false) {
        ballNumbers.push(number);
        console.log(number);
        carton = numberMatcher(carton, number);
    } else {
        newTurns(carton, ballNumbers);
    }
    return carton;
}

function numberMatcher(carton, randomNumber) { //modifies the cardBoard with X //
    for (let i = 0; i < carton.length; i++) {

        for (let j = 0; j < carton[i].length; j++) {

            if (carton[i][j].number === randomNumber) {
                carton[i][j].number = 'X';
                carton[i][j].matched = true;
                showCarton(carton);
            }
        }
    }
    return carton;
}

function showCarton(bingoCard) { //shows the actual cardBoard//
    for (let i = 0; i < bingoCard.length; i++) {
        console.log(bingoCard[i][0].number, bingoCard[i][1].number, bingoCard[i][2].number, bingoCard[i][3].number, bingoCard[i][4].number);
    }
}

/// SCOREBOARD
function createScoreBoard() { //starting scoreboard//
    var score = [
        { name: 'Jeff ', points: 15 },
        { name: 'Brogar', points: 30 },
        { name: 'Jhonny', points: 40 }
    ];
    return score;
}


function showScoreBoard(scoreBoard) { //shows the scoreboard array//
    console.log("Rank Name     Points");
    for (let i = 0; i < scoreBoard.length; i++) {
        console.log(` ${i+1} : ${scoreBoard[i].name} --> ${scoreBoard[i].points}.`);
    }
    return 0;
}

function showScoreSystem() { //prints the score system//
    console.log("Score system explanation:");
    console.log("Every new turn add 1 point");
    console.log("If the game ends early,");
    console.log("you will be penalized with more points ");
    console.log("Less points, better score");
    return 0;
}

function insertScore(scoreBoard, name, points) { //if player have enough points , enters in the scoreboard//
    for (let i = 2; points < scoreBoard[i].points; i--) {

        if (i == 0) {

            scoreBoard[i].name = name;
            scoreBoard[i].points = points;
            break; //to prevent compilation error
        } else {
            if (points < scoreBoard[i - 1].points) {

                scoreBoard[i].name = scoreBoard[i - 1].name;
                scoreBoard[i].points = scoreBoard[i - 1].points;
            } else {

                scoreBoard[i].name = name;
                scoreBoard[i].points = points;
            }

        } //final if i == 0
    } //final for loop
    return scoreBoard;
}

function scoreAll(scoreBoard, name, points) { //uses all the function about scores in order
    scoreBoard = createScoreBoard();
    scoreBoard = insertScore(scoreBoard, name, points);
    showScoreBoard(scoreBoard);
}



function bingo() { //the game//
    //global variables//
    var newGame = true; //false to finish game//
    var scoreBoard = createScoreBoard(); //Starting ScoreBoard//

    while (newGame == true) { //false to finish the game//
        //game variables//
        var points = 0;
        var ballNumbers = [];
        var name = askPlayerName();
        var bingo = false; //1 cop bingo//
        var line = false; //1 cop linia//
        var carton = []; //variable carto//
        var newTurn = true;
        var wantCarton = false; //check si el carto es el que es vol//
        showScoreSystem();
        while (wantCarton == false) {
            console.log("---cardBoard---");
            carton = generateCarton();
            console.log("---------------");
            let want = prompt("Do you want this cardBoard? Y//N //DEFAULT NO//");
            want = want.toLowerCase();
            if (want == "y" || want == "yes") {
                wantCarton = true;
            }
        } //el carto es vol//

        while (bingo == false && newTurn == true && (ballNumbers.length < 50)) { //si hi ha bingo es repeteix el bucle o si no es vol continuar//

            carton = newTurns(carton, ballNumbers);
            if (bingo == false) {
                bingo = checkBingo(carton, bingo);
                if (bingo == true) {
                    console.log("BINGOO!");
                }
            }

            if (line == false) {
                line = checkLine(carton, line);
                if (line == true) {
                    console.log("YOU HAVE LINE!");
                }
            }
            points++;
            if (bingo == false) {
                var finishGame = prompt("New turn(Y) or (N) to finish game? //DEFAULT YES//");
                finishGame = finishGame.toLowerCase();
            } else {
                finishGame = 'n';
                console.log("BINGO, GAME FINISHED!");
            }
            if (finishGame == "n" || finishGame == "no") {
                newTurn = false;
            }

        } // final si hi ha bingo o el jugador vol tancar//
        points = points + checkPrematureEnd(carton);
        scoreAll(scoreBoard, name, points);
        var finish = prompt("New Game ? (Y/N) //DEFAULT NO//");
        finish = finish.toLowerCase();
        if (finish == "n" || finish == "no") {
            newGame = false;
        }
    } //ends game//
    console.log("Bye bye");
}

bingo();