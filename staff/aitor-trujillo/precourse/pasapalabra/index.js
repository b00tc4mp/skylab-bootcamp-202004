// PASAPALABRA TROLL MODE

// VARIABLES

var questionsTroll = [
    { letter: "a", answer: "amor", status: 0, announce: '-- CON LA A --',
    question: "Sentimiento de locura temporal curable con el matrimonio."},
    { letter: "b", answer: "bohemio", status: 0, announce: '-- CON LA B --',
    question: "Persona rara con pantalones cagados interesada en todo tipo de arte."},
    { letter: "c", answer: "cafe", status: 0, announce: '-- CON LA C --',
    question: "De zombi a humano por la mañana si lo tomas."},
    { letter: "d", answer: "dentista", status: 0, announce: '-- CON LA D --',
    question: "Igual que tus padres, pero el critica tus dientes en vez de tu estilo de vida."},
    { letter: "e", answer: "ebrio", status: 0, announce: '-- CON LA E --',
    question: "Estado en el que caminas regular y le hablas a las farolas."},
    { letter: "f", answer: "farol", status: 0, announce: '-- CON LA F --',
    question: "Lo que te marcas cuando tienes una pareja de treses."},
    { letter: "g", answer: "gintonic", status: 0, announce: '-- CON LA G --',
    question: "El cubata de los pijos."},
    { letter: "h", answer: "hospital", status: 0, announce: '-- CON LA H --',
    question: "Sitio donde despiertas justo después de decir 'Aguantame la cerveza y mira esto...'"},
    { letter: "i", answer: "instagram", status: 0, announce: '-- CON LA I --',
    question: "La droga en forma de app más consumida."},
    { letter: "j", answer: "junior", status: 0, announce: '-- CON LA J --',
    question: "Developers de Skylab sin experiencia."},
    { letter: "k", answer: "kamikaze", status: 0, announce: '-- CON LA K --',
    question: "Palabra japonesa que define al paracaidista que salta antes del 3."},
    { letter: "l", answer: "lavabo", status: 0, announce: '-- CON LA L --',
    question: "Lugar donde está el trono de la casa."},
    { letter: "m", answer: "mañana", status: 0, announce: '-- CON LA M --',
    question: "El mejor momento para hacer lo que tienes programado para hoy."},
    { letter: "n", answer: "netflix", status: 0, announce: '-- CON LA N --',
    question: "Donde ves una peli si no tienes dinero para ir al cine."},
    { letter: "ñ", answer: "niño", status: 0, announce: '-- CONTIENE LA Ñ --',
    question: "Mini-humano que hace ruido porque sí y ensucia todo lo que toca."},
    { letter: "o", answer: "optimista", status: 0, announce: '-- CON LA O --',
    question: "Un futuro pesimista, pero aun sin experiencia."},
    { letter: "p", answer: "programador", status: 0, announce: '-- CON LA P --',
    question: "Organismo que convierte cafeína en código."},
    { letter: "q", answer: "Quijote", status: 0, announce: '-- CON LA Q --',
    question: "En un lugar de la Mancha cuyo nombre no quiero acordarme..."},
    { letter: "r", answer: "risa", status: 0, announce: '-- CON LA R --',
    question: "Lo que te da cuando alguien te dice que no puedes hacer algo."},
    { letter: "s", answer: "secreto", status: 0, announce: '-- CON LA S --',
    question: "Lo que le dices a todo el mundo que no se lo explique a nadie."},
    { letter: "t", answer: "true", status: 0, announce: '-- CON LA T --',
    question: "{!false}"},
    { letter: "u", answer: "uranio", status: 0, announce: '-- CON LA U --',
    question: "Material radioactivo que hace que tú cargues el movil."},
    { letter: "v", answer: "vegetariano", status: 0, announce: '-- CON LA V --',
    question: "En la prehistoria se llamaba 'Mal cazador'"},
    { letter: "w", answer: "wasabi", status: 0, announce: '-- CON LA W --',
    question: "Lo que te das cuenta tarde que no es crema de pistacho en el japo."},
    { letter: "x", answer: "sexo", status: 0, announce: '-- CONTIENE LA X --',
    question: "Momento del origen de tu existencia."},
    { letter: "y", answer: "yoga", status: 0, announce: '-- CON LA Y --',
    question: "Actividad india en la que los chicos se ponen detrás del todo."},
    { letter: "z", answer: "zombie", status: 0, announce: '-- CON LA Z --',
    question: "Ex-humano que quiere comerte la cabeza."},
];

var points = 0;

var lettersCount = 0;

var totalRounds = 1;

var player = prompt('Crea un nombre de jugador.')

var rankingPlayers = [
    {
        name: 'Gandalf',
        points: 26
    },
    {
        name: 'Arya Stark',
        points: 19
    },
    {
        name: 'Forrest Gump',
        points: 2
    }
];

var endGame;


// PROGRAMA

start(); // pasapalabra() inside

// FUNCIONES

function start() {
    var ask = prompt('Escribe START para jugar')
    var game = ask.toLowerCase();
    if (game == 'start') {
        pasapalabra();
    } else {
        console.log('Hasta pronto ' + player + ' :(')
    }
}


function askLetter(index){
    console.log(questionsTroll[index].announce)
    console.log(questionsTroll[index].question)
    var ask = prompt('Introduce aquí tu respuesta o pasapalabra! (END para finalizar)')
    var playerSays = ask.toLowerCase();
    if (playerSays === questionsTroll[index].answer){
        points++;
        console.log(`***** Correcto! Llevas ${points} puntos. *****`);
        questionsTroll[index].status = 1; 
        lettersCount++;
    } else if (playerSays === 'pasapalabra'){
        console.log('***** Pasamos palabra. *****')
    } else if (playerSays == 'end'){
        endGame = true;
        alert('Finalizas el juego con ' + points + ' Puntos!')
        alert('Gracias por jugar SKYLAB PASAPALABRA!')
        pasapalabra();
    } else {
        console.log('***** Respuesta incorrecta... *****')
        questionsTroll[index].status = 1;
        lettersCount++;
    }
}

function pasapalabra(){
    console.log('Bienvenido a PASAPALABRA ' + player)

    while (lettersCount <= 27 || totalRounds < 5){
        // Si el usuario introduce 'end', por recursividad llega
        // a este condicional y termina el juego.
        if (endGame == true){
            rankingSort();
            showRanking();
            break;
        }

        for (var i = 0; i < questionsTroll.length; i++){
            if (!questionsTroll[i].status){
                askLetter(i)
            }
        }
        // Límite de 5 rondas
        if (lettersCount == 27){
            alert('Has terminado el rosco con ' + points + ' Puntos!')
            rankingPlayers.push({
                name: player,
                points: points
            })
            rankingSort();
            showRanking();
            restartGame();
            break;
        } else if (totalRounds == 5){
            alert('Has alcanzado el límite de rondas con ' + points + ' Puntos.')
            rankingPlayers.push({
                name: player,
                points: points
            })
            rankingSort();
            showRanking();
            restartGame();
            break;
        } else {
            totalRounds++
            console.log(`Entramos en la ronda ${totalRounds}`)
        }
    }
}

// FUNCIONES PRO

function showRanking(){
    console.log('***** PLAYER RANKING *****')
    for (var i = 0; i < rankingPlayers.length; i++){
        console.log(
            (i+1) + ' - ' + rankingPlayers[i].name +
            ' con ' + rankingPlayers[i].points + ' puntos.'
        )
    }
}

function rankingSort(){
    rankingPlayers.sort((a, b) => {
            if (a.points > b.points) {
                return -1
            } else {
                return 1
            }
        }
    )
}

function restartGame(){
    var answer = confirm(
        '¿Deseas volver a jugar?'
    )
    if (answer){
        // Resetear Pasapalabra
        resetStatus();
        points = 0;
        lettersCount = 0;
        totalRounds = 1;
        pasapalabra();
    } else {
        alert('Gracias por jugar SKYLAB PASAPALABRA!')
    }
}

function resetStatus(){
    for (var i = 0; i < questionsTroll.length; i++){
        questionsTroll[i].status = 0;
    }
}