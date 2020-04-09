let questions = [
    { letter: "a", answer0: "abducir", status0: 0, question0: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien", answer1: "antonimo", status1: 0, question1: "CON LA A. Palabra que significa lo contrario de una dada", answer2: "acepcion", status2: 0, question2: "CON LA A. Cada uno de los significados que tiene una palabra."},
    { letter: "b", answer0: "bingo", status0: 0, question0: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso", answer1: "bisilaba", status1: 0, question1: "CON LA B. Palabra que tiene dos sílabas.", answer2: "biografia", status2: 0, question2: "CON LA B. Contar la vida de una persona por escrito."},
    { letter: "c", answer0: "churumbel", status0: 0, question0: "CON LA C. Niño, crío, bebé", answer1: "cantidad", status1: 0, question1: "CON LA C. Más es un adverbio de ...", answer2: "comic", status2: 0, question2: "CON LA C. Historia contada en viñetas con dibujos y palabras."},
    { letter: "d", answer0: "diarrea", status0: 0, question0: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida", answer1: "determinantes", status1: 0, question1: "CON LA D. Los artículos, demostrativos, posesivos, etc. Son ...", answer2: "diccionario", status2: 0, question2: "CON LA D. Libro en el que aparece el significado de las palábras por orden alfabético."},
    { letter: "e", answer0: "ectoplasma", status0: 0, question0: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación", answer1: "esdrujula", status1: 0, question1: "CON LA E. Palábra cuya sílaba tónica es la antepenúltima", answer2: "estrofa", status2: 0, question2: "CON LA E. Grupo de versos que riman entre sí o tratan de un tema determinado."},
    { letter: "f", answer0: "facil", status0: 0, question0: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad", answer1: "fiebre", status1: 0, question1: "CON LA F. Aumento de la temperatura del cuerpo que tenemos cuando estamos enfermos", answer2: "fumar", status2: 0, question2: "CON LA F. Ábito perjudicial para el aparato respiratorio."},
    { letter: "g", answer0: "galaxia", status0: 0, question0: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas", answer1: "guindilla", status1: 0, question1: "CON LA G. Pimiento pequeño que pica mucho", answer2: "genotipo", status2: 0, question2: "CON LA G. Informacón genética de un ser vivo."},
    { letter: "h", answer0: "harakiri", status0: 0, question0: "CON LA H. Suicidio ritual japonés por desentrañamiento", answer1: "humo", status1: 0, question1: "CON LA H. Lo que sale cuando se hace el fuego.", answer2: "hablar", status2: 0, question2: "CON LA H. Dialogar con las personas."},
    { letter: "i", answer0: "iglesia", status0: 0, question0: "CON LA I. Templo cristiano", answer1: "intuir", status1: 0, question1: "CON LA I. Percibir íntima e instantáneamente una idea o verdad tal como si se la tuviera a la vista.", answer2: "insectos", status2: 0, question2: "CON LA I. La mosca, la hormiga, la avispa y la obeja son ..."},
    { letter: "j", answer0: "jabali", status0: 0, question0: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba", answer1: "jardin", status1: 0, question1: "CON LA J. Zona que rodea algunas casas y edificios y que esta lleno de césped, flores, árboles...", answer2: "jornada", status2: 0, question2: "CON LA J. Tiempo de duración del trabajo diario."},
    { letter: "k", answer0: "kamikaze", status0: 0, question0: "CON LA K. Persona que se juega la vida realizando una acción temeraria", answer1: "kilo", status1: 0, question1: "CON LA K. Medida de peso que es igual a 1000 gramos.", answer2: "koala", status2: 0, question2: "CON LA K. Animal parecido a un oso pequeño y que podemosencontrar en Australia."},
    { letter: "l", answer0: "licantropo", status0: 0, question0: "CON LA L. Hombre lobo", answer1: "luna", status1: 0, question1: "CON LA L. Satélite de la Tierra.", answer2: "lermontov", status2: 0, question2: "CON LA L. Apellido del poeta ruso autor de la obra La muerte del poeta de 1837."},
    { letter: "m", answer0: "misantropo", status0: 0, question0: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas", answer1: "menor", status1: 0, question1: "CON LA M. Se dice de una persona que no ha alcanzado la mayoría de edad.", answer2: "mantel", status2: 0, question2: "CON LA M. Tela que se pone en la mesa a la hora de comer."},
    { letter: "n", answer0: "necedad", status0: 0, question0: "CON LA N. Demostración de poca inteligencia", answer1: "nimfa", status1: 0, question1: "CON LA N. Cada una de las fabulosas deidades de las aguas, bosques o selva.", answer2: "nido", status2: 0, question2: "CON LA N. Tipo de casa que construyen los págaros para poner sus huevos."},
    { letter: "ñ", answer0: "señal", status0: 0, question0: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.", answer1: "ñu", status1: 0, question1: "CON LA Ñ. Mamífero africano de color marron parecido a un torro con los cuernos curvos", answer2: "patraña", status2: 0, question2: "CONTIENE LA Ñ. Mentira o noticia fabulosa de pura invención."},
    { letter: "o", answer0: "orco", status0: 0, question0: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien", answer1: "ordenanza", status1: 0, question1: "CON LA O. Empleado que en ciertas oficinas desempeña funciones subalternas.", answer2: "oriente", status2: 0, question2: "CON LA O. Los reyes magos proceden de ..."},
    { letter: "p", answer0: "protoss", status0: 0, question0: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft", answer1: "prioridad", status1: 0, question1: "CON LA P. Anterioridad de algo respecto de otra cosa en tiempo u orden.", answer2: "peso", status: 0, question2: "CON la P. Moneda argentina"},
    { letter: "q", answer0: "queso", status0: 0, question0: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche", answer1: "branquia", status1: 0, question1: "CONTIENE LA Q. Órgano respiratorio de los peces formado por láminas o filamentos.", answer2: "quijote", status2: 0, question2: "CON LA Q. Protagonista de libro español más famoso de Cervantes." },
    { letter: "r", answer0: "raton", status0: 0, question0: "CON LA R. Roedor", answer1: "rapido", status1: 0, question1: "CON LA R. Veloz", answer2: "renard", status2: 0, question2: "CON LA R. Apellido del ingeniero francés que, junto a Arthur C. Krebs, construyó el dirigible militar La France en 1884."},
    { letter: "s", answer0: "stackoverflow", status0: 0, question0: "CON LA S. Comunidad salvadora de todo desarrollador informático", answer1: "sacapuntas", status1: 0, question1: "CON LA S. Lo que se usa para tener la punta de los lápices afilada", answer2: "samba", status2: 0, question2: "CON LA S. Danza popular brasileña de influencia africana cantada de compás binario."},
    { letter: "t", answer0: "terminator", status0: 0, question0: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984", answer1: "tragaperras", status1: 0, question1: "CON LA T. Máquina de juegos de azar que funciona introduciendo monedas.", answer2: "techo", status2: 0, question2: "CON LA T. Parte de una habitación que está arriba."  },
    { letter: "u", answer0: "unamuno", status0: 0, question0: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914", answer1: "urgente", status1: 0, question1: "CON LA U. Que no puede esperar", answer2: "usurpar", status: 0, question2: "CON LA U. Atribuirse y usar un título o cargo ajeno como si fuera propio."},
    { letter: "v", answer0: "vikingos", status0: 0, question0: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa", answer1: "vivienda", status1: 0, question1: "CON LA V. Lugar cerrado o cubierto construido para ser habitado por personas.", answer2: "veloz", status: 0, question2: "CON LA V. Que es muy rápido."},
    { letter: "w", answer0: "sandwich", status0: 0, question0: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso", answer1: "windsurf", status1: 0, question1: "CON LA W. Deporte que se practica en el mar, de pie sobre una tabla alargada que tiene una vela triangular", answer2: "whisky", status2: 0, question2: "CON LA W. Bebida alcohólica. "},
    { letter: "x", answer0: "botox", status0: 0, question0: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética", answer1: "oxford", status: 0, question1: "CONTIENE LA X. Ciudad inglesa cuya universidad compite cada año en una popular regata contra la universidad de Cambridge.", answer2: "taxi", status2: 0, question2: "CONTIENE LA X. Coche con conductor que lleva a las personas donde quieren ir y cobra según los kilómetros recorreidos." },
    { letter: "y", answer0: "peyote", status0: 0, question0: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos", answer1: "leguleyo", status1: 0, question1: "CONTIENE LA Y. Persona que aplica el derecho sin rigor y desenfadadamente.", answer2: "yate", status2: 0, question2: "CON LA Y. Barco de lujo."},
    { letter: "z", answer0: "zen", status0: 0, question0: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional", answer1: "zarandeo", status1: 0, question1: "CON LA Z. Movimiento repetido y violento de un lado a otro.", answer2: "zoo", status: 0, question2: "CON LA Z. Parque en el que hay todo tipo de animales."},
]

function pasapalabra (questions){

let pasapalabraRanking = [];

function randomNumber (){
    return Math.floor(Math.random()*3);
}

let gameContinue = true;
    while(gameContinue === true){
        let game = confirm('PASAPALABRA! \nPulse Aceptar para jugar y Cancelar para salir.');
        let successes = 0;
        let fails = 0;
        let endStatus0 = -1;
        let endStatus1 = -1;
        let endStatus2 = -1;
        if(game === true){
            let names = prompt('BIENVENID@S a pasapalabra! Introduzca su nombre');
            let numNames = Number(names);
            if (isNaN(numNames)){
                let number = randomNumber();
                if (number === 0){
                    for (let i in questions){
                        let answers = prompt(questions[i].question0);
                        if(answers === null){
                            questions[i].status0 = 3;
                            break;
                        }else{
                            let lowerCaseAnswer = answers.toLowerCase();
                            if(lowerCaseAnswer === questions[i].answer0){
                                alert('Correcto! Has obtenido 1 punto!');
                                questions[i].status0 = 1;
                                successes++;
                            }else if (lowerCaseAnswer === 'pasapalabra'){
                                questions[i].status0 = 2;
                                alert('PASAPALABRA!');
                            }else if (lowerCaseAnswer === 'end'){
                                questions[i].status0 = 3;
                                break;
                            }else{
                                alert('Respuesta errónea!');
                                fails++;
                            }
                        }
                        console.log(`Aciertos: ${successes}.\nFallos: ${fails}.`); 
                    }
                    let pasapalabraStatus0 = questions.map(function(e) { return e.status0; }).indexOf(2);
                    while (pasapalabraStatus0 >= 0){
                        for (let i in questions){
                            if (questions[i].status0 === 2){
                                let answers = prompt(questions[i].question0);
                                if(answers === null){
                                    questions[i].status0 = 3;
                                    break;
                                }else{
                                    let lowerCaseAnswer = answers.toLowerCase();
                                    if(lowerCaseAnswer === questions[i].answer0){
                                        alert('Correcto! Has obtenido 1 punto!');
                                        questions[i].status0 = 1;
                                        successes++;
                                    }else if (lowerCaseAnswer === 'pasapalabra'){
                                        alert('PASAPALABRA!');
                                        questions[i].status0 = 2;
                                    }else if (lowerCaseAnswer === 'end'){
                                        questions[i].status0 = 3;
                                        break;
                                    }else{
                                        alert('Respuesta errónea!');
                                        questions[i].status0 = 0;
                                        fails++;
                                    }
                                }
                                console.log(`Aciertos: ${successes}\nFallos: ${fails}`); 
                            }
                        }
                    pasapalabraStatus0 = questions.map(function(e) { return e.status0; }).indexOf(2);
                    }
                }else if (number === 1){
                    for (let i in questions){
                        let answers = prompt(questions[i].question1);
                        if(answers === null){
                            questions[i].status1 = 3;
                            break;
                        }else{
                            let lowerCaseAnswer = answers.toLowerCase();
                            if(lowerCaseAnswer === questions[i].answer1){
                                alert('Correcto! Has obtenido 1 punto!');
                                questions[i].status1 = 1;
                                successes++;
                            }else if (lowerCaseAnswer === 'pasapalabra'){
                                alert('PASAPALABRA!');
                                questions[i].status1 = 2;
                            }else if (lowerCaseAnswer === 'end'){
                                questions[i].status1 = 3;
                                break;
                            }else{
                                alert('Respuesta errónea!');
                                fails++;
                            }
                        }
                        console.log(`Aciertos: ${successes}\nFallos: ${fails}\n `); 
                    }
                    let pasapalabraStatus1 = questions.map(function(e) { return e.status1; }).indexOf(2);
                    while (pasapalabraStatus1 >= 0){
                        for (let i in questions){
                            if (questions[i].status1 === 2){
                                let answers = prompt(questions[i].question1);
                                if(answers === null){
                                    questions[i].status1 = 3;
                                    break;
                                }else{
                                    let lowerCaseAnswer = answers.toLowerCase();
                                    if(lowerCaseAnswer === questions[i].answer1){
                                        alert('Correcto! Has obtenido 1 punto!');
                                        questions[i].status1 = 1;
                                        successes++;
                                    }else if (lowerCaseAnswer === 'pasapalabra'){
                                        questions[i].status1 = 2;
                                        alert('PASAPALABRA!');
                                    }else if (lowerCaseAnswer === 'end'){
                                        questions[i].status1 = 3;
                                        break;
                                    }else{
                                        alert('Respuesta errónea!');
                                        questions[i].status1 = 0;
                                        fails++;
                                    }
                                }
                                console.log(`Aciertos: ${successes}.\nFallos: ${fails}.`); 
                            }
                        }
                        pasapalabraStatus1 = questions.map(function(e) { return e.status1; }).indexOf(2);
                    }
                }else if (number === 2){
                    for (let i in questions){
                        let answers = prompt(questions[i].question2);
                        if(answers === null){
                            questions[i].status2 = 3;
                            break;
                        }else{
                            let lowerCaseAnswer = answers.toLowerCase();
                            if(lowerCaseAnswer === questions[i].answer2){
                                alert('Correcto! Has obtenido 1 punto!');
                                questions[i].status2 = 1;
                                successes++;
                            }else if (lowerCaseAnswer === 'pasapalabra'){
                                questions[i].status2 = 2;
                                alert('PASAPALABRA!');
                            }else if (lowerCaseAnswer === 'end'){
                                questions[i].status2 = 3;
                                break;
                            }else{
                                alert('Respuesta errónea!');
                                fails++;
                            }
                        }
                        console.log(`Aciertos: ${successes}\nFallos: ${fails}`); 
                    }
                    let pasapalabraStatus2 = questions.map(function(e) { return e.status2; }).indexOf(2);
                    while (pasapalabraStatus2 >= 0){
                        for (let i in questions){
                            if (questions[i].status2 === 2){
                                let answers = prompt(questions[i].question2);
                                if(answers === null){
                                    questions[i].status2 = 3;
                                    break;
                                }else{
                                    let lowerCaseAnswer = answers.toLowerCase();
                                    if(lowerCaseAnswer === questions[i].answer2){
                                        alert('Correcto! Has obtenido 1 punto!');
                                        questions[i].status2 = 1;
                                        successes++;
                                    }else if (lowerCaseAnswer === 'pasapalabra'){
                                        questions[i].status2 = 2;
                                        alert('PASAPALABRA!');
                                    }else if (lowerCaseAnswer === 'end'){
                                        questions[i].status2 = 3;
                                        break;
                                    }else{
                                        alert('Respuesta errónea!');
                                        questions[i].status2 = 0;
                                        fails++;
                                    }
                                }
                                console.log(`Aciertos: ${successes}\nFallos: ${fails}\n `);   
                            }
                        }
                        pasapalabraStatus2 = questions.map(function(e) { return e.status2; }).indexOf(2);
                    }
                }
                    
                    endStatus0 = questions.map(function(e) { return e.status0; }).indexOf(3);
                    endStatus1 = questions.map(function(e) { return e.status1; }).indexOf(3);
                    endStatus2 = questions.map(function(e) { return e.status2; }).indexOf(3);

                    if(endStatus0 >= 0 || endStatus1 >= 0 || endStatus2 >= 0){
                        for (let i in pasapalabraRanking){
                            console.log(pasapalabraRanking[i].name + ': ' + pasapalabraRanking[i].point + ' aciertos y ' + pasapalabraRanking[i].fail + ' fallos.');
                        }
                    }else{
                        let ranking = new Object;
                        ranking.name = names;
                        ranking.point = successes;
                        ranking.fail = fails;
                        pasapalabraRanking.push(ranking);
                        pasapalabraRanking.sort(function(a,b){
                            return (b.point - a.point);
                        });
                        for (let i in pasapalabraRanking){
                        console.log(pasapalabraRanking[i].name + ': ' + pasapalabraRanking[i].point + ' aciertos y ' + pasapalabraRanking[i].fail + ' fallos.');
                        }
                    }
            }
            for (let n in questions){
                questions[n].status0 = 0;
                questions[n].status1 = 0;
                questions[n].status2 = 0;
            }
        }else{
            alert('Gracias! Hasta pronto!');
            gameContinue = false;
        }
    }
}

pasapalabra(questions);
