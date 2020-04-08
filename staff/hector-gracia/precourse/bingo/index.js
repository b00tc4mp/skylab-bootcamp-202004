let playerName=""; //Nombre del jugador
let carton=[];//Array que guarda el carton del bingo
let playing=true;//Controla el bucle
let highestNumber=10;//Mayor numero que puede salir aleatoriamente
let hor=3;//Casillas horizontales del carton
let ver=2;//Casillas verticales del carton
let lhor=false;//Si ya ha hecho una linea horizontal
let lver=false;//Si ya ha hecho una linea vertical
let victory=false;//Comprueba si has hecho bingo
let turns=0;//Cuantos turnos lleva jugando
//Funcion principal del programa
const bingo=()=>{
    
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
const askName=()=>{
    playerName=prompt("Introduce tu nombre", "Jugador");
}
//Genera los numeros del carton
const createCarton=()=>{
    for(let y=0;y<ver;y++){
        carton[y]= new Array(hor);
        for(let x=0;x<hor;x++){
            carton[y][x]= Math.floor(Math.random()*highestNumber)+1;
        }
    }
}
//Bucle del juego
const play=()=>{
    turns+=1;
    let numero= newNumber();
    playing=confirm("Nuevo numero, "+numero);
    checkNumber(numero);
    showCarton();
}
//Crea un nuevo numero
const newNumber=()=>{
    let numero=Math.floor(Math.random()*highestNumber)+1;
    console.log(numero);
    return numero;
}
//Comprueba si el numero estaba en el carton y lo tacha
const checkNumber=(numero)=>{
    for(let i=0;i<ver;i++){
        for(let j=0;j<hor;j++){
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
const checkCarton=()=>{
    let linea=true;
    victory=true;
    //Lineas verticales
    if(lver==false){
        for(let a=0; a<hor;a++){
            linea=true;
            for(let b=0;b<ver;b++){
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
        for(let i=0;i<ver;i++){
            linea=true;
            for(let j=0; j<hor;j++){
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
    for(let i=0;i<ver;i++){
        for(let j=0; j<hor;j++){
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
const initialize=()=>{
    playing=true;
    lhor=false;
    lver=false;
    victory=false;
    turns=0;
}

//Muestra el carton al usuario
const showCarton=()=>{
    let line="";
    for(let y=0;y<ver;y++){
        line="";
        for(let x=0;x<hor;x++){
            line+= "["+carton[y][x]+"]";
        }
        console.log(line);
    }
}
bingo();
//Preguntar el nombre
