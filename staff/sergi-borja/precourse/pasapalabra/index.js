function pasapalabra() {

var questions = [
    { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
    { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
    { letter: "c", answer: "criatura", status: 0, question: "CON LA C. Niño, crío, bebé" },
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
];


do {
    var nombre = prompt('Indica tu nombre de jugador, por favor:');
} while (!isNaN(nombre) || nombre == '');
alert('Hola ' + nombre + '. Bienvenido a Skylab Pasapalabra!');
alert('INSTRUCCIONES:\n1. Si te sabes la respuesta, escribela.\n2. Si quieres pasar palabra, escribe "pasapalabra".\n3. Si quieres salir del juego, escribe "salir" y pulsa "Aceptar".\nQue lo disfrutes!!!');



for (var i = 0; i < questions.length; i++) {
    console.log(questions[i].question);
    do {
        var respuesta = prompt('Si te la sabes escribe, si no la sabes, "pasapalabra" y si quieres acabar el juego escribe "salir"');
    } while (!isNaN(respuesta) || respuesta == '' || respuesta == null);
    respuesta = respuesta.toLowerCase();
    if (respuesta == questions[i].answer) {
        console.log('Tu respuesta ha sido: ' + respuesta.toUpperCase());
        questions[i].status = 1;
        console.log('Respuesta Correcta!!');
        alert('Muy bien! Has obtenido 1 punto!!!');
    } else if (respuesta == 'pasapalabra') {
        console.log('Tu respuesta ha sido: ' + respuesta.toUpperCase());
        questions[i].status = 'pasao';
    } else if (respuesta == 'salir') {
        alert('ADIOOS!!');
        i = 27;
    } else {
        console.log('Tu respuesta ha sido: ' + respuesta.toUpperCase());
        alert('Respuesta Incorrecta!!')
        console.log('La respuesta correcta era: ' + questions[i].answer);
    }
}



function check() {
    do {
        var intentos = 1;
        intentos++;
        var acc = 0;
        for (var i = 0; i < questions.length; i++) {
            if (questions[i].status == 'pasao') {
                console.log(questions[i].question);
                var newanswer = prompt(intentos + ' INTENTO, TU PUEDES!!!').toLocaleLowerCase();
                if (newanswer == questions[i].answer) {
                    console.log('Tu respuesta ha sido: ' + newanswer.toUpperCase());
                    questions[i].status = 1;
                    console.log('Respuesta Correcta!!');
                    alert('Muy bien! Has obtenido 1 punto!!!');
                } else if (newanswer == 'pasapalabra') {
                    acc++;
                    console.log('Tu respuesta ha sido: ' + newanswer.toUpperCase());
                    questions[i].status = 'pasao';
                } else if (newanswer == 'salir') {
                    alert('ADIOOS!!');
                    i = 27;
                } else {
                    questions[i].status = 0;
                    console.log('Tu respuesta ha sido: ' + newanswer.toUpperCase());
                    alert('Respuesta Incorrecta!!')
                    console.log('La respuesta correcta era: ' + questions[i].answer);
                }
            }
        }
    } while (acc != 0);
}


var userPoints = 0;
var fails = 0;
function resultados() {
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].status == 1) {
            userPoints++;
        } else if (questions[i].status == 0) {
            fails++;
        }
    }
    alert('Tus resultados:\nHas acertado un total de ' + userPoints + ' preguntas.');
}


if (respuesta != 'salir') {
    check();
}
resultados();
if (respuesta != 'salir') {
    var ranking = [{ name: 'Pedro', points: 19 }, { name: 'Martin', points: 13 }, { name: 'Nico', points: 10 }, { name: 'Lionel', points: 8 }, { name: 'Xavi', points: 5 }, { name: 'Cristina', points: 4 }, { name: 'Eustakio', points: 2 }];
    ranking.push({ name: nombre, points: userPoints });
    ranking.sort((a, b) => b.points - a.points);
    var posicion = 0;
    console.log('\nRANKING:')
    for (var z = 0; z < ranking.length; z++) {
        posicion++;
        console.log(posicion + '. ' + ranking[z].name + ' con un TOTAL de ' + ranking[z].points + ' puntos');
    }
}


}


do {
pasapalabra();
var again = confirm('Quieres volver a jugar?');
} while (again);