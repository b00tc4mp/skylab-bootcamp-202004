const pasapalabra = [
    { id: "A", status: 0, question: "Con la A, región Pokémon basada en Hawái", answer: "alola" },
    { id: "B", status: 0, question: "Con la B, te permite viajar más rápido de una ciudad a otra en los videojuegos de la saga", answer: "bicicleta" },
    { id: "C", status: 0, question: "Con la C, Pokémon que da el parte meteorológico", answer: "castform" },
    { id: "D", status: 0, question: "Con la D, ataque Pokémon que salvaría el mes a más de uno", answer: "día de pago" },
    { id: "E", status: 0, question: "Con la E, profesión frustrada de Jessie, del Team Rocket", answer: "enfermera" },
    { id: "F", status: 0, question: "Con la F, es el patito feo de los Pokémon", answer: "feebas" },
    { id: "G", status: 0, question: "Con la G, nombre de la descartada evolución final de Pikachu", answer: "gorochu" },
    { id: "H", status: 0, question: "Con la H, tipo de Pokémon que llegó con la sexta generación", answer: "hada" },
    { id: "I", status: 0, question: "Con la I, Pokémon inicial de tipo fuego y lucha", answer: "infernape" },
    { id: "J", status: 0, question: "Con la J, Pokémon al que se le cambió el color para evitar acusaciones de racismo", answer: "jynx" },
    { id: "K", status: 0, question: "Con la K, Pokémon canguro", answer: "kangaskhan" },
    { id: "L", status: 0, question: "Con la L, tipo de Poké Ball que te permite subir amistad con el Pokémon atrapado", answer: "lujo ball" },
    { id: "M", status: 0, question: "Con la M, Pokémon glitch", answer: "missingNo" },
    { id: "N", status: 0, question: "Con la N, son los únicos Pokémon que tienen género masculino y femenino en los primeros videojuegos", answer: "nidoran" },
    { id: "Ñ", status: 0, question: "Contiene la Ñ, Aura siempre lleva uno atado a la cabeza", answer: "pañuelo" },
    { id: "O", status: 0, question: "Con la O, número de evoluciones de Eevee", answer: "ocho" },
    { id: "P", status: 0, question: "Con la P, iba a ser el Pokémon charlatán por excelencia, puesto que al final se llevó Meowth", answer: "pikachu" },
    { id: "Q", status: 0, question: "Con la Q, Pokémon pez globo", answer: "qwilfish" },
    { id: "R", status: 0, question: "Con la R, nombre del protagonista de los videojuegos de Pokémon", answer: "red" },
    { id: "S", status: 0, question: "Con la S, nombre del creador de Pokémon", answer: "satoshi" },
    { id: "T", status: 0, question: "Con la T, Pokémon que no acaba de salir del cascarón", answer: "togepi" },
    { id: "U", status: 0, question: "Con la U, forma parte del trío de lago", answer: "uxie" },
    { id: "V", status: 0, question: "Con la V, número de formas diferentes de Unown", answer: "veintiocho" },
    { id: "W", status: 0, question: "Con la W, ruidoso Pokémon que puedes encontrar en el Túnel Fervergal", answer: "whismur" },
    { id: "X", status: 0, question: "Con la X, Pokémon ciervo legendario", answer: "xerneas" },
    { id: "Y", status: 0, question: "Con la Y, antes era humano", answer: "yamask" },
    { id: "Z", status: 0, question: "Con la Z, Pokémon multiforme inspirado en la mitología nórdica", answer: "zygarde" },
];

const ranking = []

function playPasapalabra() {
    function player() {
        let name = prompt("¿Cómo se llama?");
        if (!name) {
            alert("Introduzca su nombre");
            name = player();
        }
        return name
    }
    let name = player();

    function game(palabra){
        if (palabra.status !== "Correcto" && palabra.status !== "Incorrecto") {
            let userAnswer = prompt(palabra.question)

            if (palabra.answer === userAnswer) {
                palabra.status = "Correcto"
                alert("Correcto")
            }
            else if ("pasapalabra" === userAnswer) {
                palabra.status = "Pasapalabra"
                alert("Pasapalabra")
            }
            else {
                palabra.status = "Incorrecto"
                alert("Incorrecto")
            }
        }
    }

    function iterate() {
        do {
            pasapalabra.forEach(palabra => game(palabra));
         } while (!pasapalabra.every(palabra => palabra.status !== "Pasapalabra"));
    }
    iterate();

    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (let i = 0; i < pasapalabra.length; i++) {
        if (pasapalabra[i].status === "Correcto") {
            correctAnswers++
        }
        if (pasapalabra[i].status === "Incorrecto") {
            wrongAnswers++
        }
    };

    console.log("Has acertado un total de " + correctAnswers + " preguntas.");
    console.log("Has fallado un total de " + wrongAnswers + " preguntas.");

    ranking.push({ name: name, correct: correctAnswers });

    function printRanking(name, correct){
        console.log("El jugador " + name + " ha tenido una puntuación de " + correct + ".")
    }

    ranking.sort(function(a, b) {
        let comparison = 0;
        if (a.correct > b.correct) {
            comparison = 1
        } else if (a.correct < b.correct) {
            comparison = -1
        }
        return comparison * -1
    });

    ranking.forEach(rank => printRanking(rank.name, rank.correct));
}

let playAgain;
do {
    for (let i = 0; i < pasapalabra.length; i++) {
        pasapalabra[i].status = 0
    }

    playPasapalabra();
    
    playAgain = confirm("Do you want to play again? ");
} while (playAgain)