// === JUEGO PASAPALABRA ===


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
    { letter: "k", answer: ["kamikaze", 'kola', 'aizkorri'], status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria", 'CON LA K. Península que forma parte de la Europa del Norte', 'CON LA K. Contiene la K Sierra que destaca en los Montes Vascos'] },
    { letter: "l", answer: ["licantropo", 'latitud', 'longitud'], status: 0, question: ["CON LA L. Hombre lobo", 'CON LA L. Mide en grados hacia el norte o el sur', 'CON LA L.Mide en grados hacia el este o el oeste'] },
    { letter: "m", answer: ["misantropo", 'meridianos', 'megalitos'], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", 'CON LA M. Circunferencias imaginarias que pasan por los Polos', 'CON LA M. Grandes monumentos de piedra que se utilizaban como tumbas en el Neolítico'] },
    { letter: "n", answer: ["necedad", 'neptuno', 'nobleza'], status: 0, question: ["CON LA N. Demostración de poca inteligencia", 'CON LA N. Planeta alejado del sol ', 'CON LA N. Grupo social privilegiado en la Edad Media'] },
    { letter: "ñ", answer: ["señal", 'montañas', 'miño'], status: 0, question: ["CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", 'CONTIENE LA Ñ. Grandes elevaciones de tierra', 'CONTIENE LA Ñ. Rio gallego'] },
    { letter: "o", answer: ["orco", 'odiel', 'ozono'], status: 0, question: ["CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", 'CON LA O. Rio andaluz', 'CON LA O. Capa terrestre que protege a los seres vivos de las radiaciones solares'] },
    { letter: "p", answer: ["protoss", 'paralelos', 'paleolitico'], status: 0, question: ["CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", 'CON LA P. Circunferencias imaginarias paralelas al Ecuador', 'CON LA P. Etapa de la Prehistoria que comenzó con la aparición del ser humano y terminó con la invención de la agricultura'] },
    { letter: "q", answer: ["queso", 'queijigo', 'trueque'], status: 0, question: ["CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", 'CON LA Q. En las zonas de clima de montaña encontramos este árbol', 'CONTIENE LA Q. Intercambio de unos productos por otros sin utilizar monedas'] },
    { letter: "r", answer: ["raton", 'rodano', 'rueda'], status: 0, question: ["CON LA R. Roedor", 'CON LA R. Rio de la vertiente mediterránea europea', 'CON LA R. Mayor avanze tecnológico de la história'] },
    { letter: "s", answer: ["stackoverflow", 'secundario', 'surrealismo'], status: 0, question: ["CON LA S. Comunidad salvadora de todo desarrollador informático", 'CON LA S. Sector formado por personas que transforman las materias primas en productos', 'CON LA S. Estilo artístico en el que destacó Dalí'] },
    { letter: "t", answer: ["terminator", 'terremoto', 'troposfera'], status: 0, question: ["CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", 'CON LA T. Seísmo o temblor de tierra', 'CON LA T. Capa más cercana a la superficie terrestre'] },
    { letter: "u", answer: ["unamuno", 'ulla', 'urano'], status: 0, question: ["CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", 'CON LA U. Rio gallego', 'CON LA U. laneta alejado del sol'] },
    { letter: "v", answer: ["vikingos", 'volcan', 'velazquez'], status: 0, question: ["CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", 'CON LA V. Expulsa lava y gases del interior de la tierra', 'CON LA V. Destacado pintor español'] },
    { letter: "w", answer: ["sandwich", 'workshop', 'watt'], status: 0, question: ["CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", 'CON LA W. El término inglés se traduce en español como seminario, reunión de trabajo, curso o taller', 'CON LA W. Unidad de potencia del Sistema Internacional, que equivale a la potencia capaz de conseguir una producción de energía igual a 1 julio por segundo'] },
    { letter: "x", answer: ["botox", 'textil', 'exilio'], status: 0, question: ["CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", 'CONTIENE LA X. En Málaga, Cádiz y Sevilla destacó en el s.XIX este tipo de industria', 'CONTIENE LA X. Persona que abandona su pais por motivos políticos'] },
    { letter: "y", answer: ["peyote", 'plebeyo', 'ayllon'], status: 0, question: ["CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", 'CONTIENE LA Y. Grupo social perteneciente a la sociedad romana', 'CONTIENE LA Y. Sierra que se encuentra en el Sistema Central'] },
    { letter: "z", answer: ["zen", 'zujar', 'zoco'], status: 0, question: ["CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", 'CON LA Z. Afluente del rio Guadiana', 'CONTIENE LA Z. Mercadillo tradicional de los árabes'] },
]


var listRanking = [];
var name;
var end = false;
var rond = 0;
var rightWords = 0;
var failWords = 0;
var allWords = 0;
var rond = 0;
var question;

// RUN
pasapalabraGame()


// Function pasapalavra Game
function pasapalabraGame() {
    do {
        var play = prompt('Quieres Jugar al Pasapalavra?Yes/No').toLowerCase();
        if (play === 'yes') {
            welcome();
            question = Math.floor(Math.random() * 3);
            playGame();
        }
    } while (play !== 'no')
    alert('Gracias!')

}

//***************************
//**** FUNCTIONS ************
//***************************

//Function Welcome to save the name
function welcome() {
    do {
        name = prompt('Bienvenido al pasapalabra!\nDispone de 27 preguntas para responder!\nSi ha acertado o fallado el programa se lo dirá!\nPara pasar de palabra escriba "pasapalabra"!\nPara terminar el programa en cualquier momento escriba"END"!\nPor favor introduce tu nombre para empezar a jugar!');
    } while (name === '')

    alert('Bienvenido ' + name + '!');
}

//Function for play the game
function playGame() {
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].status === 0 && end === false) {
            var response = prompt(questions[i].question[question] + '\nIntroduce tu respuesta!').toLowerCase();
            if (response === questions[i].answer[question]) {
                alert('Respuesta Correcta!')
                questions[i].status = 1;
                rightWords++;
                rond++;
                allWords++
            } else if (response === 'pasapalabra') {
                questions[i].status = 0;
                rond++;
            } else if (response === 'end') {
                var confirmation = confirm('Seguro que quieres terminar el Juego?');
                if (confirmation) {
                    end = true;
                }
                break;
            } else {
                alert('Respuesta Incorrecta!\nLa respuesta correcta es:\n ' + questions[i].answer[question].toUpperCase() + '!')
                questions[i].status = 1;
                failWords++;
                rond++;
                allWords++
            }
        }
    }
    endGame()
};

// Function for finish the game
function endGame() {

    // PARAR CUANDO EL QUESTIONS[i].status !==0
    if (allWords === 27 && end === false) {
        alert('El juego ha terminado ' + name + ' !\nTiene un total de: ' + rightWords + ' aciertos!\nTiene un total de: ' + failWords + ' fallos!\nTiene un total de: ' + rond + ' rondas!');

        listRanking.push(generateRanking(name, rightWords));
        orderRanking();

        var text = '***** RANKING DE JUGADORES *****'
        for (var i = 0; i < listRanking.length; i++) {
            text += '\n- ' + listRanking[i].name + ' -------- ' + listRanking[i].rightWords + ' palabras correctas!'
        }

        alert(text);
        resetValues();
    } else if (end) {
        alert('El juego ha terminado ' + name + ' !\nTiene un total de: ' + rightWords + ' aciertos!\nTiene un total de: ' + failWords + ' fallos!\nTiene un total de: ' + rond + ' rondas!');
        resetValues();
    } else {
        playGame();
    }

}

//Function for put the original values
function resetValues() {
    for (var i = 0; i < questions.length; i++) {
        questions[i].status = 0;
    };
    name;
    end = false;
    rond = 0;
    rightWords = 0;
    failWords = 0;
    allWords = 0;
    rond = 0;
}


// Function to generate ranking
function generateRanking(name, rightWords) {
    return {
        name: name,
        rightWords: rightWords
    }
}
// Function to order number of points
function orderRanking() {
    listRanking.sort(function(a, b) {
        return b.rightWords - a.rightWords;
    })
}