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
var stetic="____";
var semaforo=true;
var compras=[]; //guarda los Id de los vuelos que se pueden comprar


bienvenida();


//Funciones del programa basico
//vuelos();
//mediaPrecios();
//escala();
//ultimos();

//Funciones del programa PRO
//admin();
//usuario();
//soloLetras();
//crearVuelo();
//borrarVuelo();
//billete();

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
    for (var index = 0; index < bienve.length; index++) {
        stetic+="_";  
    }
    console.log(stetic);
    var categoria=prompt("Eres administrador o user?(a/u)");
    if(categoria.toUpperCase()==="A"){
        console.log("** MODO ADMIN **");
        admin();
    }else{
        console.log("** MODO USER **");
        usuario();
    }
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
    console.log("====> VUELOS DIARIOS <====")
for(n in flights){
    if(flights[n].scale==false ){
    console.log("ID: " + flights[n].id +" El vuelo con origen: " + flights[n].to + " y destino: " + flights[n].from + " tiene un coste de " + flights[n].cost + " y NO realiza ninguna escala.");
    }else  {
        console.log("ID: " + flights[n].id +" El vuelo con origen: " + flights[n].to + " y destino: " + flights[n].from + " tiene un coste de " + flights[n].cost + " y realiza escala.");
} 

}
}
function mediaPrecios(){
    var resultSum=0
 for (n in flights){
     resultSum += flights[n].cost;
 }
 var resultMedia=resultSum/flights.length
 console.log(" *** La media de precios de estos vuelos es: "+resultMedia.toFixed(2)+ " euros.  ***");
}

function escala(){
    
    var opt = prompt("Deseas ver los vuelos con escala?(s/n)","s");
    if (opt=="s") {
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
 function admin() { 
        
    var pregun = prompt("Quieres crear o eliminar vuelos?(c/e) o escribe salir",);
      switch (pregun.toUpperCase()) {
            case "C":
              crearVuelo();
              break;
            case "E":
                borrarVuelo();
                break;   
            case "SALIR":
                
                break;
            default:
                alert("Escribe c/e o salir!")
                admin()
              break;
      }
      
 
        
    }
function crearVuelo() {
    if(flights.length>15){
        alert("Limite sobrepasado,elimina algun vuelo!");
        admin();
        return false;
    }
    var destino = prompt("El vuelo tiene Destino: ");
    soloLetras(destino);
    while(semaforo==false || destino=="") {
        alert("NO ESCRIBAS NUMEROS!");
        destino = prompt("El vuelo tiene Destino: ");
        soloLetras(destino);
    }
    var desde = prompt("El origen del vuelvo es: ");
    soloLetras(desde);
    while(semaforo==false || desde=="") {
        alert("NO ESCRIBAS NUMEROS!");
        desde = prompt("El origen del vuelvo es: ");
        soloLetras(desde);
    }
    var coste = parseFloat(prompt("Precio del vuelo:"));
    while (isNaN(coste) || coste=="") {
        alert("NO ESCRIBAS LETRAS!!");
        coste = parseFloat(prompt("Precio del vuelo:"));
    }
    var escala = prompt("tiene escala? (s/n)");
    if (escala.toUpperCase()=="S") {
        flights.push({id: flights.length, to: destino, from: desde, cost: coste, scale: true});
    } else{
    flights.push({id: flights.length, to: destino, from: desde, cost: coste, scale: false});
    }
    console.log("vuelo creado....")
    vuelos();
    
    var pregun = prompt("Quieres seguir creando vuelos? (s/n)");

    if (pregun.toUpperCase() == "S" ) {
        crearVuelo();
    } else {
        admin();
        
    }
    
}

function borrarVuelo() {
    vuelos();
    var ide=prompt("Que ID tiene el vuelo que quieres eliminar?");
    while (isNaN(ide) || ide=="") {
        alert("Solo numeros!");
        ide=prompt("Que ID tiene el vuelo que quieres eliminar?");
    }
    for (let index = 0; index < flights.length; index++) {
        if(flights[index].id==ide){
            flights.splice(index,1);
        }
    }
    // reorganizar los ID;
    //for (let index = 0; index < flights.length; index++) {
       //     flights[index].id=index;
    //}
    console.log("vuelo borrado.....");
    vuelos();
    var opt=prompt("Quieres borrar mas vuelos?(s/n)");
    if (opt.toUpperCase()=="S") {
        borrarVuelo(); 
    }else {
        admin();
    }
}

function usuario() {
    var precio=prompt("Escoge el precio:");
    while (isNaN(precio)) {
        alert("solo numeros!");
        precio=prompt("Escoge el precio:");
    }
    var opt=prompt("Escribe  mayor/igual/menor  para filtrar los precios:");
    switch (opt.toUpperCase()) {
        case "MAYOR":
        for (let index = 0; index < flights.length; index++) {
            if (flights[index].cost>precio) {
                compras.push(flights[index].id);
                console.log(" ID DEL VUELO: " + flights[index].id + " El vuelo con origen: " + flights[index].to + " y destino: " + flights[index].from + " tiene un coste de " + flights[index].cost);
            }
        }
        billete();
            break;
        case "MENOR":
            for (let index = 0; index < flights.length; index++) {
                if (flights[index].cost<precio) {
                    compras.push(flights[index].id);
                    console.log(" ID DEL VUELO: " + flights[index].id + " El vuelo con origen: " + flights[index].to + " y destino: " + flights[index].from + " tiene un coste de " + flights[index].cost);
            }    
        }
        billete();
            break;
        case "IGUAL":
            for (let index = 0; index < flights.length; index++) {
                if (flights[index].cost==precio) {
                    compras.push(flights[index].id);
                    console.log(" ID DEL VUELO: " + flights[index].id + " El vuelo con origen: " + flights[index].to + " y destino: " + flights[index].from + " tiene un coste de " + flights[index].cost);
                }  
            }
            billete();
            break;
        default:
            usuario();
            break;
    }
}

function billete() { //Comprar el vuelo
    var conditi=false;
    var comprar=prompt("Que vuelo deseas comprar? Inserta el ID!");
    for (let index = 0; index < compras.length; index++) {
            if (comprar==compras[index]) {
                conditi=true;
            };
        
    }
    if (isNaN(comprar) || conditi==false) {
        alert("Solo numeros que existan en el filtro!");
        billete();
    }else{
        console.log("Muchas gracias por su compra");
    }
}