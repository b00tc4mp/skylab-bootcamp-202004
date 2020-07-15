var questions = [
    {
        letter: "a", answer: ["abducir", "abecedario", "acatar"], status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien",
            "CON LA A. Serie ordenada de las letras de un idioma.", "CON LA A. Aceptar con sumisión una autoridad o unas normas legales, una orden, etc."], selection: 0
    },
    {
        letter: "b", answer: ["bingo", "baba", "boligrafo"], status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
            "CON LA B. Saliva espesa y abundante que fluye a veces de la boca", "CON LA B. Instrumento para escribir que tiene un tubo de tinta"], selection: 0
    },
    { letter: "c", answer: ["churumbel", "cutre", "cortina"], status: 0, question: ["CON LA C. Niño, crío, bebé", "CON LA C. De mala calidad", "CON LA C. Tela que cubre ventanas y puertas"], selection: 0 },
    {
        letter: "d", answer: ["diarrea", "durum", "duro"], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
            "CON LA D. Modo de presentar el döner enrollado en un pan plano", "CON LA D. 5 pesetas"], selection: 0
    },
    {
        letter: "e", answer: ["ectoplasma", "electron", "egarense"], status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
            "CON LA E. Partícula elemental con carga eléctrica negativa, que gira alrededor del núcleo del átomo.", "CON LA E. Perteneciente de Terrassa"], selection: 0
    },
    {
        letter: "f", answer: ["facil", "foco", "final"], status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", "CON LA F. Lámpara eléctrica de luz muy potente concentrada en una dirección.",
            "CON LA F. Partido decisivo en la Champions League"], selection: 0
    },
    {
        letter: "g", answer: ["galaxia", "gol", "guitarra"], status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
            "CON LA G. En el futbol meter un balon dentro de una portería", "CON LA G. Instrumento musical de cuerda "], selection: 0
    },
    { letter: "h", answer: ["harakiri", "hobby", "hitachi"], status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", "CON LA H. Actividad o afición por algo", "CON LA H. Empresa Japonesa de electronica de consumo"], selection: 0 },
    { letter: "i", answer: ["iglesia", "iceberg", "imposible"], status: 0, question: ["CON LA I. Templo cristiano", "CON LA I. Gran masa de hielo flotante", "CON LA I. Accion que se antoja inviable de realizar"], selection: 0 },
    {
        letter: "j", answer: ["jabali", "jinete", "jaleo"], status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", "CON LA J. Persona que cabalga",
            "CON LA J. Mucho ruido o alboroto"], selection: 0
    },
    {
        letter: "k", answer: ["kamikaze", "kkk", "kale"], status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria",
            "CON LA K. Siglas de, sociedad secreta estadounidense con un fuerte carácter racista y de xenofobia.",
            "CON LA K. Calle en Euskera"], selection: 0
    },
    {
        letter: "l", answer: ["licantropo", "lily", "lacasitos"], status: 0, question: ["CON LA L. Hombre lobo", "CON LA L. Mujer de Marshall Eriksen en How i met your mother",
            " CON LA L. Lentejas de chocolate con leche recubierta por 150 capas de azúcar de 7 colores diferentes."], selection: 0
    },
    {
        letter: "m", answer: ["misantropo", "messi", "mandamas"], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
            "CON LA M. Maximo ganador del galardon del balon de oro", "CON LA M. Persona que tiene una tendencia exagerada a mandar"], selection: 0
    },
    { letter: "n", answer: ["necedad", "nunca", "nevera"], status: 0, question: ["CON LA N. Demostración de poca inteligencia", "CON LA N. Ninguna vez", "CON LA N. Equipo electronico de consumo situado en la cocina"], selection: 0 },
    {
        letter: "ñ", answer: ["señal", "caña", "araña"], status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
            "CONTIENE LA Ñ. Bebida alcoholica servida en un vaso", "CONTIENE LA Ñ. Animal con 8 patas"], selection: 0
    },
    {
        letter: "o", answer: ["orco", "olivo", "ostentar"], status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
            "CON LA O. Árbol de la familia de las oleáceas", "CON LA O. Fardar, chulear"], selection: 0
    },
    {
        letter: "p", answer: ["protoss", "pedo", "pico"], status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
            "CON LA P. Gas apestoso", "CON LA P. Beso en los labios con otra persona"], selection: 0
    },
    {
        letter: "q", answer: ["queso", "quinoa", "quito"], status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche",
            "CON LA Q. Planta del genero Chenopodium, de la familia de las amarantáceas, cultivada principalmente para su semilla comestible", "CON LA Q. Capital del Ecuador"], selection: 0
    },
    { letter: "r", answer: ["raton", "ruin", "racano"], status: 0, question: ["CON LA R. Roedor", "CON LA R. Bajo y despreciable", "CON LA R. Tacaño "], selection: 0 },
    {
        letter: "s", answer: ["stackoverflow", "simpson", "saco"], status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático",
            "CON LA S. Apellido de familia amarilla americana muy famosa", "CON LA S. Se usa para dormir"], selection: 0
    },
    {
        letter: "t", answer: ["terminator", "turuleca", "trunks"], status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
            "CON LA T. La gallina mas famosa nacida en 1971", "CON LA T. Hijo de Bulma"], selection: 0
    },
    {
        letter: "u", answer: ["unamuno", "umbral", "usado"], status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
            "CON LA U. Valor mínimo de una magnitud a partir del cual se produce un efecto determinado", "CON LA U. Gastado y deslucido"], selection: 0
    },
    {
        letter: "v", answer: ["vikingos", "vegeta", "vino"], status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
            "CON LA V. Personaje de Bola de drac antagonista principal hasta que empieza la saga de Freezer", "CON LA V. Procedente de la uva"], selection: 0
    },
    {
        letter: "w", answer: ["sandwich", "darwin", "firewall"], status: 0, question: ["CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
            "CONTIENE LA W.  Propuso la teoría de la evolución biológica por selección natural", "CONTIENE LA W. Mecanismo de seguridad que impide el acceso a una red."], selection: 0
    },
    {
        letter: "x", answer: ["botox", "clinex", "taximetro"], status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", "CONTIENE LA X. Pañuelo desechable de papel",
            "CONTIENE LA X. Aparato de que van provistos algunos coches de alquiler"], selection: 0
    },
    {
        letter: "y", answer: ["peyote", "ayuno", "cayo"], status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
            "CONTIENE LA Y. Que no ha comido", "CONTIENE LA Y. Isleta casi rasa y poco saliente de la superficie del mar"], selection: 0
    },
    {
        letter: "z", answer: ["zen", "zurito", "zoquete"], status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
            "CON LA Z. Vaso que equivale a medio vaso de cerveza(Euskadi)", "CON LA Z. Pedazo de madera corto y grueso, que queda sobrante al labrar o utilizar un madero"], selection: 0
    },
]
var name;
var answer = "";
var rightWords = 0;
var wordsAnswered = 0;
const ABC = 27;
var users = [];
var play = true;
var questionAnswer;

function wellcome() {
    name = prompt("Cual es tu nombre?");
    name = name.charAt(0).toUpperCase() + name.slice(1);
    alert(name + " bienvenido a Pasapalabra! Comencemos!");
};

while (play == true) {
    wellcome();

    while (wordsAnswered < ABC) {
        for (var i = 0; i < questions.length; i++) {
            answer = "";
            if (questions[i].status == 0 || questions[i].status == 2) {

                if (questions[i].status == 0) {
                    questionAnswer = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                    questions[i].selection = questionAnswer;
                    console.log(questions[i].question[questionAnswer]);
                    answer = prompt("Respuesta:");
                    if (answer != null) {
                        answer = answer.toLowerCase();
                    } else {
                        answer = "end";
                    }
                    console.log(answer);
                } else {
                    console.log(questions[i].question[questions[i].selection]);
                    answer = prompt("Respuesta:");
                    if (answer != null) {
                        answer = answer.toLowerCase();
                    } else {
                        answer = "end";
                    }
                    console.log(answer);
                }

            }
            if (answer == questions[i].answer[questions[i].selection]) {
                console.log("Correcto!");
                questions[i].status = 1;
                rightWords++;
                wordsAnswered++;
            } else if (answer == "pasapalabra") {
                console.log("Seguimos!")
                questions[i].status = 2;
            } else if (answer == "end") {
                console.log("Adios!");
                i = 1000;
                wordsAnswered = 27;

            } else {
                if (questions[i].status == 0 || questions[i].status == 2) {
                    console.log("Ooooh! La respuesta era: ");
                    console.log(questions[i].answer[questions[i].selection]);
                    questions[i].status = -1;
                    wordsAnswered++;
                }
            }
        }
    }
    for (var i = 0; i < questions.length; i++) {
        questions[i].status = 0;
        questions[i].selection = 0;
    }
    alert(name + " has acertado " + rightWords + " palabras y has fallado " + (ABC - rightWords));
    if (answer != "end") {
        users.push({ name: name, rightWords: rightWords });
    };
    users.sort(function (a, b) {
        return (b.rightWords - a.rightWords)
    });
    if (answer != "end") {
        for (var i = 0; i < users.length; i++) {
            if (i == 0) {
                console.log("CLASIFICACION");
            }
            console.log("-" + users[i].name + " " + users[i].rightWords + " puntos");
        }
    };
    play = confirm("Quieres hacer otra partida?");
    wordsAnswered = 0;
    rightWords = 0;
}