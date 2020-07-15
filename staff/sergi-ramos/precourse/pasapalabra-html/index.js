var questions = [
    {
        letter: "a", answer: ["abducir", "abecedario", "acatar"], status: 0, question: ["CON LA A: Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
            "CON LA A: Serie ordenada de las letras de un idioma.", "CON LA A: Aceptar con sumisión una autoridad o unas normas legales, una orden, etc."], selection: 0
    },
    {
        letter: "b", answer: ["bingo", "baba", "boligrafo"], status: 0, question: ["CON LA B: Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
            "CON LA B: Saliva espesa y abundante que fluye a veces de la boca", "CON LA B: Instrumento para escribir que tiene un tubo de tinta"], selection: 0
    },
    { letter: "c", answer: ["churumbel", "cutre", "cortina"], status: 0, question: ["CON LA C: Niño, crío, bebé", "CON LA C: De mala calidad", "CON LA C: Tela que cubre ventanas y puertas"], selection: 0 },
    {
        letter: "d", answer: ["diarrea", "durum", "duro"], status: 0, question: ["CON LA D: Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
            "CON LA D: Modo de presentar el döner enrollado en un pan plano", "CON LA D: 5 pesetas"], selection: 0
    },
    {
        letter: "e", answer: ["ectoplasma", "electron", "egarense"], status: 0, question: ["CON LA E: Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
            "CON LA E: Partícula elemental con carga eléctrica negativa, que gira alrededor del núcleo del átomo.", "CON LA E: Perteneciente de Terrassa"], selection: 0
    },
    {
        letter: "f", answer: ["facil", "foco", "final"], status: 0, question: ["CON LA F: Que no requiere gran esfuerzo, capacidad o dificultad", "CON LA F: Lámpara eléctrica de luz muy potente concentrada en una dirección.",
            "CON LA F: Partido decisivo en la Champions League"], selection: 0
    },
    {
        letter: "g", answer: ["galaxia", "gol", "guitarra"], status: 0, question: ["CON LA G: Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
            "CON LA G: En el futbol meter un balon dentro de una portería", "CON LA G: Instrumento musical de cuerda "], selection: 0
    },
    { letter: "h", answer: ["harakiri", "hobby", "hitachi"], status: 0, question: ["CON LA H: Suicidio ritual japonés por desentrañamiento", "CON LA H: Actividad o afición por algo", "CON LA H: Empresa Japonesa de electronica de consumo"], selection: 0 },
    { letter: "i", answer: ["iglesia", "iceberg", "imposible"], status: 0, question: ["CON LA I: Templo cristiano", "CON LA I: Gran masa de hielo flotante", "CON LA I: Accion que se antoja inviable de realizar"], selection: 0 },
    {
        letter: "j", answer: ["jabali", "jinete", "jaleo"], status: 0, question: ["CON LA J: Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", "CON LA J: Persona que cabalga",
            "CON LA J: Mucho ruido o alboroto"], selection: 0
    },
    {
        letter: "l", answer: ["licantropo", "lily", "lacasitos"], status: 0, question: ["CON LA L: Hombre lobo", "CON LA L: Mujer de Marshall Eriksen en How i met your mother",
            " CON LA L: Lentejas de chocolate con leche recubierta por 150 capas de azúcar de 7 colores diferentes."], selection: 0
    },
    {
        letter: "m", answer: ["misantropo", "messi", "mandamas"], status: 0, question: ["CON LA M: Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
            "CON LA M: Maximo ganador del galardon del balon de oro", "CON LA M: Persona que tiene una tendencia exagerada a mandar"], selection: 0
    },
    { letter: "n", answer: ["necedad", "nunca", "nevera"], status: 0, question: ["CON LA N: Demostración de poca inteligencia", "CON LA N: Ninguna vez", "CON LA N: Equipo electronico de consumo situado en la cocina"], selection: 0 },
    {
        letter: "ñ", answer: ["señal", "caña", "araña"], status: 0, question: ["CONTIENE LA Ñ: Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
            "CONTIENE LA Ñ: Bebida alcoholica servida en un vaso", "CONTIENE LA Ñ: Animal con 8 patas"], selection: 0
    },
    {
        letter: "o", answer: ["orco", "olivo", "ostentar"], status: 0, question: ["CON LA O: Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
            "CON LA O: Árbol de la familia de las oleáceas", "CON LA O: Fardar, chulear"], selection: 0
    },
    {
        letter: "p", answer: ["protoss", "pedo", "pico"], status: 0, question: ["CON LA P: Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
            "CON LA P: Gas apestoso", "CON LA P: Beso en los labios con otra persona"], selection: 0
    },
    {
        letter: "q", answer: ["queso", "quinoa", "quito"], status: 0, question: ["CON LA Q: Producto obtenido por la maduración de la cuajada de la leche",
            "CON LA Q: Planta del genero Chenopodium, de la familia de las amarantáceas, cultivada principalmente para su semilla comestible", "CON LA Q: Capital del Ecuador"], selection: 0
    },
    { letter: "r", answer: ["raton", "ruin", "racano"], status: 0, question: ["CON LA R: Roedor", "CON LA R: Bajo y despreciable", "CON LA R: Tacaño "], selection: 0 },
    {
        letter: "s", answer: ["stackoverflow", "simpson", "saco"], status: 0, question: ["CON LA S: Comunidad salvadora de todo desarrollador informático",
            "CON LA S: Apellido de familia amarilla americana muy famosa", "CON LA S: Se usa para dormir"], selection: 0
    },
    {
        letter: "t", answer: ["terminator", "turuleca", "trunks"], status: 0, question: ["CON LA T: Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
            "CON LA T: La gallina mas famosa nacida en 1971", "CON LA T: Hijo de Bulma"], selection: 0
    },
    {
        letter: "u", answer: ["unamuno", "umbral", "usado"], status: 0, question: ["CON LA U: Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
            "CON LA U: Valor mínimo de una magnitud a partir del cual se produce un efecto determinado", "CON LA U: Gastado y deslucido"], selection: 0
    },
    {
        letter: "v", answer: ["vikingos", "vegeta", "vino"], status: 0, question: ["CON LA V: Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
            "CON LA V: Personaje de Bola de drac antagonista principal hasta que empieza la saga de Freezer", "CON LA V: Procedente de la uva"], selection: 0
    },

    {
        letter: "x", answer: ["botox", "clinex", "taximetro"], status: 0, question: ["CONTIENE LA X: Toxina bacteriana utilizada en cirugía estética", "CONTIENE LA X: Pañuelo desechable de papel",
            "CONTIENE LA X: Aparato de que van provistos algunos coches de alquiler"], selection: 0
    },
    {
        letter: "y", answer: ["peyote", "ayuno", "cayo"], status: 0, question: ["CONTIENE LA Y: Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
            "CONTIENE LA Y: Que no ha comido", "CONTIENE LA Y: Isleta casi rasa y poco saliente de la superficie del mar"], selection: 0
    },
    {
        letter: "z", answer: ["zen", "zurito", "zoquete"], status: 0, question: ["CON LA Z: Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
            "CON LA Z: Vaso que equivale a medio vaso de cerveza(Euskadi)", "CON LA Z: Pedazo de madera corto y grueso, que queda sobrante al labrar o utilizar un madero"], selection: 0
    },
];
var control = 0;
var name;
var ranking = [];
var answer = '';
var rightWords = 0;
var wordsAnswered = 0;
const ABC = 25;
var questionAnswer;
var noFirstRound = false;
var controlSecondRound = -1;
var controlFirstLetter = false;
var timeleft = 250;
var downloadTimer;
var answers = document.getElementById('answer');
var sendButton = document.getElementById('send');
var pasapalabra = document.getElementById('pasapalabra');
var continueGame = document.getElementById('continue');
var question2 = document.getElementById('question');
var play = document.getElementById('play-button');
var donut = document.getElementsByTagName('div');
var cronoNumber = document.getElementById('crono-number');
var points = document.getElementById('points');
var exit = document.getElementById('exit');
var exitDonut = document.getElementById('exit-donut');
var selectText = document.getElementById('name');
var rankingNames = document.getElementById('ranking');
var letterLogo = document.getElementById('letter-logo');
var exitRanking = document.getElementById('exit-ranking');
var audioButton = document.getElementsByClassName('audio')[0];
var music = new Audio('audio/pasapalabra.mp3');

//#################
//####FUNCTIONS####
//#################

function findQuestion(control) {
    debugger
    for (var i = control + 1; i < questions.length; i++) {
        var flag = false;
        if (questions[i].status == 0) {
            flag = true;
            return i;
        }
    }
    if (flag == false) {
        var x = findQuestionA(0);
        return x;
    }
    if (control == 24) {
        return findQuestionA(0);
    }
}

function findQuestionA() {

    for (var i = control; i < questions.length; i++) {
        var flag = false;
        if (questions[i].status == 0) {
            flag = true;
            return i;
        }
    }
    if (flag == false) {
        var x = findQuestion(0);
        return x;
    }
}

 

function generateRanking() {
    debugger

    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    var rankingTable = document.getElementById('ranking-area');

    for (var i = 0; i < ranking.length + 1; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= 2; j++) {
            debugger
            var cellH = document.createElement('th');
            var cell = document.createElement("td");
            var cellText
            if (i == 0) {
                if (j == 0) {
                    cellText = document.createTextNode('Posicion')
                } else if (j == 1) {
                    cellText = document.createTextNode('Nombre')

                } else {
                    cellText = document.createTextNode('Palabras acertadas')
                }
            } else {
                if (j == 0) {
                    cellText = document.createTextNode(i);
                }
                if (j == 1) {
                    cellText = document.createTextNode(ranking[i - 1].names);
                }
                if (j == 2) {
                    cellText = document.createTextNode(ranking[i - 1].points);
                }
            }
            if (i == 0) {
                cellH.appendChild(cellText);
                row.appendChild(cellH);
            } else {
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
        if (i == 0) {
            thead.appendChild(row);
        } else {
            tblBody.appendChild(row);
        }
    }
    table.appendChild(thead);
    table.appendChild(tblBody);
    rankingTable.appendChild(table);
    body.appendChild(rankingTable);
}



function startGame() {debugger

    continueGame.style.color = 'white';
    sendButton.style.cursor = 'pointer';
    pasapalabra.style.cursor = 'pointer';
    rankingNames.style.cursor = 'auto';
    rankingNames.style.backgroundColor = 'grey';
    rankingNames.style.color = 'white';

    name = selectText.value;

    letterLogo.style.display = 'none';
    document.getElementById('display-header').style.display = 'none';
    document.getElementById('display-rules').style.display = 'none';
    document.getElementById('display-donut').style.display = 'block';
    timeleft = 250;
    cronoNumber.style.left = '55px';

    downloadTimer = setInterval(function () {
        timeleft--;
        cronoNumber.innerHTML = timeleft;
        if (timeleft < 100) {
            cronoNumber.style.left = '70px';
        }
        if (timeleft < 10) {
            cronoNumber.style.left = '85px';
        }

        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            wordsAnswered = 25;
            question2.innerHTML = 'Has acertado ' + rightWords + ' has fallado ' + (ABC - rightWords);
            sendButton.style.backgroundColor = '#878787';
            pasapalabra.style.backgroundColor = '#878787';
            continueGame.style.backgroundColor = '#3c3c3b';
            sendButton.style.color = 'white';
            pasapalabra.style.color = 'white';
            continueGame.style.color = 'white';

            ranking.push({ names: name, points: rightWords });
            rankingNames.style.backgroundColor = '#3c3c3b';
            rankingNames.style.color = 'white';

        }
    }, 1000);

    questionAnswer = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    questions[control].selection = questionAnswer;
    question = questions[control].question[questionAnswer];
    question2.innerHTML = question;

    donut[control + 1].style.backgroundColor = '#3c3c3b';
    donut[control + 1].style.border = '1px solid #3c3c3b';
    donut[control + 1].style.color = 'white';

    function focus() {
        answers.focus();
    }
    focus();
}

function sendAnswer() {

    if (wordsAnswered < ABC) {
        answer = answers.value;
        answers.value = '';

        if (answer != null) {
            answer = answer.toLocaleLowerCase();
        }
        if (noFirstRound == false) {
            if (questions[control].status == 0) {
                if (answer === questions[control].answer[questions[control].selection]) {
                    donut[control + 1].style.backgroundColor = '#007800';
                    donut[control + 1].style.border = '1px solid #007800';
                    donut[control + 1].style.color = 'white';
                    questions[control].status = 1;
                    rightWords++;
                    wordsAnswered++;
                    points.innerHTML = rightWords;

                } else {
                    donut[control + 1].style.backgroundColor = '#c50000';
                    donut[control + 1].style.border = '1px solid #c50000';
                    donut[control + 1].style.color = 'white';
                    questions[control].status = -1;
                    wordsAnswered++;
                }
            }
            
            control++;
                //control next  question number
            if (control < 25) {
                questionAnswer = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

                questions[control].selection = questionAnswer;
                question2.innerHTML = questions[control].question[questions[control].selection];
                donut[control + 1].style.backgroundColor = '#3c3c3b';
                donut[control + 1].style.border = '1px solid #3c3c3b';
                donut[control + 1].style.color = 'white';
            } else {
                // for second round
                if (control == 25) {
                    control = 0;
                    noFirstRound = true;
                }
                if (wordsAnswered < 25) {
                //find next not answer question
                    controlSecondRound = findQuestionA(control);

                    question2.innerHTML = questions[controlSecondRound].question[questions[controlSecondRound].selection];
                    donut[controlSecondRound + 1].style.backgroundColor = '#3c3c3b';
                    donut[controlSecondRound + 1].style.border = '1px solid #3c3c3b';
                    donut[controlSecondRound + 1].style.color = 'white';
                }
            }
        //second round start
        } else {
            if (answer === questions[controlSecondRound].answer[questions[controlSecondRound].selection]) {
                donut[controlSecondRound + 1].style.backgroundColor = '#007800';
                donut[controlSecondRound + 1].style.border = '1px solid #007800';
                donut[controlSecondRound + 1].style.color = 'white';
                questions[controlSecondRound].status = 1;
                rightWords++;
                wordsAnswered++;
                points.innerHTML = rightWords;
            } else {
                donut[controlSecondRound + 1].style.backgroundColor = '#c50000';
                donut[controlSecondRound + 1].style.border = '1px solid #c50000';
                donut[controlSecondRound + 1].style.color = 'white';
                questions[controlSecondRound].status = -1;
                wordsAnswered++;
            }
            if (wordsAnswered < 25) {
                controlSecondRound = findQuestion(controlSecondRound);

                question2.innerHTML = questions[controlSecondRound].question[questions[controlSecondRound].selection];
                donut[controlSecondRound + 1].style.backgroundColor = '#3c3c3b';
                donut[controlSecondRound + 1].style.border = '1px solid #3c3c3b';
                donut[controlSecondRound + 1].style.color = 'white';
            }
        }
    }
//Final game
    if (wordsAnswered == ABC) {

        question2.innerHTML = 'Has acertado ' + rightWords + ' has fallado ' + (ABC - rightWords);
        clearInterval(downloadTimer);
        sendButton.style.backgroundColor = '#878787';
        sendButton.style.color = 'white';
        pasapalabra.style.backgroundColor = '#878787';
        pasapalabra.style.color = 'white';
        continueGame.style.backgroundColor = '#3c3c3b';
        debugger
        ranking.push({ names: name, points: rightWords });
        rankingNames.style.backgroundColor = '#3c3c3b';
        rankingNames.style.color = 'white';
    }
}


function pasapalabraButton() {

    if (wordsAnswered < 25) {
        if (noFirstRound == false) {
            if (control == 0) {
                donut[control + 1].style.backgroundColor = 'white';
                donut[control + 1].style.border = '1px solid white';
                donut[control + 1].style.color = '#36a9e1';
                control++;
            } else {
                donut[control + 1].style.backgroundColor = 'white';
                donut[control + 1].style.border = '1px solid white';
                donut[control + 1].style.color = '#36a9e1';
                control++;
            }

            if (control < 25) {
                questionAnswer = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

                questions[control].selection = questionAnswer;
                question2.innerHTML = questions[control].question[questions[control].selection];
                donut[control + 1].style.backgroundColor = '#3c3c3b';
                donut[control + 1].style.border = '1px solid #3c3c3b';
                donut[control + 1].style.color = 'white';
            } else {
                if (control == 25) {
                    control = 0;
                    noFirstRound = true;
                }
                controlSecondRound = findQuestionA(control);
                question2.innerHTML = questions[controlSecondRound].question[questions[controlSecondRound].selection];
                donut[controlSecondRound + 1].style.backgroundColor = '#3c3c3b';
                donut[controlSecondRound + 1].style.border = '1px solid #3c3c3b';
                donut[controlSecondRound + 1].style.color = 'white';
                if (controlSecondRound == 0) {
                }
            }
        } else {

            question2.innerHTML = questions[controlSecondRound].question[questions[controlSecondRound].selection];
            donut[controlSecondRound + 1].style.backgroundColor = 'white';
            donut[controlSecondRound + 1].style.border = '1px solid white';
            donut[controlSecondRound + 1].style.color = '#36a9e1';

            controlSecondRound = findQuestion(controlSecondRound);

            question2.innerHTML = questions[controlSecondRound].question[questions[controlSecondRound].selection];
            donut[controlSecondRound + 1].style.backgroundColor = '#3c3c3b';
            donut[controlSecondRound + 1].style.border = '1px solid #3c3c3b';
            donut[controlSecondRound + 1].style.color = 'white';
        }
    }
};



//##############
//####EVENTS####
//##############



//FOCUS ON ANSWER
answers.addEventListener('blur', focus);
function focus() {
    answers.focus();
}

play.addEventListener('click', startGame);
sendButton.addEventListener('click', sendAnswer);
exitRanking.addEventListener('click', function () {
    document.getElementById('display-header').style.display = 'none';
    document.getElementById('display-rules').style.display = 'none';
    document.getElementById('display-donut').style.display = 'block';
    document.getElementsByTagName('table')[0].style.display = 'none';
    var removeTable = document.getElementsByTagName("table")[0];
    removeTable.remove();
    exitRanking.style.display = 'none'
});
rankingNames.addEventListener('click', function () {
    exit.style.display = 'none';
    if (wordsAnswered == 25) {
        ranking.sort(function (a, b) {
            return (b.points - a.points)
        });
        document.getElementsByTagName('h1')[0].innerHTML = 'RANKING';

        exitRanking.style.display = 'block';
        document.getElementById('display-header').style.display = 'block';
        document.getElementById('display-rules').style.display = 'none';
        document.getElementById('display-donut').style.display = 'none';
        generateRanking();
    }

});
audioButton.addEventListener('click', function () {
    debugger
    var audio = audioButton.textContent;
    if (audio == 'AUDIO: OFF') {
        audioButton.innerHTML = 'AUDIO: ON';
        music.play();
        music.loop = true;

    } else {
        audioButton.innerHTML = 'AUDIO: OFF';
        music.pause();
    }
})
document.body.addEventListener('keydown', function (event) {
    keyboardCode = event.keyCode;
    if (timeleft < 250 && wordsAnswered != 25) {
        if (keyboardCode == '13') {
            sendAnswer();
        };
        if (keyboardCode == '17') {
            pasapalabraButton();
        }
    }
});
pasapalabra.addEventListener('click', pasapalabraButton);
exit.addEventListener('click', function () {
    window.close();
});
exitDonut.addEventListener('click', function () {
    debugger
    document.getElementsByTagName('h1')[0].innerHTML = 'PASAPALABRA';

    exit.style.display = 'block';
    selectText.value = 'Nombre';
    document.getElementById('display-header').style.display = 'block';
    document.getElementById('display-rules').style.display = 'block';
    document.getElementById('display-donut').style.display = 'none';
    letterLogo.style.display = 'block';
    for (var i = 0; i < questions.length; i++) {
        questions[i].status = 0;
        questions[i].selection = 0;
        donut[i + 1].style.backgroundColor = 'white';
        donut[i + 1].style.border = '1px solid white';
        donut[i + 1].style.color = '#36a9e1';
    }

    control = 0;
    rightWords = 0;
    wordsAnswered = 0;
    timeleft = 250;
    name;
    answer = '';
    questionAnswer = 0;
    noFirstRound = false;
    controlSecondRound = -1;
    controlFirstLetter = false;
    sendButton.style.backgroundColor = '#3c3c3b';
    pasapalabra.style.backgroundColor = '#3c3c3b';
    continueGame.style.backgroundColor = '#878787';
    cronoNumber.innerHTML = '150';
    points.innerHTML = rightWords;
    cronoNumber.style.left = '55px';
    clearInterval(downloadTimer);
});
sendButton.addEventListener('mouseover', function () {
    if (wordsAnswered < 25) {
        sendButton.style.backgroundColor = 'white';
        sendButton.style.color = '#3c3c3b'
    } else {
        sendButton.style.cursor = 'auto';
    }
});
sendButton.addEventListener('mouseout', function () {
    if (wordsAnswered < 25) {

        sendButton.style.backgroundColor = '#3c3c3b';
        sendButton.style.color = 'white'
    }
});
pasapalabra.addEventListener('mouseover', function () {
    if (wordsAnswered < 25) {
        pasapalabra.style.backgroundColor = 'white';
        pasapalabra.style.color = '#3c3c3b'
    } else {
        pasapalabra.style.cursor = 'auto';
    }
});
pasapalabra.addEventListener('mouseout', function () {
    if (wordsAnswered < 25) {

        pasapalabra.style.backgroundColor = '#3c3c3b';
        pasapalabra.style.color = 'white'
    }
});
continueGame.addEventListener('mouseover', function () {
    continueGame.style.cursor = 'auto';
    if (wordsAnswered == 25) {
        continueGame.style.cursor = 'pointer';

        continueGame.style.backgroundColor = 'white';
        continueGame.style.color = '#3c3c3b'
    }
});
continueGame.addEventListener('mouseout', function () {
    if (wordsAnswered == 25) {

        continueGame.style.backgroundColor = '#3c3c3b';
        continueGame.style.color = 'white'
    }
});
rankingNames.addEventListener('mouseover', function () {
    continueGame.style.cursor = 'auto';
    if (wordsAnswered == 25) {
        rankingNames.style.cursor = 'pointer';

        rankingNames.style.backgroundColor = 'white';
        rankingNames.style.color = '#3c3c3b'
    }
});
rankingNames.addEventListener('mouseout', function () {
    if (wordsAnswered == 25) {

        rankingNames.style.backgroundColor = '#3c3c3b';
        rankingNames.style.color = 'white'
    }
});
continueGame.addEventListener('click', function () {

    if (timeleft == 0) {
        for (var i = 0; i < questions.length; i++) {
            questions[i].status = 0;
            questions[i].selection = 0;
            donut[i + 1].style.backgroundColor = 'white';
            donut[i + 1].style.border = '1px solid white';
            donut[i + 1].style.color = '#36a9e1';
        }
        control = 0;
        rightWords = 0;
        wordsAnswered = 0;
        name;
        answer = '';
        questionAnswer = 0;
        noFirstRound = false;
        controlSecondRound = -1;
        controlFirstLetter = false;
        sendButton.style.backgroundColor = '#3c3c3b';
        pasapalabra.style.backgroundColor = '#3c3c3b';
        continueGame.style.backgroundColor = '#878787';
        cronoNumber.innerHTML = '150';
        points.innerHTML = rightWords;
        cronoNumber.style.left = '55px';
        startGame();
    }
    if (wordsAnswered == 25 && timeleft > 0) {
        for (var i = 0; i < questions.length; i++) {
            questions[i].status = 0;
            questions[i].selection = 0;
            donut[i + 1].style.backgroundColor = 'white';
            donut[i + 1].style.border = '1px solid white';
            donut[i + 1].style.color = '#36a9e1';
        }

        control = 0;
        rightWords = 0;
        wordsAnswered = 0;
        name;
        answer = '';
        questionAnswer = 0;
        noFirstRound = false;
        controlSecondRound = -1;
        controlFirstLetter = false;
        sendButton.style.backgroundColor = '#3c3c3b';
        pasapalabra.style.backgroundColor = '#3c3c3b';
        continueGame.style.backgroundColor = '#878787';
        cronoNumber.innerHTML = '150';
        points.innerHTML = rightWords;
        cronoNumber.style.left = '55px';

        startGame();
    }
});
selectText.addEventListener('click', function () {

    selectText.value = '';

});











