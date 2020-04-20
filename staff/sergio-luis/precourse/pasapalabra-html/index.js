//PASAPALAVRA PROGRAM

var questions = [
    { letter: "a", answer: ["abducir", "america", "atapuerca"], status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", 'CON LA A. En 1492 se descubrió ese continente', 'CON LA A. Lugar de España dónde se han encontrado los fósiles humanos mas antiguos de Europa'] },
    { letter: "b", answer: ["bingo", 'abañuela', 'burgueses'], status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", 'CON LA B. Pico que destaca en Sierra Madrona', 'CON LA B. Así se se llamaban en la Edad Moderna a los habitantes de las ciudades que es habían enriquecido con el comercio'] },
    { letter: "c", answer: ["churumbel", 'clima', 'calzada'], status: 0, question: ["CON LA C. Niño, crío, bebé", 'CON LA C. Es el tiempo atmosférico que predomina en una zona a lo largo del tiempo ', 'CON LA C. Obra pública realizada por los romanos para mejorar la comunicación y el comercio'] },
    { letter: "d", answer: ["diarrea", 'doñana', 'derecho'], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", 'CON LA D. Parque Nacional que se encuentra mayormente en la provincia de Huelva', 'CON LA D. Conjunto de principios y normas que regulan las relaciones humanas'] },
    { letter: "e", answer: ["ectoplasma", 'equador', 'euro'], status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", 'CON LA E. Circunferencia imaginaria que rodea la Tierra', 'CON LA E. Moneda única europea'] },
    { letter: "f", answer: ["facil", 'fosiles', 'feudos'], status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", 'CON LA F. Restos de seres vivos que vivieron hace millones de años ', 'CON LA F. Grandes territorios organizados cerca de un castillo '] },
    { letter: "g", answer: ["galaxia", 'guadalquivir', 'greenwich'], status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", 'CON LA G. Rio andaluz que es navegable en su curso bajo', 'CON LA G. Nombre del Meridiano cero GREENWICH'] },
    { letter: "h", answer: ["harakiri", 'hipocentro', 'mulhacen'], status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", 'CON LA H. Nombre del punto concreto del interior de la Tierra dónde se produce un terremoto', 'CONTIENE LA H. Pico más alto de la Península Ibérica'] },
    { letter: "i", answer: ["iglesia", 'inmigrantes', 'interrogativo'], status: 0, question: ["CON LA I. Templo cristiano", 'CON LA I. Personas que llegan de otros paises al nuestro', 'CON LA I. Enunciado que sirve para preguntar'] },
    { letter: "j", answer: ["jabali", 'james', 'jupiter'], status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", 'CON LA J. Nombre del inventor de la máquina de vapor', 'CON LA J. Planeta alejado del sol y formado por gases'] },
    { letter: "l", answer: ["licantropo", 'latitud', 'longitud'], status: 0, question: ["CON LA L. Hombre lobo", 'CON LA L. Mide en grados hacia el norte o el sur', 'CON LA L.Mide en grados hacia el este o el oeste'] },
    { letter: "m", answer: ["misantropo", 'meridianos', 'megalitos'], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", 'CON LA M. Circunferencias imaginarias que pasan por los Polos', 'CON LA M. Grandes monumentos de piedra que se utilizaban como tumbas en el Neolítico'] },
    { letter: "n", answer: ["necedad", 'neptuno', 'nobleza'], status: 0, question: ["CON LA N. Demostración de poca inteligencia", 'CON LA N. Planeta alejado del sol ', 'CON LA N. Grupo social privilegiado en la Edad Media'] },
    { letter: "ñ", answer: ["señal", 'montañas', 'miño'], status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", 'CONTIENE LA Ñ. Grandes elevaciones de tierra', 'CONTIENE LA Ñ. Rio gallego'] },
    { letter: "o", answer: ["orco", 'odiel', 'ozono'], status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", 'CON LA O. Rio andaluz', 'CON LA O. Capa terrestre que protege a los seres vivos de las radiaciones solares'] },
    { letter: "p", answer: ["protoss", 'paralelos', 'paleolitico'], status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", 'CON LA P. Circunferencias imaginarias paralelas al Ecuador', 'CON LA P. Etapa de la Prehistoria que comenzó con la aparición del ser humano y terminó con la invención de la agricultura'] },
    { letter: "q", answer: ["queso", 'queijigo', 'trueque'], status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", 'CON LA Q. En las zonas de clima de montaña encontramos este árbol', 'CONTIENE LA Q. Intercambio de unos productos por otros sin utilizar monedas'] },
    { letter: "r", answer: ["raton", 'rodano', 'rueda'], status: 0, question: ["CON LA R. Roedor", 'CON LA R. Rio de la vertiente mediterránea europea', 'CON LA R. Mayor avanze tecnológico de la história'] },
    { letter: "s", answer: ["stackoverflow", 'secundario', 'surrealismo'], status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático", 'CON LA S. Sector formado por personas que transforman las materias primas en productos', 'CON LA S. Estilo artístico en el que destacó Dalí'] },
    { letter: "t", answer: ["terminator", 'terremoto', 'tropositionfera'], status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", 'CON LA T. Seísmo o temblor de tierra', 'CON LA T. Capa más cercana a la superficie terrestre'] },
    { letter: "u", answer: ["unamuno", 'ulla', 'urano'], status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", 'CON LA U. Rio gallego', 'CON LA U. laneta alejado del sol'] },
    { letter: "v", answer: ["vikingos", 'volcan', 'velazquez'], status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", 'CON LA V. Expulsa lava y gases del interior de la tierra', 'CON LA V. Destacado pintor español'] },
    { letter: "x", answer: ["botox", 'textil', 'exilio'], status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", 'CONTIENE LA X. En Málaga, Cádiz y Sevilla destacó en el s.XIX este tipo de industria', 'CONTIENE LA X. Persona que abandona su pais por motivos políticos'] },
    { letter: "y", answer: ["peyote", 'plebeyo', 'ayllon'], status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", 'CONTIENE LA Y. Grupo social perteneciente a la sociedad romana', 'CONTIENE LA Y. Sierra que se encuentra en el Sistema Central'] },
    { letter: "z", answer: ["zen", 'zujar', 'zoco'], status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", 'CON LA Z. Afluente del rio Guadiana', 'CONTIENE LA Z. Mercadillo tradicional de los árabes'] },
]

//Variables DOM buttons
var play = document.getElementById('play'),
    questionBord = document.getElementById('questionBord'),
    ok = document.getElementById('ok'),
    pasapalabra = document.getElementById('pasapalabra'),
    restart = document.getElementById('restart'),
    restartYes = document.getElementById('yes'),
    restartNo = document.getElementById('no'),
    newGameButton = document.getElementById('newGame'),
    input = document.getElementById('input'),
    audioOn = document.getElementById('audioOn'),
    audioOff = document.getElementById('audioOff'),
    audioAmbient = new Audio('./sonidos/ambient.mp3'),
    audioCorrect = new Audio('./sonidos/aciertoAcierto.mp3'),
    audioWrong = new Audio('./sonidos//fallofalloes.mp3');
    name = document.getElementById('name').value;

//variables of the game
var typeOfQuestion,
    rond = 0,
    rightWords = 0,
    failWords = 0,
    allWords = 0,
    rond = 0,
    position = 0;

//Events
play.addEventListener('click', playGame);
pasapalabra.addEventListener('click', runPasapalabra);
ok.addEventListener('click', runOk)
input.addEventListener('keypress', keyFuncionality)
restart.addEventListener('click', runRestart);
restartYes.addEventListener('click', runRestartYes);
restartNo.addEventListener('click', runRestartNo);
audioOn.addEventListener('click', audioAmbientOn);
audioOff.addEventListener('click', audioAmbientOff);
newGameButton.addEventListener('click', newGame)


//***************************
//**** FUNCTIONS ************
//***************************


//Function to play the game
function playGame() {
    typeOfQuestion = Math.floor(Math.random() * 3);
    document.getElementById('displayMenu').style.display = 'none';
    document.getElementById('containerCircle').style.display = 'block';
    //This part of the code make the circle of letters
    var circle = document.getElementsByClassName('item');
    var angle = 255;
    for (var i = 0; i < circle.length; i++) {
        angle += 14.4;
        circle[i].style.transform = 'rotate(' + angle + 'deg) translate(200px) rotate(' + (-angle) + 'deg)';
       
    }
    runTimer();
    questionBord.innerHTML = '';
    questionBord.innerHTML = questions[position].question[typeOfQuestion];
    document.getElementById(questions[position].letter).style.border = '3px solid purple';
}


//Function wend you press ok button analize de answer
function runOk() {
    var input = (document.getElementById('input')).value.toLowerCase();
    var id = questions[position];
    document.getElementById('input').value = '';
    if (input === id.answer[typeOfQuestion]) {
        document.getElementById(id.letter).style.backgroundImage = 'radial-gradient(circle, #80ff80, #6bf268, #53e64f, #38d933, #00cc00)';
        audioCorrectFunction()
        rightWords++;
        rond++;
        allWords++
    } else {
        document.getElementById(id.letter).style.backgroundImage = 'radial-gradient(circle, #ff9980, #fc8263, #f66947, #ef4f29, #e62e00)';
        audioWrongFunction()
        failWords++;
        rond++;
        allWords++
    }

    document.getElementById('rightWordsItem').innerHTML = rightWords;
    document.getElementById(id.letter).style.border = '2px solid white'
    position++
    document.getElementById(questions[position].letter).style.border = '3px solid purple';
    questionBord.innerHTML = questions[position].question[typeOfQuestion];
}

//Function of the funcionality keys ('enter'-for ok button / 'space'-for pasapalabra button / 'esc' - for restart button)
function keyFuncionality(e) {
    if (e.keyCode === 13) {
        runOk();
    }
    if (e.keyCode === 32) {
        runPasapalabra();
    }
    if (e.keyCode === 27) {
        runRestart();
    }
}

//Function pasapalabra 
function runPasapalabra() {
    document.getElementById('input').value = '';
    document.getElementById(questions[position].letter).style.border = '2px solid white'

    var word = questions.splice(position, 1)[0] //eliminate the word in this position
    questions.push(word) //the eliminate word go to the final of array questions
    rond++;

    document.getElementById(questions[position].letter).style.border = '3px solid purple';
    questionBord.innerHTML = questions[position].question[typeOfQuestion];
}

//Function restart wend you press de restart will open a window with 'yes' or 'no'
function runRestart() {
    document.getElementById('containerPlay').style.display = 'none';
    document.getElementById('restartMenu').style.display = 'block';
}

//Function for restart de game will show the final result
function runRestartYes() {
    showResult();
}

//Function restart No will return to the game 
function runRestartNo() {
    document.getElementById('containerPlay').style.display = 'block';
    document.getElementById('restartMenu').style.display = 'none';
}

//function Show result
function showResult() {
    var result = document.getElementById('result');
    document.getElementById('containerCircle').style.display = 'none';
    document.getElementById('containerFinal').style.display = 'block';
    result.innerHTML = 'Resultados del pasapalabra de '+name+':<br>Aciertos: ' + rightWords + '<br>Fallos: ' + failWords + '<br>Rondas: ' + rond + '<br>';
}

//Function finish the game
function newGame() {
    location.reload();
}

// Function for Run a Timer
function runTimer() {
    var timeleft = 150;
    var colorRgbGreen = 255;
    var colorRgbRed = 0;
    var downloadTimer = setInterval(function() {
        var time = document.getElementById('timer');
        time.innerHTML = timeleft;
        timeleft -= 1;
        if (timeleft < 50) {
            colorRgbGreen -= 3;
        } else if (timeleft < 100) {
            colorRgbGreen -= 2;
        } else if (timeleft < 150) {
            colorRgbRed += 5;
        }
        // incorporar funcion que termine el juego!!! para los colores incorporar una funcion con entrada de dos parametros!
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            time.innerHTML = "0";
            showResult();
        }
        if (allWords === 25) {
            showResult();
        }
        document.getElementById('timerPosition').style.backgroundColor = `rgba(${colorRgbRed}, ${colorRgbGreen}, 0)`
    }, 1000);
}



// *********************
// ** AUDIO FUNCTIONS **
// *********************

//Function of the correct answer
function audioCorrectFunction() {
    audioCorrect.play();
}
//Function of the incorrect answer
function audioWrongFunction() {
    audioWrong.play();
}
//Function of the ambient music
function audioAmbientOn() {
    audioAmbient.play();
    audioOn.style.display = 'none';
    audioOff.style.display = 'block';
}
//Function to stop the ambient music
function audioAmbientOff() {
    audioAmbient.pause();
    audioOn.style.display = 'block';
    audioOff.style.display = 'none';
}

//MAque a ranking!!!!


// var ranking = [{
//     name: 'Sergi',
//     points: 30
// },
// {
//     name: "Marc",
//     points: 50,
// }
// ];


// showRanking.addEventListener('click', printRanking)
// exitRanking.addEventListener('click', function() {
//     intro2.style.display = 'block';
//     rankingBoard.style.display = 'none'
// })

// ranking.push(generateRanking(userName.value, correctAnswers))
// // // Function to generate ranquing
// function generateRanking(name, point) {
// return {
//     name: name,
//     points: point
// }
// }

// var showRankingList = document.getElementById('showRankingBox');
// // // Function to order number of points

// // // Function to order number of points
// function orderRanking() {
// ranking.sort(function(a, b) {
//     return b.points - a.points;
// })
// }

// function printRanking() {
// intro2.style.display = 'none';
// rankingBoard.style.display = 'block'
//     // showRankingList.style.visibility = "visible";
// orderRanking()
// var txt1 = '';
// var txt2= '';
// for (var player of ranking) {
//     txt1 += '<li>'+ player.name +'</li>';
//     txt2 += '<li>' + player.points + '</li>';        
// }
// listName.innerHTML = txt1
// listPoints.innerHTML =txt2
// }
/* <button id="showRanking"> Mostrar Ranking</button>
</div>
<div id='rankingBoard'>
    <button id="exitRanking"> Exit Ranking</button>
    <div id='showRankingBox ' class="row">
        <div>
            <h3>Name</h3>
            <ol id="listName">
               
            </ol>
        </div>
        <div>
            <h3>Points</h3>
            <ul id=listPoints>
                
            </ul>
        </div> */