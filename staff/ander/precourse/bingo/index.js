var ininum=parseFloat(((Math.random()*20)+1).toFixed(0))
var carton=[{valor : ininum , fila: 1 }];
var jugadores=[ { name: 'Juan', point: 21 },
                { name: 'Aitor', point: 37 },
                { name: 'Sara', point: 76 },
                { name: 'Eneko', point: 60 },
                { name: 'Gabriel', point: 56 }];
var galeriaNum=[];
var turnos=0;
pantalla="|"
linea1=false;
linea2=false;
linea3=false;
var lineax=false;
var finish=false;
bingo();


function bingo() { //Inicio
    var nombre=prompt("Como te llamas?")
    console.log("Sitema de puntuacion: Todo jugador comienza con 100 puntos y pierde 1 por cada turno que pasa. Se el primero en terminar!");
    createCarton(15);
    mostrar();
while (confirmCarton()===false){ //creando cartones nuevos
    createCarton(15);
    mostrar();
}
  confirm();
  if (finish==false) {
    ranking(nombre);
    
  }
 jugarOtra();

}

//FUNCIONES RELACIONADAS CON LA MECANICA DEL JUEGO
function createCarton(lengthOfArray) { // crea un numero y lo manda comparar
    while (carton.length < lengthOfArray){
    var num=parseFloat(((Math.random()*98)+1).toFixed(0));
    if(checkCarton(num)==true){  //probar con while
        switch (parseFloat(carton.length)) {  
            case 0:            //le doy al objeto la propiedad fila
            case 1:
            case 2:
            case 3:
            case 4:           
                carton.push({valor:num , fila: 1});
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:  
                carton.push({valor:num , fila: 2});
                break;
        
            default:
                 carton.push({valor:num , fila: 3});  
                break;
        }
        
    } else{
        createCarton();
    }
}
}

function randomNum() { // crea un numero random y lo llama comparar
    var num=parseFloat(((Math.random()*98)+1).toFixed(0));
    if(checkNum(num)===true){
        galeriaNum.push(num);
        console.log("Numero:  "+num);
        tachar(num); //**
        mostrar();
        lineas();
        if(linea1==true && linea2==true && linea3==true){
            alert("BINGOOOOOO!!");
            return false;
        }
        confirm();
    }else{
        randomNum();
    }      
}

function checkCarton(num) { // compara el numero con los del carton
    for (let i = 0; i < carton.length; i++) {
        if (carton[i].valor==num){
                return false;
        }
    }
  return true;  
}


function checkNum(num) { // compara el numero con los numeros que ya han salido
    for (let i = 0; i < galeriaNum.length; i++) {
        if(galeriaNum[i]==num){
            return false;
        }
    }
    return true;
}

function confirm() { // confirma un nuevo turno
    
    var conf=prompt("Quieres un turno? (S/N)");
    while(conf.toUpperCase()!="S") {
        finish=true;
        return false;
    }
    turnos++;
    randomNum();
    }

    function mostrar() {  //muestro el carton por pantalla
        pantalla="|"
        for (let i = 0; i < carton.length; i++) {
            pantalla+=" "+ carton[i].valor + " |"; 
            if(i===4) pantalla+=  "\n" + "|";
            if(i===9) pantalla+= "\n" + "|";
            
        }
        console.log(pantalla);
    }

function tachar(num) {
    for (let i = 0; i < carton.length; i++) {
        if (carton[i].valor==num) {
            carton[i].valor="X";
        }
    }
    
}

function lineas() { // Verificar lineas y bingo
    var lin1=true;
    var lin2=true;
    var lin3=true;
    

    for (let i = 0; i < carton.length; i++) {
        if (carton[i].valor!="X" && carton[i].fila==1) {
            lin1=false;
        }
        if (carton[i].valor!="X" && carton[i].fila==2) {
            lin2=false;
        }
        if (carton[i].valor!="X" && carton[i].fila==3) {
            lin3=false;
        }
    }
    if (lin1 && !linea1){
        linea1=true;
    }
    if (lin2==true && linea2==false){
        linea2=true;
    }
    if (lin3==true && linea3==false){
            linea3=true;
    }
    if((linea1==true || linea2==true || linea3==true) && lineax==false){
        alert("LINEAAAAAA");
        lineax=true;
    }
}

function confirmCarton() {
    var resp=prompt("Quieres este Carton? (Yes, No)" );
    if (resp.toUpperCase()=="YES") {return true;
    }else {
        carton.splice(0,15);
        return false;}
}


//FUNCIONES RELACIONADAS CON JUGADOR/PUNTUACION
function ranking(nombre) {
    jugadores.push({name: nombre, point: (100 - turnos)});
    console.log("Hola "+nombre+ " has tardado "+turnos+" turnos! Tu puntuacion es: "+(100-turnos)+" puntos!");
    console.log("Ranking de jugadores:");
    jugadores.sort(function(a, b) {
        return b.point - a.point;    //modificando cosillas de internet!
      });
      for (let i = 0; i < jugadores.length; i++) {
          console.log((i+1)+"- " + jugadores[i].name + " y su puntuacion: "+jugadores[i].point);
          
      }
      
}

function jugarOtra(params) {
var rep=prompt("quieres jugar otra vez?(s/n)");
if(rep.toUpperCase()=="S"){ // Si es "S" limpiar todos los valores y lanzar otra vez
turnos=0;
pantalla="|"
linea1=false;
linea2=false;
linea3=false;
galeriaNum.splice(0,99);
carton.splice(0,15);
bingo();
}else{
    console.log("Nos vemos pronto!!!!");
}
}