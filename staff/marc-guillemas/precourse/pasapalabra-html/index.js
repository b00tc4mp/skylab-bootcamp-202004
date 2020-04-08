var questions = [
    [
        { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
        { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
        { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé" },
        { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
        { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
        { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad" },
        { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas" },
        { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento" },
        { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano" },
        { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
        { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria" },
        { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo" },
        { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas" },
        { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia" },
        { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
        { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
        { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
        { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche" },
        { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
        { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático" },
        { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
        { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
        { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
        { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso" },
        { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética" },
        { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos" },
        { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional" },
    ],
    [
        { letter: "a", answer: "arma", status: 0, question: "CON LA A. Instrumento o máquina que sirve para atacar o defenderse: Apoderarse de alguien" },
        { letter: "b", answer: "bañarse", status: 0, question: "CON LA B. Entrar en el agua para lavarse, para nadar o jugar:" },
        { letter: "c", answer: "cazadora", status: 0, question: "CON LA C. Ropa de abrigo que cubre desde los hombros a la cintura:" },
        { letter: "d", answer: "debil", status: 0, question: "CON LA D. Que tiene poca fuerza, poco vigor o poca resistencia:" },
        { letter: "e", answer: "edificio", status: 0, question: "CON LA E. Lugar que se usa para viviendas, oficinas, colegios, etc:" },
        { letter: "f", answer: "futuro", status: 0, question: "CON LA F. Tiempo que viene después:" },
        { letter: "g", answer: "grua", status: 0, question: "CON LA G. Máquina para levantar objetos pesados y moverlos de un lugar a otro" },
        { letter: "h", answer: "hundir", status: 0, question: "CON LA H. Ir abajo dentro del agua" },
        { letter: "i", answer: "isla", status: 0, question: "CON LA I. Territorio que está rodeado de agua por todas partes" },
        { letter: "j", answer: "jugador", status: 0, question: "CON LA J. Persona que juega" },
        { letter: "k", answer: "kilo", status: 0, question: "CON LA K. Medida para pesar (equivale a mil gramos)" },
        { letter: "l", answer: "lata", status: 0, question: "CON LA L. Envase de metal" },
        { letter: "m", answer: "manzana", status: 0, question: "CON LA M. Fruta de piel fina, amarilla, verde o roja, de carne blanca y dura" },
        { letter: "n", answer: "nunca", status: 0, question: "CON LA N. Ningún día o en ningún tiempo" },
        { letter: "ñ", answer: "señuelo", status: 0, question: "CONTIENE LA Ñ. Objeto que se utiliza para atraer a las aves que se quieren cazar" },
        { letter: "o", answer: "oveja", status: 0, question: "CON LA O. Animal doméstico que tiene el cuerpo cubierto de lana" },
        { letter: "p", answer: "pasear", status: 0, question: "CON LA P. Andar por placer o para hacer ejercicio" },
        { letter: "q", answer: "querer", status: 0, question: "CON LA Q. Tener el deseo, la voluntad o la intención de hacer, poseer o lograr algo" },
        { letter: "r", answer: "resumen", status: 0, question: "CON LA R. Pocas palabras que  cuentan una historia más larga" },
        { letter: "s", answer: "sandalia", status: 0, question: "CON LA S. Calzado que no tapa todo el pie" },
        { letter: "t", answer: "techo", status: 0, question: "CON LA T. Parte de una habitación que está arriba" },
        { letter: "u", answer: "urgente", status: 0, question: "CON LA U. Que no puede esperar" },
        { letter: "v", answer: "veloz", status: 0, question: "CON LA V. Que es muy rápido" },
        { letter: "w", answer: "wisky", status: 0, question: "CON LA W. Bebida alcohólica de alta graduación que se obtiene por destilación de cebada y otros cereales" },
        { letter: "x", answer: "xilofono", status: 0, question: "CON LA X. Instrumento musical de percusión formado por una serie de láminas de madera dispuestas horizontalmente y ordenadas según su tamaño que, al ser golpeadas, emiten sonidos correspondientes a diferentes notas musicales; se toca con dos o cuatro macillas" },
        { letter: "y", answer: "yegua", status: 0, question: "CON LA Y. Hembra del caballo" },
        { letter: "z", answer: "zarpar", status: 0, question: "CON LA Z. Empezar a navegar" }
    ]
];



var questionInHtml = document.getElementById('question');
var checkAnswrBtn = document.getElementById('checkAnswer')
var startGameBtn = document.getElementById('startGamebtn');
var pasapalabraBtn = document.getElementById('pasapalabraBtn');
var userAnswer = document.getElementById('userAnswr');
var homePage = document.getElementById("home-page");
var userName = document.getElementById('username');
var exitBtn = document.getElementById('exitBtn');


var roscoList = document.getElementById('rosco-letters');
var letters = document.getElementsByClassName("letters")
var timerCont = document.getElementById("timer-container");
var logo = document.getElementById("logo");
var startedPart = document.getElementById("started-part");
var intro = document.getElementById("intro");


pasapalabraBtn.addEventListener('click', pasapalabra, false);
startGameBtn.addEventListener('click', nextQuestion, false);
startGameBtn.addEventListener('click', initGame, false);
checkAnswrBtn.addEventListener('click', checkAnswer, false);

showRanking.addEventListener('click', printRanking)
exitRanking.addEventListener('click', function() {

    intro.style.transform = "rotateY(360deg)";
    // intro2.style.display = 'block';
    // rankingBoard.style.display = 'none'
})

var showRankingList = document.getElementById('showRankingBox');

var timeUp;
var userID;
var contOfQuestions = 0;
var random;
var question;
var correctAnswers = 0;
var failedAnswers = 0;
var obj = {};
var ranking = [{
    name: 'Sergio Luis',
    points: 30
},
{
    name: "Marc",
    points: 50,
}
];

//this conditional creates a ranking in local storage just in case there isnt
if(JSON.parse(window.localStorage.getItem('users') === null)){
    window.localStorage.setItem('users', JSON.stringify(ranking));
}



function visualChanges() {

    startedPart.style.visibility = "visible"
    startedPart.style.animation = "fadeIn 2s"
    intro.style.visibility = "hidden"
    timerCont.style.visibility = "visible"
    logo.style.visibility = "hidden"

    timeUp = runTimer();

}

function userBoxTransition() {
    userName.style.width = "230px";
}

//
function initGame() {


    userID = userName.value;
    // while (userID.length > 20) {
    //     // alert("max lengh 20 caracters")
    // }
    userName.value = "";
    if(userID === ""){
        userID = "---"
    }
    obj.name = userID;

    ranking = JSON.parse(window.localStorage.getItem('users'));

    roscoList.style.animation = "fadeIn 4s"
    roscoList.style.visibility = "visible";

    for (let i = 1; i < letters.length; i++) {

        updateLayout(letters);

    }
    userName.style.transition = "none";
    showRanking.style.transition = "none";
    intro.style.transition = "none";
    intro.style.animation = "fadeOut 4s"
    logo.style.animation = "fadeOut 4s"

    setTimeout(visualChanges, 3500);
    setTimeout(nextQuestion, 3500);

}



var contLikeLettersLength = 2;

function updateLayout(letters) {

    for (var i = 0; i < letters.length; i++) {

        var offsetAngle = 360 / contLikeLettersLength;
        var rotateAngle = offsetAngle * i;

        letters[i].style.transition = "all 4s"
        letters[i].style.transform = "rotate(" + rotateAngle + "deg) translate(0, -190px) rotate(-" + rotateAngle + "deg)";
    };
    contLikeLettersLength++;

};


function orderRanking(importedRank) {
    importedRank.sort(function(a, b) {
        return b.points - a.points;
    })
}


function printRanking() {
    intro.style.transform = "rotateY(180deg)"
    
    var importedRank = JSON.parse(window.localStorage.getItem('users'));


    orderRanking(importedRank)
    var txt1 = '';
    var txt2= '';

    if(importedRank.length > 10){
        importedRank = importedRank.slice(0,10)

        for (var player of importedRank) {
       
            txt1 += '<li class = "rank">'+ player.name +'</li>';
            txt2 += '<li class = "rank">' + player.points + '</li>';        
        } 

    }else{
        for (var player of importedRank) {
       
            txt1 += '<li class = "rank">'+ player.name +'</li>';
            txt2 += '<li class = "rank">' + player.points + '</li>';        
        }
    }
   
    listName.innerHTML = txt1
    listPoints.innerHTML =txt2
}


var contLaps = 0;
var arrPasapalabras = [];
var i = 0;

function ended() {
    obj.points = correctAnswers;
    ranking.push(obj);
    
    window.localStorage.setItem('users', JSON.stringify(ranking));
    
    checkAnswrBtn.style.animation = "fadeOut 4s"
    pasapalabraBtn.style.animation = "fadeOut 4s"
    userAnswer.style.animation = "fadeOut 4s"
    exitBtn.style.animation = "fadeOut 4s"
    timerCont.style.animation = "fadeOut 4s"
   
    questionInHtml.innerHTML = "Finalizado!<br>Preguntas acertadas: " + correctAnswers + " <br>Preguntas Falladas: " + failedAnswers + "";
    setTimeout(endGame(), 3500)
}

function nextQuestion() {
    random = randomizer();

    if (questions[0].every(question => question.status != 0) === true) {

        ended();
        
    }else{
        if(contOfQuestions === questions[0].length){
            contOfQuestions = 0;
            contLaps = 1;
        }
       
        while(questions[random][contOfQuestions].status != 0){
            contOfQuestions++
            if(contOfQuestions === questions[0].length){
                contOfQuestions = 0;
                i = 0;
            }
        }
    
        if(contLaps === 0){
            question = questions[random][contOfQuestions].question;
            questionInHtml.innerText = question;
            
        }else if(contLaps === 1){
            question = questions[arrPasapalabras[i]][contOfQuestions].question;
            questionInHtml.innerText = question;
            i++;
        }
    }

}

function randomizer() {
    var random = Math.floor(Math.random() * 2);
    return random;
}

function checkAnswer() {

    userAnswerValue = userAnswer.value;

    if (userAnswerValue === questions[random][contOfQuestions].answer) {
        correctAnswers++;
        letters[contOfQuestions].style.backgroundImage = "linear-gradient(135deg, rgb(185, 255, 171), rgb(34, 204, 0))";
        questions[0][contOfQuestions].status = 1;
        questions[1][contOfQuestions].status = 1;
        contOfQuestions++;
        userAnswer.value = "";
        nextQuestion();
    } else if (userAnswerValue != questions[random][contOfQuestions]) {
        failedAnswers++;
        letters[contOfQuestions].style.backgroundImage = "linear-gradient(135deg, rgb(255, 110, 110), rgb(255, 0, 0))";
        questions[0][contOfQuestions].status = -1;
        questions[1][contOfQuestions].status = -1;
        contOfQuestions++;
        userAnswer.value = "";
        nextQuestion();
    }


}

//status 0 are selected 
function pasapalabra() {
    
    arrPasapalabras.push(random);
    contOfQuestions++
    nextQuestion();
}

function endGame() {

    homePage.style.animation = "fadeIn 2s"
    homePage.style.visibility = "visible"
    checkAnswrBtn.style.visibility = "hidden";
    pasapalabraBtn.style.visibility = "hidden";
    userAnswer.style.visibility = "hidden";
    exitBtn.style.visibility = "hidden";
    timerCont.style.visibility = "hidden";

}
function quitGame() {
    window.location.reload();
}



function runTimer() {
    var timeleft = 120;

    
    var downloadTimer = setInterval(function() {
        var time = document.getElementById('timer');
        time.innerHTML = timeleft;
        timeleft -= 1;

        if (timeleft < -1) {
            clearInterval(downloadTimer);
            time.innerHTML = "0";
            setTimeout(ended(),2000)
        }
     
    }, 1000);


}