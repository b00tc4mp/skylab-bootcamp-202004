function random () {
    rand = Math.floor(Math.random() * 10);
    if (rand < 5) {
        return 0;
    }
    else {
        return 1;
    }
}
function clear (quest) {
    for (var i in quest) {
        quest[i].status = 0;
    }
}
function askQuestion (quest, i) { // comprueba la respuesta dada
    var quest = quest;
    var respuesta = prompt(quest[i].question + '?');
    if (respuesta.toLowerCase() === quest[i].answer) {
         return 1; 
    }
    else if (respuesta.toLowerCase() === 'pasapalabra') {
        return  3; 
    }
    else if (respuesta === 'END') {
        return 4;
    }
    else {
        return  2; 
    }
}
function test (quest, ans, i, pnts){ // cambia la variable estatud en questions segun ans
    var ans = ans;
    var quest = quest;
    switch(ans) {
        case 1:
            quest[i].status = 1;
            console.log('Correcto: tienes ' + pnts + ' puntos');
            break;
        case 2:
            quest[i].status = 2;
            console.log('Nooo!');
            break;
        case 3:
            quest[i].status = 3;
            console.log('Pasapalabra');
            break;
    }
    return quest
}
function pnts (pnts, answ) { //suma los puntos
    var pnts = pnts;
    if (answ === 1) {
        pnts++;
    }
    return pnts;
}
function passedTest (quest, i) { //segunda ronda para palabras pasadas
    quest = quest;
    if (quest[i].status === 3) {
        do{
            var answ = prompt(quest[i].question + '?');
            if (answ.toLowerCase() === quest[i].answer) {
                return 1;
            }
            else if (answ.toLowerCase() === 'pasapalabra'){
                console.log('Error: ya no puedes pasasar palabra!');
            }
            else if (answ === 'END') {
                return 4;
            }
            else{
                return 2;
            }
        }while(answ.toLowerCase() === 'pasapalabra');
    }
}
function contWords (quest, memPlay, pnts, anwr, name) { //imprime las letras acertadas y gurarda el usuario y sus puntos
    var memPlay = memPlay;
    var newPlayer = (name, points) => {
        return {
            name: name,
            points: points
        }
    }
    console.log('Has acertado las letras:')
    for (var i in quest) {
        if (quest[i].status === 1) {
            console.log (quest[i].letter);
        }
        else{
        }
    }
    if (anwr != 4) {
        memPlay.push(newPlayer(name, pnts));
        return memPlay;
    }

}
function sortPoints (memPlay) { //ordena e imprime el raning de puntos
    var number = memPlay;
    if (number.length > 1){
        number.sort(function(a, b){return b.points - a.points});
    }
    for (var i in number) {
        console.log (number[i].name + ': ' + number[i].points);
    }
}
var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien"},
    { letter: "a", answer: "arma", status: 0, question: "CON LA A. Instrumento o máquina que sirve para atacar o defenderse."},
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso"},
    { letter: "b", answer: "bañarse", status: 0, question: "CON LA B. Entrar en el agua para lavarse, para nadar o jugar"},
    { letter: "c", answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé"},
    { letter: "c", answer: "cazadora", status: 0, question: "CON LA C. Ropa de abrigo que cubre desde los hombros a la cintura"},
    { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida"},
    { letter: "d", answer: "débil", status: 0, question: "CON LA D. Que tiene poca fuerza, poco vigor o poca resistencia"},
    { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación"},
    { letter: "e", answer: "edificio", status: 0, question: "CON LA E. Lugar que se usa para viviendas, oficinas, colegios, etc"},
    { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad"},
    { letter: "f", answer: "futuro", status: 0, question: "CON LA F. Tiempo que viene después"},
    { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas"},
    { letter: "g", answer: "grua", status: 0, question: "CON LA G. Máquina para levantar objetos pesados y moverlos de un lugar a otro"},
    { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento"},
    { letter: "h", answer: "hundir", status: 0, question: "CON LA H. Ir abajo dentro del agua"},
    { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano"},
    { letter: "i", answer: "isla", status: 0, question: "CON LA I. Territorio que está rodeado de agua por todas partes"},
    { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba"},
    { letter: "j", answer: "jugador", status: 0, question: "CON LA J. Persona que juega"},
    { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria"},
    { letter: "k", answer: "kilo", status: 0, question: "CON LA K. Medida para pesar (equivale a mil gramos)"},
    { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo"},
    { letter: "l", answer: "lata", status: 0, question: "CON LA L. Envase de metal"},
    { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas"},
    { letter: "m", answer: "manzana", status: 0, question: "CON LA M. Fruta de piel fina, amarilla, verde o roja, de carne blanca y dura"},
    { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia"},
    { letter: "n", answer: "nunca", status: 0, question: "CON LA N. Ningún día o en ningún tiempo"},
    { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
    { letter: "ñ", answer: "patraña", status: 0, question: "CONTIENE LA Ñ. Mentira o noticia fabulosa, de pura invencion"},
    { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien"},
    { letter: "o", answer: "oveja", status: 0, question: "CON LA O. Animal doméstico que tiene el cuerpo cubierto de lana"},
    { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft"},
    { letter: "p", answer: "pasear", status: 0, question: "CON LA P. Andar por placer o para hacer ejercicio"},
    { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche"},
    { letter: "q", answer: "queja", status: 0, question: "CON LA Q. relativo o sinimo de quejido"},
    { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor"},
    { letter: "r", answer: "resumen", status: 0, question: "CON LA R. Pocas palabras que  cuentan una historia más larga"},
    { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático"},
    { letter: "s", answer: "sandalia", status: 0, question: "CON LA S. Calzado que no tapa todo el pie"},
    { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984"},
    { letter: "t", answer: "techo", status: 0, question: "CON LA T. Parte de una habitación que está arriba"},
    { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914"},
    { letter: "u", answer: "urgente", status: 0, question: "CON LA U. Que no puede esperar"},
    { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa"},
    { letter: "v", answer: "veloz", status: 0, question: "CON LA V. Que es muy rápido"},
    { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
    { letter: "w", answer: "windsurf", status: 0, question: "CON LA W.  Deporte que se practica en el mar, de pie sobre una tabla alargada que lleva una vela triangular"},
    { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética"},
    { letter: "x", answer: "xenoofobo", status: 0, question: "CON LA X. No debemos ser con respecto a otros de diferente raza o condicion"},
    { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
    { letter: "y", answer: "yegua", status: 0, question: "CON LA Y. Hembra del caballo"},
    { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
    { letter: "z", answer: "zarpar", status: 0, question: "CON LA Z. Empezar a navegar"},
]

// ======= Inicio del programa =======
var memoryPlayers = [];
var answer;
do {
    var points = 0;
    var playerName = prompt('Nombre de Usuario:');
    for (var i = 0; i < questions.length; i += 2) { 
        var iQuest = i + random();
        answer = askQuestion (questions, iQuest);
        if (answer != 4) {
            points = pnts (points, answer);
            questions =  test (questions, answer, iQuest, points);
        }
        else{
            break;
        }
    }
    if (answer != 4) { //segunda ronda (pasapalabras)
        console.log('segunda ronda: ');
        for (var g in questions) {
            answer = passedTest (questions, g);
            if (answer != 4) {
                points = pnts (points, answer);
                questions =  test (questions, answer, g, points);
            }
            else{
                break;
            }  
        }
    }
    memoryPlayers = contWords (questions, memoryPlayers, points, answer, playerName);
    sortPoints(memoryPlayers);
    contPlay = confirm('quieres seguir jugando?');
    clear(questions); //restablecemos questions por si se hace otra partida
}while ((contPlay === true) && (!(answer === 4)));
console.log ('Hasta la proxima !!!');


