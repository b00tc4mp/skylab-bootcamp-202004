

function generateQuestions() {
var questions1 = [
	{letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")},
	{letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")},
	{letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé")},
	{letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")},
	{letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación")},
	{letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad")},
	{letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas")},
	{letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento")},
	{letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano")},
	{letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba")},
	{letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria")},
	{letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo")},
	{letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")},
	{letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia")},
	{letter: "ñ", answer: "señal", status:0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.")},
	{letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien")},
	{letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft")},
	{letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche")},
	{letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor")},
	{letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático")},
	{letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984")},
	{letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914")},
	{letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa")},
	{letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso")},
	{letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética")},
	{letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos")},
	{letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional")},
];

var questions2 = [
{letter: "A", answer: "arma", status: 0, question: ("CON LA A. Instrumento o máquina que sirve para atacar o defenderse")},
{letter: "B", answer: "bañar", status: 0, question: ("CON LA B. Entrar en el agua para lavarse, para nadar o jugar.")},
{letter: "C", answer: "cazadora", status: 0, question: ("CON LA C. Ropa de abrigo que cubre desde los hombros a la cintura.")},
{letter: "D", answer: "débil", status: 0, question: ("CON LA D. Que tiene poca fuerza, poco vigor o poca resistencia.")},
{letter: "E", answer: "edificio", status: 0, question: ("CON LA E. Lugar que se usa para viviendas, oficinas, colegios, etc.")},
{letter: "F", answer: "futuro", status: 0, question: ("CON LA F. Tiempo que viene después.")},
{letter: "G", answer: "grua", status: 0, question: ("CON LA F. Máquina para levantar objetos pesados y moverlos de un lugar a otro.")},
{letter: "H", answer: "hundir", status: 0, question: ("CON LA H. Ir abajo dentro del agua.")},
{letter: "I", answer: "isla", status: 0, question: ("CON LA I. Territorio que está rodeado de agua por todas partes.")},
{letter: "J", answer: "jugador", status: 0, question: ("CON LA J. Persona que juega.")},
{letter: "K", answer: "kilo", status: 0, question: ("CON LA K. Medida para pesar (equivale a mil gramos).")},
{letter: "L", answer: "lata", status: 0, question: ("CON LA L. Envase de metal.")},
{letter: "M", answer: "manzana", status: 0, question: ("CON LA M. Fruta de piel fina, amarilla, verde o roja, de carne blanca y dura.")},
{letter: "N", answer: "nunca", status: 0, question: ("CON LA N. Ningún día o en ningún tiempo.")},
{letter: "O", answer: "oveja", status: 0, question: ("CON LA O. Animal doméstico que tiene el cuerpo cubierto de lana.")},
{letter: "P", answer: "pasear", status: 0, question: ("CON LA P. Andar por placer o para hacer ejercicio.")},
{letter: "Q", answer: "queso", status: 0, question: ("CON LA Q. Alimento sólido preparado con leche.  ")},    
{letter: "R", answer: "resumen", status: 0, question: ("CON LA R. Pocas palabras que  cuentan una historia más larga.")},
{letter: "S", answer: "sandalia", status: 0, question: ("CON LA S. Calzado que no tapa todo el pie.")},
{letter: "T", answer: "techo", status: 0, question: ("CON LA T. Parte de una habitación que está arriba.")},
{letter: "U", answer: "urgente", status: 0, question: ("CON LA U. Que no puede esperar.")},
{letter: "V", answer: "veloz", status: 0, question: ("CON LA V. Que es muy rápido.")},
{letter: "Y", answer: "yegua", status: 0, question: ("CON LA Y. Hembra del caballo.")},
{letter: "Z", answer: "zarpar", status: 0, question: ("CON LA Z. Empezar a navegar. ")},
];
var selector = Math.floor(Math.random() * 2); 

if (selector == 0 ) {
	return questions1;
} else { 
	return questions2;
}
}
var topScores = [
	{player: "MurriCat", points: 26},
	{player: "Maria", points: 20},
	{player: "J.Fox", points: 17},
	{player: "Pitagorin", points: 6},
	{player: "Pepe", points: 3}
];
function sortTop (topScores, player, points) { 
	for (let i = 4; points > topScores[i].points; i--) {
		if (topScores[i-1].points > points) {
		topScores[i].player = player;
		topScores[i].points = points;    
		} else { 
		topScores[i].player = topScores[i-1].player;
		topScores[i].points = topScores[i-1].points;
		}
		
	}
	for (let i = 0; i<5; i++) {
		
		console.log(`${topScores[i].player} : ${topScores[i].points}`);
	}
	return topScores;
}

var number;
var score;
var wrong;
var questions = [];


var endGame = false;
while (endGame == false) {
var playerName = prompt("Insert your name:");

number = 0;
score = 0;
wrong = 0;

questions = generateQuestions();
console.log("Here we go!");

var end = false;
while (end == false) {

    if (questions[number].status == 0) { 
    console.log(questions[number].question);
	var answer = prompt("Answer? /END to Finish/");
	answer = answer.toLowerCase();
	console.log(answer);
    if (answer == "end"){
		break;
	}   
	if (answer == "pasapalabra") {

    } else {
        if (answer == questions[number].answer) {
            questions[number].status = 1;
            score++;
            console.log(`Correct, you have ${score} points.`);
        } else { 
			questions[number].status = 2;
			wrong++;
            console.log(`Incorrect, the answer is ${questions[number].answer}.`);
        }
    } 
    }
    number++;
    
    
    if (number == questions.length) {
        number = 0;
	}
	
    if ((score + wrong) == (questions.length)) {
	end = true; 
    }
} 

console.log("Game finished");
console.log(`Your final score is ${score}`);
console.log("TOP SCORES: ");
topScores = sortTop(topScores, playerName ,score);
var finisher = prompt("Stop playing? Y//N");
finisher = finisher.toLowerCase();

if (finisher == "y" ) {
	endGame = true;
} 
}
