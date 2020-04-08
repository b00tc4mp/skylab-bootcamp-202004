"use strick"

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];
var bienve="";
var stetic="______";
var semaforo=true;

bienvenida();
vuelos();
mediaPrecios();
escala();
ultimos();



//FUNCIONES

function bienvenida() {//llamamos a soloLetras() y si devuelve true nos muestra el nombre.

var user= prompt("Como te llamas?");
soloLetras(user);
while(semaforo==false || user=="") {
    alert("NO ESCRIBAS NUMEROS!")
    user= prompt("Como te llamas?");
    soloLetras(user);
}
console.log("SKYLAB AIRLINES")
bienve=("Bienvenido " + user);
console.log(bienve);
//lINEA ESTETICA (no queda muy bien);
for (let index = 0; index < bienve.length; index++) {
    stetic+="_";  
}
console.log(stetic);
}



function soloLetras (userr){//Recorre el nombre en busca de numeros
    semaforo=true;
    for (let index = 0; index < userr.length; index++) {
    if (isNaN(userr[index])) {
         
    }else {
    return semaforo=false;

    }
}
}



function vuelos(){
    
for(var n in flights){
    if(flights[n].scale==false ){
    console.log("El vuelo con origen: " + flights[n].to + " y destino: " + flights[n].from + " tiene un coste de " + flights[n].cost + " y NO realiza ninguna escala.");
    }else  {
        console.log("El vuelo con origen: " + flights[n].to + " y destino: " + flights[n].from + " tiene un coste de " + flights[n].cost + " y realiza escala.");
} 

}
}
function mediaPrecios(){
    var resultSum=0
 for (n in flights){
     resultSum += flights[n].cost;
 }
 var resultMedia=resultSum/flights.length
 console.log(" ***La media de precios de estos vuelos es: "+resultMedia.toFixed(2)+ " euros.  ***");
}

function escala(){
    
    var opt = prompt("Deseas ver los vuelos con escala?(s/n)","s");
    if (opt.toUpperCase()=="S") {
        console.log("*** Estos son los vuelos con escala:  ***");
        for (n in flights){
            if (flights[n].scale==true) {
                console.log("===>  El vuelo con origen: " + flights[n].to + " y destino: " + flights[n].from );
            }
        }
    }
}
function ultimos(){
    console.log("*** Los ultimos 5 vuelos tienen destino a...   ***");
    var arrayReves=flights.reverse();
    for (let i = 0; i < 5; i++) {
        console.log(arrayReves[i].to);
        
    }
}
