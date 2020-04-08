alert("Lee el sistema de puntuación explicado en la consola.");
console.log("Este bingo consta de 15 números (3 líneas) aleatorios (del 1 al 30 cada uno) por cartón.\
De forma que la mejor puntuación posible se obtiene si se consigue hacer BINGO en los primeros 15 intentos,\
 la peor puntuación en cambio, se da cuando se requieren de los 30 números para hacer BINGO. \
Por ello, la fórmula utilizada para realizar el cálculo de la puntuación es la siguiente: \
\nPuntuación = ((30-turnos)/15)*100 \n\
Con esta fórmula, la puntuación va de 0 a 100, 0 para la los 30 intentos hasta conseguir BINGO y 100 para los 15 intentos.");

var usersRanking = [{ name: "Neo", points: 100 }, { name: "Trinity", points: 93.33 }, { name: "Morpheus", points: 80.00 },
{ name: "alex23", points: 46.67 }, { name: "axel32", points: 6.67 }, { name: "Smith", points: 0.00 }];

(function bingo() {
    let playerName = inputPalabra("Indique su nombre: ");
    let turns = 0;
    let numbersCrossed = 0;
    let numbersTold = [];
    let pointsObtained = 0;
    let lineDiscovered = false;
    let paperBoard = createPaperboard(5, 3);
    showPaperboard();

    //generar otro cartón si el usuario responde 'yes'
    let anotherPaperboard = inputCorrecto(["yes", "no"], "¿Generar un cartón nuevo? (Yes/No)");
    while (anotherPaperboard == "yes") {
        paperBoard = createPaperboard(5, 3);
        showPaperboard();
        anotherPaperboard = inputCorrecto(["yes", "no"], "¿Generar un cartón nuevo? (Yes/No)");
    }
    console.log("\n");
    let bingoCard = changeFormat();
    console.log(bingoCard);


    // si el usuario quiere ir al siguiente turno o salir del juego
    let nextTurn = confirm("¿Quiere avanzar al siguiente turno?");
    while (nextTurn) {
        let n = randomNumber();
        alert(n);
        let numberChecked = checkNumber(n);
        if (numberChecked) {
            bingoCard = changeFormat();
            showPaperboard();
            console.log("\n");
            console.log(bingoCard);
        }
        checkLines();
        if (numbersCrossed == 15) {
            alert("BINGO!!");
            alert("Juego completado en " + turns + " turnos.");
            pointsObtained = (((30 - turns) / 15) * 100).toFixed(2);
            console.log("\n");
            console.log("Has obtenido una puntuación de " + pointsObtained + " puntos");
            alert("Has obtenido una puntuación de " + pointsObtained + " puntos");
            usersRanking.push({ name: playerName, points: Number(pointsObtained) });
            usersRanking.sort(function (a, b) { return a.points - b.points; }).reverse();
            rankingPosition();
            console.log("\n");
            showRanking();
            break;
        }
        else {
            nextTurn = confirm("¿Quiere avanzar al siguiente turno?");
            turns++;
        }
    }

    //Jugar otra partida o finalizar la sesión
    let anotherGame = confirm("¿Quieres hacer otra partida?");
    if (anotherGame) {
        bingo();
    }

    //funcion que crea un cartón aleatorio para el jugador de 'n' numeros por linea y 'm' lineas. Los números creados van del 1 al 30.
    function createPaperboard(n, m) {
        let numbersGenerated = [];
        let paperBoard = {};
        for (let a = 0; a < m; a++) {
            paperBoard["linea " + (a + 1)] = {};
            for (let i = 0; i < n; i++) {
                let number = Math.round(Math.random() * 29 + 1);
                while (numbersGenerated.includes(number)) {
                    number = Math.round(Math.random() * 29 + 1);
                }
                numbersGenerated.push(number);
                paperBoard["linea " + (a + 1)][number] = 0;
            }
        }
        return paperBoard;
    }

    //función para mostrar la variable 'bingoCard' en el formato del enunciado
    function changeFormat() {
        let index = 0;
        let bingoCard = [];
        for (let e of Object.keys(paperBoard)) {
            for (let i of Object.keys(paperBoard[e])) {
                bingoCard[index] = { number: Number(i), matched: (paperBoard[e][i] == 0) ? false : true };
                index++;
            }
        }
        return bingoCard;
    }

    //función que devuelve el valor de cada línea del cartón
    function showPaperboard() {
        console.log("\n");
        let lineNumber = 0;
        for (let e of Object.keys(paperBoard)) {
            lineNumber++;
            let linea = "Línea " + lineNumber + " >>";
            for (let i of Object.keys(paperBoard[e])) {
                if (paperBoard[e][i] == 0) {
                    linea += " " + i;
                    //console.log(i, paperBoard[e][i]);
                } else {
                    linea += " X";
                }
            }
            console.log(linea);
        }
    }

    //funcion que devuelve un número aleatorio entre 1 y 30
    function randomNumber() {
        let newNumber = Math.round(Math.random() * 29 + 1);
        while (numbersTold.includes(newNumber)) {
            newNumber = Math.round(Math.random() * 29 + 1);
        }
        numbersTold.push(newNumber);
        return newNumber;
    }

    //función que modifica el estado del cartón si el número 'n' aparece en él
    function checkNumber(n) {
        for (let i = 0; i < Object.keys(paperBoard).length; i++) {
            if (Object.keys(paperBoard["linea " + (i + 1)]).includes(String(n))) {
                alert("Número encontrado en línea " + (i + 1) + "!");
                paperBoard["linea " + (i + 1)][n] = "X";
                numbersCrossed++;
                return true;
            }
        }
    }

    //función que devuelve 'LÍNEA!' si todos los números de la línea han sido marcados
    function checkLines() {
        if (!lineDiscovered) {
            for (let i of Object.keys(paperBoard)) {
                let counter = 0;
                for (let e of Object.keys(paperBoard[i])) {
                    if (paperBoard[i][e] != 0) {
                        counter++;
                    }
                }
                if (counter == Object.keys(paperBoard[i]).length) {
                    lineDiscovered = true;
                    alert("LÍNEA!");
                }
            }
        }
    }

    //función que devuelve la posición en el ranking del usuario
    function rankingPosition() {
        for (let i = 0; i < usersRanking.length; i++) {
            if ((usersRanking[i].name == playerName) && (usersRanking[i].points == pointsObtained)) {
                console.log("Tu posición en el ranking es: " + (i + 1));
                alert("Tu posición en el ranking es: " + (i + 1));
            }
        }
    }

    //función que muestra el ranking actual
    function showRanking() {
        let position = 0;
        for (let e of usersRanking) {
            position++;
            console.log("El jugador " + e["name"] + " se sitúa en la posición " + position + " con " + e["points"] + " puntos.");
        }
    }

    //función que recibe un array con los valores válidos del prompt y un string con la pregunta que el prompt hace al usuario 
    //sirve para verificar que el input del prompt es uno de los demandados
    function inputCorrecto(listaInputs, pregunta) {
        let respuesta = prompt(pregunta).toLowerCase();
        while (!listaInputs.includes(respuesta)) {
            alert("Input inválido");
            respuesta = prompt(pregunta);
        }
        return respuesta;
    }

    //función que asegura que el input introducido sean únicamente letras
    function inputPalabra(pregunta) {
        let palabra = prompt(pregunta);
        while ((validarPalabra(palabra) == 0) || (palabra == null)) {
            alert("Input Inválido");
            palabra = prompt(pregunta);
        }
        return palabra;
    }

    //función que devuelve 0 si el argumento 'palabra' contiene algún cáracter que no pertenezca a un nombre
    function validarPalabra(palabra) {
        let abc = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ.";
        let counter = 0;
        for (let i = 0; i < abc.length; i++) {
            if (palabra.includes(abc[i])) {
                counter++;
            }
        }
        return counter;
    }
})();
alert("Ciao!");