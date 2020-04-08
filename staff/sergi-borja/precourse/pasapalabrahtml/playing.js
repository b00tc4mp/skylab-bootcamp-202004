
var asking = [
    { id: 0, letter: "letterA", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
    { id: 1, letter: "letterB", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
    { id: 2, letter: "letterC", answer: "criatura", status: 0, question: "CON LA C. Niño, crío, bebé" },
    { id: 3, letter: "letterD", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
    { id: 4, letter: "letterE", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
    { id: 5, letter: "letterF", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad" },
    { id: 6, letter: "letterG", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas" },
    { id: 7, letter: "letterH", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento" },
    { id: 8, letter: "letterI", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano" },
    { id: 9, letter: "letterJ", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
    { id: 10, letter: "letterK", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria" },
    { id: 11, letter: "letterL", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo" },
    { id: 12, letter: "letterM", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas" },
    { id: 13, letter: "letterN", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia" },
    { id: 14, letter: "letterÑ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
    { id: 15, letter: "letterO", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
    { id: 16, letter: "letterP", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
    { id: 17, letter: "letterQ", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche" },
    { id: 18, letter: "letterR", answer: "raton", status: 0, question: "CON LA R. Roedor" },
    { id: 19, letter: "letterS", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático" },
    { id: 20, letter: "letterT", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
    { id: 21, letter: "letterU", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
    { id: 22, letter: "letterV", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
    { id: 23, letter: "letterX", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética" },
    { id: 24, letter: "letterY", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos" },
    { id: 25, letter: "letterZ", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional" },
];

var timer = document.getElementsByClassName('timer');
var pregunta = document.getElementById('pregunta');
var input = document.getElementById('respuesta');
var intro = document.getElementById('intro');
var pasapalabra = document.getElementById('pasapalabra');
var again = document.getElementById('again');
var ranking = document.getElementById('ranking');
var promptName = document.getElementById('inputName');


var acc = 0;
var newQuest = [];
var aux = 0;
var auxPasado = 0;
var last = 0;
var questions = [];
questions = asking;
var restart = false;
var points = 0;
var executed = true;

var idis = ["letterA", "letterB", "letterC", "letterD", "letterE", "letterF", "letterG", "letterH", "letterI", "letterJ", "letterK", "letterL", "letterM", "letterN", "letterÑ", "letterO", "letterP", "letterQ", "letterR", "letterS", "letterT", "letterU", "letterV", "letterX", "letterY", "letterZ"];

intro.addEventListener('click', checkAnswer);
pasapalabra.addEventListener('click', pasoAnswer);
document.getElementById('again').addEventListener('click', playAgain);
input.addEventListener('keypress', enterKey);
input.addEventListener('keypress', spaceKey);

document.getElementById('wrongMsg').style.visibility = 'hidden';

function helloByePromptBox(how) {
    [].forEach.call(document.querySelectorAll('.promptBox'), function (el) {
        el.style.visibility = how;
    });
}
helloByePromptBox('hidden');

function blurElements(how) {
    [].forEach.call(document.querySelectorAll(how), function (el) {
        el.style.filter = 'blur(8px)';
    });
}

function unBlur(how) {
    [].forEach.call(document.querySelectorAll(how), function (el) {
        el.style.filter = 'none';
    });
}

var counter = 120;
timer[0].innerHTML = counter;
var setInter = setInterval(timeIt, 1000);
function timeIt() {
    if (counter != 0) {
        counter--;
    } else if (counter == 0) {
        if (executed) {
            sacabo();
            executed = !executed;
        }
    }
    timer[0].innerHTML = counter;
}


function spaceKey(e) {
    if (e.keyCode === 32) {
        pasoAnswer();
    }
}

function enterKey(e) {
    if (e.keyCode === 13) {
        checkAnswer();
    }
}

function playAgain() {
    restart = true;
    window.location.reload();
}

function disableAgain() {
    again.disabled = true;
    again.style.border = 'none';
    again.style.color = 'rgb(224, 220, 220)';
}

function disableRank() {
    ranking.disabled = true;
    ranking.style.border = 'none';
    ranking.style.color = 'rgb(224, 220, 220)';
    document.querySelector('a').href = '';
}

function sacabo() {
    clearInterval(setInter);
    helloByePromptBox('visible');
    blurElements('.answerBox');
    blurElements('.dots');
    blurElements('.timer');
    ranking.style.visibility = 'hidden';
    document.getElementById('cancelo').onclick = function () {
        helloByePromptBox('hidden');
        unBlur('.answerBox');
        unBlur('.dots');
        unBlur('.timer');
        input.disabled = true;
        intro.disabled = true;
        intro.style.border = 'none';
        pasapalabra.disabled = true;
        pasapalabra.style.border = 'none';
        again.style.border = '2px solid black';
        again.style.color = 'black';
        again.disabled = false;
    }

    document.getElementById('acepto').onclick = function () {
        if (promptName.value == '' || !isNaN(promptName.value)) {
            document.getElementById('wrongMsg').style.visibility = 'visible';
        } else {
            document.getElementById('wrongMsg').style.visibility = 'hidden';
            helloByePromptBox('hidden');
            unBlur('.answerBox');
            unBlur('.dots');
            unBlur('.timer');
            ranking.style.visibility = 'visible';
            var name = promptName.value;
            promptName.value = '';
            input.disabled = true;
            intro.disabled = true;
            intro.style.border = 'none';
            pasapalabra.disabled = true;
            pasapalabra.style.border = 'none';
            again.style.border = '2px solid black';
            again.style.color = 'black';
            again.disabled = false;
            ranking.style.border = '2px solid black';
            ranking.style.color = 'black';
            ranking.disabled = false;
            document.querySelector('a').href = 'ranking.html';
            localStorage.clear();
            localStorage.setItem('name', name);
            localStorage.setItem('points', points);
        }
    }
}

disableAgain();
disableRank();
pregunta.innerHTML = questions[acc].question;
document.getElementById(idis[acc]).style.background = '#b8d8ac';

function checkAnswer() {
    if (acc < 25) {
        var answer = input.value;
        input.value = '';
        pregunta.innerHTML = questions[acc + 1].question;
        if (answer == questions[acc].answer) {
            console.log('CORRECTO');
            questions[acc].status = 1;
            document.getElementById(idis[acc]).style.background = '#52ff13';
            points++;
        } else if (answer != questions[acc].answer) {
            console.log('INCORRECTO');
            questions[acc].status = 2;
            document.getElementById(idis[acc]).style.background = 'red';
        }
        acc++;
        document.getElementById(questions[acc].letter).style.background = '#b8d8ac';
    } else if (acc > 24) {
        if (aux == 0) {
            aux++;
            var answer = input.value;
            input.value = '';
            if (answer == questions[acc].answer) {
                console.log('CORRECTO');
                questions[acc].status = 1;
                document.getElementById(idis[acc]).style.background = '#52ff13';
                points++;
            } else if (answer != questions[acc].answer) {
                console.log('INCORRECTO');
                questions[acc].status = 2;
                document.getElementById(idis[acc]).style.background = 'red';
            }
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].status == 'pasao') {
                    newQuest.push(questions[i]);
                }
            }
            questions = [];
            questions = newQuest;
            newQuest = [];
            if (questions.length != 0) {
                pregunta.innerHTML = questions[0].question;
                document.getElementById(questions[0].letter).style.background = '#b8d8ac';
            } else if (questions.length == 0) {
                sacabo();
            }
            //ENDING THE ROSCO      
        } else {
            var answer = input.value;
            input.value = '';
            if (answer == questions[last].answer) {
                console.log('CORRECTO');
                questions[last].status = 1;
                document.getElementById(questions[last].letter).style.background = '#52ff13';
                points++;
            } else if (answer != questions[last].answer) {
                console.log('INCORRECTO');
                questions[last].status = 2;
                document.getElementById(questions[last].letter).style.background = 'red';
            }
            questions.length;
            for (var j = 0; j < questions.length; j++) {
                if (questions[j].status == 'pasao') {
                    newQuest.push(questions[j]);
                }
            }
            questions = [];
            questions = newQuest;
            newQuest = [];
            if (questions.length != 0) {
                if (last == questions.length) {
                    last = 0;
                    pregunta.innerHTML = questions[last].question;
                    document.getElementById(questions[last].letter).style.background = '#b8d8ac';
                } else if (last < questions.length) {
                    pregunta.innerHTML = questions[last].question;
                    document.getElementById(questions[last].letter).style.background = '#b8d8ac';
                }
            } else if (questions.length == 0) {
                sacabo();
            }
        }
    }
}

function pasoAnswer() {
    if (acc < 25) {
        input.value = '';
        document.getElementById(idis[acc]).style.background = 'rgb(64, 123, 231)';
        document.getElementById(idis[acc + 1]).style.background = '#b8d8ac';
        pregunta.innerHTML = questions[acc + 1].question;
        questions[acc].status = 'pasao';
        acc++;
    } else if (acc > 24) {
        if (auxPasado == 0) {
            auxPasado++;
            input.value = '';
            if (aux == 0) {
                aux++;
                questions[acc].status = 'pasao';
                document.getElementById(idis[acc]).style.background = 'rgb(64, 123, 231)';
            }
            for (var z = 0; z < questions.length; z++) {
                if (questions[z].status == 'pasao') {
                    newQuest.push(questions[z]);
                }
            }
            questions = [];
            questions = newQuest;
            newQuest = [];
            pregunta.innerHTML = questions[0].question;
            document.getElementById(questions[0].letter).style.background = '#b8d8ac';
        } else if (auxPasado > 0) {
            input.value = '';
            if (last == questions.length - 1) {
                last = 0;
                pregunta.innerHTML = questions[last].question;
                document.getElementById(questions[questions.length - 1].letter).style.background = 'rgb(64, 123, 231)';
                document.getElementById(questions[last].letter).style.background = '#b8d8ac';
            } else if (last < questions.length) {
                last++;
                pregunta.innerHTML = questions[last].question;
                document.getElementById(questions[last - 1].letter).style.background = 'rgb(64, 123, 231)';
                document.getElementById(questions[last].letter).style.background = '#b8d8ac';
            }
        }
    }
}


