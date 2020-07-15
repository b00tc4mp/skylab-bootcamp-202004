let questions = [
    { letter: "a", answer: ["abducir", "antonimo", "acepcion"], status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", "CON LA A. Palabra que significa lo contrario de una dada", "CON LA A. Cada uno de los significados que tiene una palabra."]},
    { letter: "b", answer: ["bingo", "bisilaba", "biografia"], status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", "CON LA B. Palabra que tiene dos sílabas.", "CON LA B. Contar la vida de una persona por escrito."]},
    { letter: "c", answer: ["churumbel", "cantidad", "comic"], status: 0, question: ["CON LA C. Niño, crío, bebé", "CON LA C. Más es un adverbio de ...", "CON LA C. Historia contada en viñetas con dibujos y palabras."]},
    { letter: "d", answer: ["diarrea", "determinantes",  "diccionario"], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", "CON LA D. Los artículos, demostrativos, posesivos, etc. Son ...", "CON LA D. Libro en el que aparece el significado de las palábras por orden alfabético."]},
    { letter: "e", answer: ["ectoplasma", "esdrujula", "estrofa"], status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", "CON LA E. Palábra cuya sílaba tónica es la antepenúltima", "CON LA E. Grupo de versos que riman entre sí o tratan de un tema determinado."]},
    { letter: "f", answer: ["facil", "fiebre", "fumar"], status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", "CON LA F. Aumento de la temperatura del cuerpo que tenemos cuando estamos enfermos", "CON LA F. Ábito perjudicial para el aparato respiratorio."]},
    { letter: "g", answer: ["galaxia", "guindilla", "genotipo"], status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", "CON LA G. Pimiento pequeño que pica mucho", "CON LA G. Informacón genética de un ser vivo."]},
    { letter: "h", answer: ["harakiri", "humo", "hablar"], status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", "CON LA H. Lo que sale cuando se hace el fuego.", "CON LA H. Dialogar con las personas."]},
    { letter: "i", answer: ["iglesia", "intuir", "insectos"], status: 0, question: ["CON LA I. Templo cristiano", "CON LA I. Percibir íntima e instantáneamente una idea o verdad tal como si se la tuviera a la vista.", "CON LA I. La mosca, la hormiga, la avispa y la obeja son ..."]},
    { letter: "j", answer: ["jabali", "jardin", "jornada"], status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", "CON LA J. Zona que rodea algunas casas y edificios y que esta lleno de césped, flores, árboles...", "CON LA J. Tiempo de duración del trabajo diario."]},
    { letter: "k", answer: ["kamikaze", "kilo", "koala"], status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria", "CON LA K. Medida de peso que es igual a 1000 gramos.", "CON LA K. Animal parecido a un oso pequeño y que podemosencontrar en Australia."]},
    { letter: "l", answer: ["licantropo", "luna", "lermontov"], status: 0, question: ["CON LA L. Hombre lobo", "CON LA L. Satélite de la Tierra.", "CON LA L. Apellido del poeta ruso autor de la obra La muerte del poeta de 1837."]},
    { letter: "m", answer: ["misantropo", "menor", "mantel"], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", "CON LA M. Se dice de una persona que no ha alcanzado la mayoría de edad.", "CON LA M. Tela que se pone en la mesa a la hora de comer."]},
    { letter: "n", answer: ["necedad", "nimfa", "nido"], status: 0, question: ["CON LA N. Demostración de poca inteligencia", "CON LA N. Cada una de las fabulosas deidades de las aguas, bosques o selva.", "CON LA N. Tipo de casa que construyen los págaros para poner sus huevos."]},
    { letter: "ñ", answer: ["señal", "ñu", "patraña"], status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", "CON LA Ñ. Mamífero africano de color marron parecido a un torro con los cuernos curvos", "CONTIENE LA Ñ. Mentira o noticia fabulosa de pura invención."]},
    { letter: "o", answer: ["orco", "ordenanza", "oriente"], status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", "CON LA O. Empleado que en ciertas oficinas desempeña funciones subalternas.", "CON LA O. Los reyes magos proceden de ..."]},
    { letter: "p", answer: ["protoss", "prioridad", "peso"], status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", "CON LA P. Anterioridad de algo respecto de otra cosa en tiempo u orden.", "CON la P. Moneda argentina"]},
    { letter: "q", answer: ["queso", "branquia", "quijote"], status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", "CONTIENE LA Q. Órgano respiratorio de los peces formado por láminas o filamentos.", "CON LA Q. Protagonista de libro español más famoso de Cervantes."]},
    { letter: "r", answer: ["raton", "rapido", "renard"], status: 0, question: ["CON LA R. Roedor", "CON LA R. Veloz", "CON LA R. Apellido del ingeniero francés que, junto a Arthur C. Krebs, construyó el dirigible militar La France en 1884."]},
    { letter: "s", answer: ["stackoverflow", "sacapuntas", "samba"], status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático", "CON LA S. Lo que se usa para tener la punta de los lápices afilada", "CON LA S. Danza popular brasileña de influencia africana cantada de compás binario."]},
    { letter: "t", answer: ["terminator", "tragaperras", "techo"], status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", "CON LA T. Máquina de juegos de azar que funciona introduciendo monedas.", "CON LA T. Parte de una habitación que está arriba."]},
    { letter: "u", answer: ["unamuno", "urgente", "usurpar"], status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", "CON LA U. Que no puede esperar", "CON LA U. Atribuirse y usar un título o cargo ajeno como si fuera propio."]},
    { letter: "v", answer: ["vikingos", "vivienda", "veloz"], status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", "CON LA V. Lugar cerrado o cubierto construido para ser habitado por personas.", "CON LA V. Que es muy rápido."]},
    { letter: "w", answer: ["sandwich", "windsurf", "whisky"], status: 0, question: ["CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", "CON LA W. Deporte que se practica en el mar, de pie sobre una tabla alargada que tiene una vela triangular", "CON LA W. Bebida alcohólica"]},
    { letter: "x", answer: ["botox", "oxford", "taxi"], status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", "CONTIENE LA X. Ciudad inglesa cuya universidad compite cada año en una popular regata contra la universidad de Cambridge", "CONTIENE LA X. Coche con conductor que lleva a las personas donde quieren ir y cobra según los kilómetros recorreidos"]},
    { letter: "y", answer: ["peyote", "leguleyo", "yate"], status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", "CONTIENE LA Y. Persona que aplica el derecho sin rigor y desenfadadamente", "CON LA Y. Barco de lujo."]},
    { letter: "z", answer: ["zen", "zarandeo", "zoo"], status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", "CON LA Z. Movimiento repetido y violento de un lado a otro.", "CON LA Z. Parque en el que hay todo tipo de animales."]},
]

let randomNum;
let playerName;
let successes = 0;
let fails = 0;
let countShowQuestions = 0;
let count = 27;
let pasapalabraArray = [];
let pasapalabraRanking = [];
let exitGame;
let table = document.getElementById('playeranking');
let userNum, userName, userSuccess, userFails;


function randomNumber (){
    randomNum = Math.floor(Math.random()*3);
}

function showQuestions(a){
    if(pasapalabraArray.length === 0 && count <= 0){
        clearInterval(countDown);
        playerRanking();
    } else if(count > 0){
        document.getElementById('question').innerHTML = questions[a].question[randomNum];
        document.getElementsByClassName('letter')[a].style.transform = 'scale(1.25)';
        document.getElementsByClassName('letter')[a].style.backgroundColor = '#4B80FE';
        countShowQuestions++;
        count--;
        document.getElementById('answer').value = '';
    }else{
        count--
        countShowQuestions = pasapalabraArray[0]
        pasapalabraStatus(countShowQuestions);
    }
}

function pasapalabraStatus (a){
    countShowQuestions++;
    document.getElementById('question').innerHTML = questions[a].question[randomNum];
    document.getElementsByClassName('letter')[a].style.transform = 'scale(1.25)';
    document.getElementsByClassName('letter')[a].style.backgroundColor = '#4B80FE';
    document.getElementById('answer').value = '';
}

function submitAnswer (){
    let playerAnswer = document.getElementById("answer").value;
    let lowerCaseAnswer = playerAnswer.toLowerCase();
    let index;
    if(lowerCaseAnswer === questions[countShowQuestions-1].answer[randomNum]){
        document.getElementsByClassName('letter')[countShowQuestions-1].style.backgroundColor = 'limegreen';
        document.getElementsByClassName('letter')[countShowQuestions-1].style.transform = 'scale(1)';
        successes++;
        document.getElementById('success').innerHTML = successes;
        questions[countShowQuestions-1].status = 1;
        if (count < 0){
            index = pasapalabraArray.indexOf(countShowQuestions-1);
            pasapalabraArray.splice(index,1);
        }
    }else if(lowerCaseAnswer === 'pasapalabra' || lowerCaseAnswer === ''){
        questions[countShowQuestions-1].status = 2;
        pasapalabraArray.push(countShowQuestions-1);
        document.getElementsByClassName('letter')[countShowQuestions-1].style.transform = 'scale(1)';
        document.getElementsByClassName('letter')[countShowQuestions-1].style.backgroundColor = 'rgb(46, 27, 170)';
        if (count < 0){
            index = pasapalabraArray.indexOf(countShowQuestions-1);
            pasapalabraArray.splice(index,1);
        }
    }else{
        document.getElementsByClassName('letter')[countShowQuestions-1].style.backgroundColor = 'red';
        document.getElementsByClassName('letter')[countShowQuestions-1].style.transform = 'scale(1)';
        questions[countShowQuestions-1].status = 0;
        fails++;
        if (count < 0){
            index = pasapalabraArray.indexOf(countShowQuestions-1);
            pasapalabraArray.splice(index,1);
        }
    }
}

function exit (){
    exitGame = confirm('Estás seguro que quieres salir?');
    if(exitGame){
        countShowQuestions -= 2;
        document.getElementById("questions").style.display = 'none';
        clearInterval(countDown);
        gameReset();
    }else{
        countShowQuestions --;
        count++;
        showQuestions(countShowQuestions);
    }
}


function visibilityName (){

    playerName = document.getElementById("fname").value;
    let name = document.getElementById("gamerName").innerHTML;
    document.getElementById("gamerName").innerHTML = name + playerName;
    document.getElementById("gamerName").style.visibility = 'visible';
    
}

function nonDisplayRules (){
    document.getElementById("rules").style.display = 'none';
    document.getElementById("questions").style.display = 'block';
}

function timeDown (){
    countDown = setInterval(playTimer, 1000);
    function playTimer(){
        let seconds = document.getElementById('timer').innerText;
        seconds --;
        document.getElementById("timer").innerHTML = seconds;
        if (seconds <= 10){
            document.getElementById('timer').style.backgroundColor = 'red';
        }
        if(seconds <= 0){
            clearInterval(countDown);
            document.getElementById("questions").style.display = 'none';
            document.getElementById('timeover').style.display = 'block';
        }
    }
}

function playerRanking (){
    let ranking = new Object;
    ranking.name = playerName;
    ranking.point = successes;
    ranking.fail = fails;
    pasapalabraRanking.push(ranking);
    pasapalabraRanking.sort(function(a,b){
        return (b.point - a.point);
    });
    for (let i in pasapalabraRanking){
        let row = table.insertRow(-1);
        userNum = row.insertCell(0);
        userNum.innerHTML = Number(i) + 1;
        userName = row.insertCell(1);
        userName.innerHTML = pasapalabraRanking[i].name;
        userSuccess = row.insertCell(2);
        userSuccess.innerHTML = pasapalabraRanking[i].point;
        userFail = row.insertCell(3);
        userFail.innerHTML = pasapalabraRanking[i].fail;
    }
    document.getElementById('questions').style.display = 'none';
    document.getElementById('timeover').style.display = 'none';
    document.getElementById('playeranking').style.display = 'block';
    document.getElementById('ranking').style.display = 'block';

}


function gameReset (){
    successes = 0;
    fails = 0;
    countShowQuestions = 0;
    count = 27;
    playerName = '';
    userPoints = '';
    pasapalabraArray = [];
    endStatus = 0;
    document.getElementById('fname').value = '';
    document.getElementById('ranking').style.display = 'none';
    document.getElementById('playeranking').style.display = 'none';
    document.getElementById('timeover').style.display='none';
    for (let i=0; i < 27; i++){
        document.getElementsByClassName('letter')[i].style.backgroundColor = "rgb(46, 27, 170)";
    }
    for (let j in questions){
        questions[j].status = 0;
    }
    if(pasapalabraRanking.length > 0){
        for(let n = pasapalabraRanking.length; n > 0; n--){
            table.deleteRow(n);
        }
    }   
    document.getElementById("rules").style.display = 'block';
    document.getElementById("success").innerHTML = successes;
    document.getElementById('gamerName').innerHTML = 'Juego de ';
    document.getElementById('gamerName').style.visibility = 'hidden';
    document.getElementById('timer').innerHTML = Number('180');
    document.getElementById('timer').style.backgroundColor = 'darkorange';

}

document.getElementById("play").addEventListener('click', visibilityName);
document.getElementById('play').addEventListener('click', randomNumber);
document.getElementById("play").addEventListener('click', nonDisplayRules);
document.getElementById("play").addEventListener('click', timeDown);
document.getElementById("play").addEventListener('click', function (){showQuestions(countShowQuestions)});
document.getElementById('submit').addEventListener('click', submitAnswer);
document.getElementById('submit').addEventListener('click', function (){showQuestions(countShowQuestions)});
document.getElementById('answer').addEventListener('keyup', function(e){
    if (e.keyCode === 13){
        submitAnswer();
        showQuestions(countShowQuestions);
    }
});
document.getElementById('fname').addEventListener('keyup', function(element){
    if(element.keyCode === 13){
        visibilityName();
        randomNumber();
        nonDisplayRules();
        timeDown();
        showQuestions(countShowQuestions);
    }
});

document.getElementById('end').addEventListener('click', exit);
document.getElementById('reset').addEventListener('click', gameReset);
document.getElementById('playagain').addEventListener('click', gameReset);
document.getElementById('showranking').addEventListener('click', playerRanking);