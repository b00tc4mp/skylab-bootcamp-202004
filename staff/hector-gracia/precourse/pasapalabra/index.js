//Preparar preguntas
//Pedir nombre
//Dar pista
//Esperar respuesta o pasapalabra
//Mostrar acierto, fallo o esperar
//Añadir puntuación
//Repetir hasta hacer tocas o end
//Mostrar Ranking
var finalQuestions=[]; //Array con las preguntas que usará el jugador en esta ronda
var allQuestions=[
    { letter: "a", answer: "abrir", status: 0, question: "Separar del marco la hoja o las hojas de una puerta o ventana, haciéndolas girar sobre sus goznes, o quitar o separar cualquier otra cosa con que esté cerrada una abertura, para que deje de estarlo."},
    { letter: "a", answer: "asunto", status: 0, question: "Materia de que se trata"},
    { letter: "a", answer: "acertijo", status: 0, question: "Enigma o adivinanza que se propone como acertijo"},
    { letter: "b", answer: "batalla", status: 0, question: "Combate o serie de combates de un ejército con otro, o de una armada naval con otra"},
    { letter: "b", answer: "balada", status: 0, question: "Canción de ritmo lento y de carácter popular, cuyo asunto es generalmente amoroso"},
    { letter: "b", answer: "bucear", status: 0, question: "Nadar con todo el cuerpo sumerjido"},
    { letter: "c", answer: "cazar", status: 0, question: "Buscar o perseguir aves, fieras y otras muchas clases de animales para cobrarlos o matarlos"},
    { letter: "c", answer: "cerner", status: 0, question: "Dicho de la vid, del olivo, del trigo y de otras plantas: Dejar caer el polen de la flor"},
    { letter: "c", answer: "contar", status: 0, question: "Numerar o computar las cosas considerándolas como unidades homogéneas"},
    { letter: "d", answer: "decir", status: 0, question: "Manifestar con palabras el pensamiento"},
    { letter: "d", answer: "dudar", status: 0, question: "Tener dificultad para decidirse por una cosa o por otra"},
    { letter: "d", answer: "dividir", status: 0, question: "Partir o separar algo en partes"},
    { letter: "e", answer: "experimentar", status: 0, question: "Probar y examinar prácticamente la virtud y propiedades de algo"},
    { letter: "e", answer: "elegir", status: 0, question: "Escoger o preferir a alguien o algo para un fin"},
    { letter: "e", answer: "engreido", status: 0, question: "Dicho de una persona: Demasiado convencida de su valer"},
    { letter: "f", answer: "feo", status: 0, question: "Desprovisto de belleza y hermosura."},
    { letter: "f", answer: "final", status: 0, question: "Que remata, cierra o perfecciona algo"},
    { letter: "f", answer: "funcional", status: 0, question: "Dicho de una obra o de una técnica: Eficazmente adecuada a sus fines"},
    { letter: "g", answer: "granja", status: 0, question: "Hacienda de campo dentro de la cual suele haber un caserío donde se recogen la gente de labor y el ganado"},
    { letter: "g", answer: "gentil", status: 0, question: "Hermoso, agradable o que tiene gracia"},
    { letter: "g", answer: "gobierno", status: 0, question: "Órgano superior del poder ejecutivo de un Estado o de una comunidad política, constituido por el presidente y los ministros o consejeros"},
    { letter: "h", answer: "huir", status: 0, question: "Alejarse deprisa, por miedo o por otro motivo, de personas, animales o cosas, para evitar un daño, disgusto o molestia"},
    { letter: "h", answer: "hilo", status: 0, question: "Hebra larga y delgada de una materia textil, especialmente la que se usa para coser"},
    { letter: "h", answer: "harakiri", status: 0, question: "Forma de suicidio ritual, practicado en el Japón por razones de honor o por orden superior, consistente en abrirse el vientre"},
    { letter: "i", answer: "inventar", status: 0, question: "Hallar o descubrir algo nuevo o no conocido"},
    { letter: "i", answer: "intuir", status: 0, question: "Percibir íntima e instantáneamente una idea o verdad, tal como si se la tuviera a la vista"},
    { letter: "i", answer: "izar", status: 0, question: "Hacer subir algo tirando de la cuerda de que está colgado"},
    { letter: "j", answer: "judio", status: 0, question: "Que profesa el judaísmo"},
    { letter: "j", answer: "javalina", status: 0, question: "Arma, a manera de pica o venablo, que se usaba más comúnmente en la caza mayor, y actualmente en una modalidad deportiva"},
    { letter: "j", answer: "jota", status: 0, question: "Baile popular propio de Aragón, usado también en otras regiones de España"},
    { letter: "k", answer: "kiko", status: 0, question: "Grano de maíz tostado"},
    { letter: "k", answer: "kebab", status: 0, question: "Masa de carne picada que, ensartada en una varilla, se asa haciéndose girar ante una fuente de calor"},
    { letter: "k", answer: "koala", status: 0, question: "Mamífero marsupial arborícola parecido a un oso pequeño, propio de los eucaliptales australianos"},
    { letter: "l", answer: "lamento", status: 0, question: "Queja con llanto y otras muestras de aflicción"},
    { letter: "l", answer: "liante", status: 0, question: "Dicho de una persona: Que suele organizar embrollos o causar problemas"},
    { letter: "l", answer: "laudable", status: 0, question: "Digno de alabanza"},
    { letter: "m", answer: "meandro", status: 0, question: "Cada una de las curvas que describe el curso de un río"},
    { letter: "m", answer: "monotonia", status: 0, question: "Falta de variedad en cualquier cosa"},
    { letter: "m", answer: "morder", status: 0, question: "Clavar los dientes en algo"},
    { letter: "n", answer: "notar", status: 0, question: "Señalar algo para que se conozca o se advierta"},
    { letter: "n", answer: "nutrir", status: 0, question: "Aumentar o dar nuevas fuerzas en cualquier línea, especialmente en lo moral"},
    { letter: "n", answer: "nativo", status: 0, question: "Nacido en un lugar determinado"},
    { letter: "ñ", answer: "ñajo", status: 0, question: "Dicho de una persona: Que tiene labio leporino"},
    { letter: "ñ", answer: "ñoño", status: 0, question: "Dicho de una cosa: Sosa, de poca sustancia"},
    { letter: "ñ", answer: "ñipe", status: 0, question: "Arbusto de la familia de las mirtáceas, cuyas ramas se emplean para teñir"},
    { letter: "o", answer: "opaco", status: 0, question: "Que impide el paso a la luz"},
    { letter: "o", answer: "orden", status: 0, question: "Colocación de las cosas en el lugar que les corresponde"},
    { letter: "o", answer: "oprimir", status: 0, question: "Ejercer presión sobre algo"},
    { letter: "p", answer: "poblar", status: 0, question: "Fundar uno o más pueblos"},
    { letter: "p", answer: "potencia", status: 0, question: "Capacidad para ejecutar algo o producir un efecto"},
    { letter: "p", answer: "pulir", status: 0, question: "Alisar o dar tersura y lustre a algo"},
    { letter: "q", answer: "quedar", status: 0, question: "Estar, detenerse forzosa o voluntariamente en un lugar"},
    { letter: "q", answer: "quiebra", status: 0, question: "Rotura de una superficie de cierta dureza o rigidez"},
    { letter: "q", answer: "quima", status: 0, question: "Rama de un árbol"},
    { letter: "r", answer: "roce", status: 0, question: "Discusión o enfrentamiento leve"},
    { letter: "r", answer: "ruina", status: 0, question: "Acción de caer o destruirse algo"},
    { letter: "r", answer: "rayo", status: 0, question: "Línea de luz que procede de un cuerpo luminoso, y especialmente las que vienen del sol"},
    { letter: "s", answer: "sudar", status: 0, question: "Dicho de una cosa impregnada de humedad: Destilar agua a través de sus poros"},
    { letter: "s", answer: "simple", status: 0, question: "Constituido por un solo elemento, no compuesto"},
    { letter: "s", answer: "sensible", status: 0, question: " Dicho de un ser vivo o de uno de sus órganos: Capaz de experimentar sensaciones"},
    { letter: "t", answer: "traca", status: 0, question: "Artificio de pólvora que se hace con una serie de petardos colocados a lo largo de una cuerda y que estallan sucesivamente"},
    { letter: "t", answer: "turismo", status: 0, question: "Actividad o hecho de viajar por placer"},
    { letter: "t", answer: "total", status: 0, question: " General, universal y que lo comprende todo en su especie"},
    { letter: "u", answer: "urinario", status: 0, question: "Lugar destinado para orinar y en especial el dispuesto para el público en calles, teatros, etc"},
    { letter: "u", answer: "uso", status: 0, question: "Costumbre o hábito"},
    { letter: "u", answer: "ultra", status: 0, question: "En política, extremista"},
    { letter: "v", answer: "viril", status: 0, question: "Perteneciente o relativo al varón"},
    { letter: "v", answer: "vida", status: 0, question: "Fuerza o actividad esencial mediante la que obra el ser que la posee"},
    { letter: "v", answer: "vulgar", status: 0, question: "Que es impropio de personas cultas o educadas"},
    { letter: "w", answer: "wahabismo", status: 0, question: "Movimiento musulmán integrista que defiende una vuelta radical a la pureza del islam de los orígenes y se opone a todo tipo de innovaciones"},
    { letter: "w", answer: "waterpolo", status: 0, question: "Juego practicado en una piscina entre dos equipos de siete jugadores cada uno, que consiste en introducir el balón con la mano en la portería contraria mientras se nada"},
    { letter: "w", answer: "web", status: 0, question: "Red informática"},
    { letter: "x", answer: "xantoma", status: 0, question: "Acumulación cutánea de sustancias lipídicas, como el colesterol, en forma de placas o nódulos de color amarillento"},
    { letter: "x", answer: "xilema", status: 0, question: "Tejido leñoso de las plantas vasculares, que transporta principalmente agua y minerales de una parte a otra de estos organismos"},
    { letter: "x", answer: "xifoideo", status: 0, question: "Perteneciente o relativo al apéndice xifoides"},
    { letter: "y", answer: "yabuna", status: 0, question: " Hierba de la familia de las gramíneas que abunda en las sabanas. Sus tallos, rastreros, se entrecruzan de tal modo que cubren el terreno de una especie de alfombra. Las raíces son hondas y enmarañadas. Es muy perjudicial para los cultivos"},
    { letter: "y", answer: "yegua", status: 0, question: "Hembra del caballo"},
    { letter: "y", answer: "yodar", status: 0, question: "Aplicar o añadir yodo a una sustancia"},
    { letter: "z", answer: "zoco", status: 0, question: "Que usa la mano izquierda"},
    { letter: "z", answer: "zanahoria", status: 0, question: "Planta herbácea umbelífera, con flores blancas y purpúrea la central de la umbela, con fruto seco y comprimido y raíz fusiforme, de unos 20 cm de largo, amarilla o rojiza, jugosa y comestible"},
    { letter: "z", answer: "zambuyir", status: 0, question: "Meter debajo del agua con ímpetu o de golpe"},
]
var ranking=[];
var playerName="";
var topScores=[];
function pasapalabra(){
    askName();
    console.log(playerName);
    initializeQuestions();
    while(!gameCompleted()){
       askQuestion(); 
    }
    addRank();
    if(prompt("Quieres seguir jugando?", "si")=="si"){
        pasapalabra();
    }

    
    //showQuestions();
}
//Le pide el nombre al jugador para el ranking
function askName(){
    playerName=prompt("Introduce nombre del jugador","Jugador");
}
//Elige una pregunta por cada palabra
function initializeQuestions(){
    var rand;
    
    finalQuestions.length=0;
    for(var i=0;i<allQuestions.length;i+=3){
        rand= Math.floor(Math.random()*3);
        finalQuestions.push(allQuestions[i+rand]);
    }
}
//Le hace la pregunta al jugador y comprueba su respuesta
function askQuestion(){
    var answer="";
    for(var i=0;i<finalQuestions.length;i++){
        if(finalQuestions[i].status==0){
            answer=prompt("Con la '"+finalQuestions[i].letter+"', " +finalQuestions[i].question).toLocaleLowerCase().trim();
            if(answer==finalQuestions[i].answer){
                alert("Acertaste");
                finalQuestions[i].status=1;
            }else if(answer!="pasapalabra"){
                alert("Fallaste, la respuesta era "+finalQuestions[i].answer);
                finalQuestions[i].status=2;
            }
        }
    }
}
//Comprueba si el quedan preguntas por responder
function gameCompleted(){
    for(var i=0;i<finalQuestions.length;i++){
        if(finalQuestions[i].status==0)
        {return false;}
    }
    return true;
}
//Da la puntuacion del jugador
function getScore(){
    var score=0;
    for(var i=0;i<finalQuestions.length;i++){
        if(finalQuestions[i].status==1)
        {
            score+=1;
            
        }
        //Reinicia el status de las preguntas. Daba problemas al hacerlo en otro sitio
        finalQuestions[i].status=0;
    }
    return score;
}
//Añade la partida actual al ranking
function addRank(){
    var rank=[];
    
    rank[0]=playerName;
    rank[1]=getScore();
    topScores.push(rank);
    
    topScores.sort(function(a,b){return b[1]-a[1]} );
    
   for(var j=0; j<topScores.length;j++){
       console.log(topScores[j][0]+": "+topScores[j][1]);
   }
}
pasapalabra();