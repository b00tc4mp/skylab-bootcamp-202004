window.onload = function () {
    //se define el radio de la circunferencia que situara cada letra del pasapalabra 
    //a lo largo de esta para poder crear el rosco típico del juego
    let radius = 17.5;
    //para adaptarlo a dispositivos moviles, la proporción del radio cambia
    if (window.screen.width < 567){
        radius = 33;
    }
    //se definen el angulo que separa cada una de las letras del rosco
    let radians = 360/27*Math.PI/180;
    let alphabet = "abcdefghijklmnñopqrstuvwxyz";
    let letter;
    //seleccionamos cada uno de los ids creados en el archivo html 
    //que se utilizarán posteriormente en el programa
    let play = document.getElementById("jugar");
    let instructionsText = document.getElementById("text");
    let login= document.getElementById("login");
    let userName = document.getElementById("user");
    let abc = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let pregunta = document.getElementById("questions");
    let answer = document.getElementById("answer");
    let answerButton = document.getElementById("answer-button");
    let playingScreen = document.getElementById("playing-screen");
    let exit = document.getElementById("exit");
    let showUser = document.getElementById("show-user");
    let points = document.getElementById("points");
    let lastMistake = document.getElementById("last-mistake");
    let rankingScreen = document.getElementById("ranking-screen");
    let ranking = document.getElementById("ranking");
    let rankingButton = document.getElementById("ranking-button");
    let turnBack = document.getElementById("atras");
    let finalResult = document.getElementById("final-results");
    let timer = document.getElementById("timer");
    let time = 250;

    //definimos un ranking de usuarios como ejemplo
    let usersRanking = [{ name: "Neo", points: 27 }, { name: "Trinity", points: 26 }, { name: "Morpheus", points: 22 },
    { name: "alex23", points: 12 }, { name: "axel32", points: 3 }, { name: "Smith", points: 0 }];
  
    //posicionamos cada letra del alfabeto a lo largo de la cirfunferencia, 
    //empezando por la a que la situamos arriba del todo y desplazamos cada letra a lo largo
    // de la circunferencia 
    for (let i = 0; i < alphabet.length; i++) {
        letter = document.getElementById(alphabet[i]);
        letter.style.transform = "translate(" + radius*Math.sin(radians*i) + "vw, " + (-radius*Math.cos(radians*i)) + "vw)";
    }

    // si el dispositivo modifica el tamaño de la pantalla, se reajusta el tamaño y la colocación
    // de la circunferencia, principalmente para el cambio de vertical a horizontal y viceversa
    // en dispositivos móviles
    window.addEventListener("resize", function () {
        if (window.screen.width < 567){
            radius = 33;
        
        } else {
            radius = 17.5;
        }
        for (let i = 0; i < alphabet.length; i++) {
            letter = document.getElementById(alphabet[i]);
            letter.style.transform = "translate(" + radius*Math.sin(radians*i) + "vw, " + (-radius*Math.cos(radians*i)) + "vw)";
        }
    });

    //al darle al botón jugar nos desaparece el menú de instrucciones y aparece el menú de login
    play.addEventListener("click", function () {
        instructionsText.style.display = "none";
        login.style.display = "table-cell";
        let start = document.getElementById("empezar");
        //si clicamos en enviar se ejecuta la funcion checkUserName
        start.addEventListener("click", checkUserName);
        //si se introduce el nombre de usuario y la tecla pulsada es enter se ejecuta checkUserName
        userName.addEventListener("keypress", function (e){
            let key = e.which || e.keyCode || 0;
            if (key === 13) {
                checkUserName();
            }
        });
    });

    //si se hace click en "Ver Ranking Actual", el menu de instrucciones desaparece
    // y se muestra el ranking actual
    rankingButton.addEventListener("click", function() {
        if (instructionsText.style.display == "table-cell") {
            finalResult.innerHTML = "";
        }

        displayRanking();
        //si se clica en "Volver al Menú", recargamos la página inicialmente
        turnBack.addEventListener("click", function(){
            location.reload();
        });
    });

    function pasapalabra() { 
        //se definen las posibles preguntas del pasapalabra con sus respectivas respuestas
        let questions = [
          { letter: "a", answer: ["abducir", "america", "atapuerca"], status: 0, question: ["CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", 'CON LA A. En 1492 se descubrió ese continente', 'CON LA A. Lugar de España dónde se han encontrado los fósiles humanos mas antiguos de Europa'] },
          { letter: "b", answer: ["bingo", 'abañuela', 'burgueses'], status: 0, question: ["CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", 'CON LA B. Pico que destaca en Sierra Madrona', 'CON LA B. Así se se llamaban en la Edad Moderna a los habitantes de las ciudades que es habían enriquecido con el comercio'] },
          { letter: "c", answer: ["churumbel", 'clima', 'calzada'], status: 0, question: ["CON LA C. Niño, crío, bebé", 'CON LA C. Es el tiempo atmosférico que predomina en una zona a lo largo del tiempo ', 'CON LA C. Obra pública realizada por los romanos para mejorar la comunicación y el comercio'] },
          { letter: "d", answer: ["diarrea", 'doñana', 'derecho'], status: 0, question: ["CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", 'CON LA D. Parque Nacional que se encuentra mayormente en la provincia de Huelva', 'CON LA D. Conjunto de principios y normas que regulan las relaciones humanas'] },
          { letter: "e", answer: ["ectoplasma", 'equador', 'euro'], status: 0, question: ["CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", 'CON LA E. Circunferencia imaginaria que rodea la Tierra', 'CON LA E. Moneda única europea'] },
          { letter: "f", answer: ["facil", 'fosiles', 'feudos'], status: 0, question: ["CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", 'CON LA F. Restos de seres vivos que vivieron hace millones de años ', 'CON LA F. Grandes territorios organizados cerca de un castillo '] },
          { letter: "g", answer: ["galaxia", 'guadalquivir', 'greenwich'], status: 0, question: ["CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", 'CON LA G. Rio andaluz que es navegable en su curso bajo', 'CON LA G. Nombre del Meridiano cero GREENWICH'] },
          { letter: "h", answer: ["harakiri", 'hijo', 'mulhacen'], status: 0, question: ["CON LA H. Suicidio ritual japonés por desentrañamiento", 'CON LA H. Descendiente de un padre.', 'CONTIENE LA H. Pico más alto de la Península Ibérica'] },
          { letter: "i", answer: ["iglesia", 'inmigrantes', 'interrogativo'], status: 0, question: ["CON LA I. Templo cristiano", 'CON LA I. Personas que llegan de otros paises al nuestro', 'CON LA I. Enunciado que sirve para preguntar'] },
          { letter: "j", answer: ["jabali", 'james', 'jupiter'], status: 0, question: ["CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", 'CON LA J. Nombre del inventor de la máquina de vapor', 'CON LA J. Planeta alejado del sol y formado por gases'] },
          { letter: "k", answer: ["kamikaze", 'kola', 'aizkorri'], status: 0, question: ["CON LA K. Persona que se juega la vida realizando una acción temeraria", 'CON LA K. Península que forma parte de la Europa del Norte', 'CON LA K. Contiene la K Sierra que destaca en los Montes Vascos'] },
          { letter: "l", answer: ["licantropo", 'latitud', 'longitud'], status: 0, question: ["CON LA L. Hombre lobo", 'CON LA L. Mide en grados hacia el norte o el sur', 'CON LA L.Mide en grados hacia el este o el oeste'] },
          { letter: "m", answer: ["misantropo", 'meridianos', 'monolitos'], status: 0, question: ["CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", 'CON LA M. Circunferencias imaginarias que pasan por los Polos', 'CON LA M. Grandes monumentos de piedra que se utilizaban como tumbas en el Neolítico'] },
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

        //se definen las variables a utilizar
        let playerName = userName.value;
        let userAnswer = "";
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let index = 0;
        let numberSelected = 0;
        let alphabet = "abcdefghijklmnñopqrstuvwxyz".split("");

        //el menu de login desaparecera y aparecerá por pantalla,
        // una tablilla con los resultados que el usuario esta teniendo
        // así como el tiempo que queda y las preguntas a responder 
        login.style.display = "none";
        playingScreen.style.display = "table-cell";
        exit.style.display = "inline";
        showUser.innerHTML = playerName;
        points.innerHTML = "Total points obtained: " + correctAnswers + "<br>"
        + "Total mistakes made: " + wrongAnswers;
        lastMistake.innerHTML = "Last word Failed is: ";
      
        //se seleccionan aleatoriamente las preguntas con sus respectivas respuestas
        for (let i = 0; i < questions.length; i++) {
          numberSelected = Math.floor(Math.random() * questions[i].question.length);
          questions[i].question = questions[i].question[numberSelected];
          questions[i].answer = questions[i].answer[numberSelected];
        }

        //se muestra la primera pregunta por pantalla 
        //y la letra correspondiente iluminada de color naranja
        pregunta.innerHTML = questions[index].question;
        letter = document.getElementById(alphabet[index]);
        letter.style.backgroundColor = "orange";

        //si se pulsa enter despues de escribir la respuesta,
        //se ejecuta answerQuestion()
        answer.addEventListener("keypress", function(e) {
            let key = e.which || e.keyCode || 0;
            if (key === 13) {
                answerQuestion();
            }
        });
      
        //si se hace click en "Enviar", se ejecuta answerQuestion
        answerButton.addEventListener("click", function () {
            answerQuestion();            
        });

        //si se pulsa sobre "Salir del juego", se asegura que el usuario quiere salir
        // y si así es, se vuelve al menú de inicio
        exit.addEventListener("click", function () {
            let finishGame = confirm("Si sales del juego ahora no serás clasificado en el ranking.\n¿Quieres continuar?");
            if (finishGame) {
                location.reload();
            }
        });

        //se muestra una cuenta atrás, cuando esta finaliza se acaba el juego
        // y se muestra la posición del jugador en el ranking
        timer.style.display = "block";
        let interval = setInterval(function() {
            --time;
            timer.innerHTML = time;
            if (questions.length == 0){
                clearInterval(interval);
            }
            if (timer.innerHTML <= 0) {
                clearInterval(interval);
                alert("¡Se ha acabado el tiempo!\nA continuación se mostrará tu posición en el ranking.")
                usersRanking.push({ name: playerName, points: correctAnswers });
                usersRanking.sort(function (a, b) { return b.points - a.points; });
                playingScreen.style.display = "none";
                exit.style.display = "none";
                rankingScreen.style.display = "table-cell";
                displayRanking();
                rankingPosition();
                turnBack.addEventListener("click", function(){
                location.reload();
            });
            } 
        }, 1000);

        //función que verifica que la respuesta introducida es válida indicando si es correcta o no
        function answerQuestion () {
            if (abc.includes(answer.value[0]) && answer.value.length > 2) {
                userAnswer = answer.value.toLowerCase();
                verifyAnswer();
                if (index == questions.length) {
                    index = 0;
                }
                pregunta.innerHTML = questions[index].question;
                letter = document.getElementById(alphabet[index]);
                letter.style.backgroundColor = "orange";
            } else {
                alert("Input inválido");
            } 
        }

        //funcion que actualiza el array questions cada vez según la respuesta 
        // sea correcta, incorrecta o pasapalabra
        // si es correcta o incorrecta se elimina la pregunta de dicho array
        // si se pulsa pasapalabra, se aumenta el indice que va recorriendo el array
        // si el indice llega al final, se reinicia y vuelve al principio
        function verifyAnswer() {
            if (questions.length > 0) {
                if (userAnswer == questions[index].answer) {
                    letter.style.backgroundColor = "rgb(119, 218, 94)"
                    questions.splice(index, 1);
                    alphabet.splice(index, 1);
                    correctAnswers++;
                } else if (userAnswer == "pasapalabra") {
                    letter.style.backgroundColor = "rgb(48, 48, 146)";
                    index++;
                } else {
                    lastMistake.innerHTML = "Last word Failed is: " + questions[index].answer;
                    letter.style.backgroundColor = "red";
                    questions.splice(index, 1);
                    alphabet.splice(index, 1);
                    wrongAnswers++;
                }
                points.innerHTML = "Total points obtained: " + correctAnswers + "<br>"
                + "Total mistakes made: " + wrongAnswers;
                answer.value = "";
            } 
            //si ya no quedan más preguntas, se situa al jugador en el ranking y
            //se muestra la actual clasificación
            if (questions.length == 0) {
                usersRanking.push({ name: playerName, points: correctAnswers });
                usersRanking.sort(function (a, b) { return b.points - a.points; });
                playingScreen.style.display = "none";
                exit.style.display = "none";
                rankingScreen.style.display = "table-cell";
                displayRanking();
                rankingPosition();
                turnBack.addEventListener("click", function(){
                    location.reload();
                });
            }
        }
        

        //función que devuelve la posición en el ranking del usuario
        function rankingPosition() {
          for (let i = 0; i < usersRanking.length; i++) {
            if ((usersRanking[i].name == playerName) && (usersRanking[i].points == correctAnswers)) {
              finalResult.innerHTML = "Tu posición en el ranking es: " + (i + 1);
            }
          }
        }
    }

    //funcion que verifica que se ha introducido un nombre de usuario que no empieza con numero
    // y que tiene al menos una longitud de 3, si se verifican las condiciones,
    // se ejecuta la funcion pasapalabra
    function checkUserName () {
        if (abc.includes(userName.value[0]) && userName.value.length > 2) {
            pasapalabra();
        } else {
            alert("El nombre de usuario debe empezar por una letra\ny contener al menos 3 carácteres.");
        } 
    }

    //funcion que la tabla con el ranking de jugadores indicando
    // la posicion, el nombre de usuario y los puntos que obtuvieron
    function displayRanking () {
        instructionsText.style.display = "none";
        rankingScreen.style.display = "table-cell";
        let row = "<tr><th>" + "Posición" 
        + "</th><th>" + "Usuario" 
        + "</th><th>" + "Puntuación" + "</th></tr>";

        for (let i = 0; i < usersRanking.length; i++) {    
            row += "<tr><td>" + (i+1) 
            + "</td><td>" +  usersRanking[i].name
            + "</td><td>" + usersRanking[i].points + "</td></tr>";             

            ranking.innerHTML = row;
        }
    }
}