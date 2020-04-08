var playerName=""; //Nombre del jugador
var carton=[];//Array que guarda el carton del bingo
var playing=true;//Controla el bucle
var highestNumber=10;//Mayor numero que puede salir aleatoriamente
var hor=3;//Casillas horizontales del carton
var ver=2;//Casillas verticales del carton
var lhor=false;//Si ya ha hecho una linea horizontal
var lver=false;//Si ya ha hecho una linea vertical
var victory=false;//Comprueba si has hecho bingo
var turns=0;//Cuantos turnos lleva jugando
//Funcion principal del programa
function bingo(){
    
    askName();
    createCarton();
    while(victory==false){
        play();
    }
    if(confirm("Volver a jugar?")){
        initialize();
        bingo();
    }
}
//Guarda el nombre del jugador
function askName(){
    playerName=prompt("Introduce tu nombre", "Jugador");
}
//Genera los numeros del carton
function createCarton(){
    for(var y=0;y<ver;y++){
        carton[y]= new Array(hor);
        for(var x=0;x<hor;x++){
            carton[y][x]= Math.floor(Math.random()*highestNumber)+1;
        }
    }
}
//Bucle del juego
function play(){
    turns+=1;
    var numero= newNumber();
    playing=confirm("Nuevo numero, "+numero);
    checkNumber(numero);
    showCarton();
}
//Crea un nuevo numero
function newNumber(){
    var numero=Math.floor(Math.random()*highestNumber)+1;
    console.log(numero);
    return numero;
}
//Comprueba si el numero estaba en el carton y lo tacha
function checkNumber(numero){
    for(var i=0;i<ver;i++){
        for(var j=0;j<hor;j++){
            if(carton[i][j]==numero){
                carton[i][j]="X";
                console.log("Acierto")
                //Solo comprueba si ha hecho linea o bingo cuando ha acertado 
                checkCarton();
                
            }
        }
    }
}
//Comprueba si el jugador ha hecho linea o bingo
function checkCarton(){
    var linea=true;
    victory=true;
    //Lineas verticales
    if(lver==false){
        for(var a=0; a<hor;a++){
            linea=true;
            for(var b=0;b<ver;b++){
                if(carton[b][a]!="X"){
                    linea=false;
                    victory=false;
                }
            }
            if(linea){
                lver=true;
                confirm("Linea vertical!!!!!")
                console.log("Linea vertical");
            }
        }
    }
    //Lineas horizontales
    if(lhor==false){
        for(var i=0;i<ver;i++){
            linea=true;
            for(var j=0; j<hor;j++){
                if(carton[i][j]!="X"){
                    linea=false;
                    victory=false;
                }
            }
            if(linea){
                lhor=true;
                confirm("Linea horizontal!!!!!")
                console.log("Linea horizontal");
            }
        }
    }
    //Bingo
    for(var i=0;i<ver;i++){
        for(var j=0; j<hor;j++){
            if(carton[i][j]!="X"){
                victory=false;
            }
        }
    }
    if(victory==true){
        console.log("BINGO");
        confirm("¡¡¡¡¡BINGO!!!!!");
        confirm("La partida de "+playerName+" ha durado "+turns+" turnos");
    }
}
//Da valor a las variables antes de empezar a jugar
function initialize(){
    playing=true;
    lhor=false;
    lver=false;
    victory=false;
    turns=0;
}

//Muestra el carton al usuario
function showCarton(){
    var line="";
    for(var y=0;y<ver;y++){
        line="";
        for(var x=0;x<hor;x++){
            line+= "["+carton[y][x]+"]";
        }
        console.log(line);
    }
}
bingo();
//Preguntar el nombre
