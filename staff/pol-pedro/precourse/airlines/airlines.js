var welcome = () => user = prompt('Introduce tu Usuario:'); // entrada del nombre de usuario 
var flightInfo = () => { // log de la informacion de los vuelos
    var escale;
    var i = 0;
    for (i in flights){
        if (flights[i].scale === true){ 
            escale = ' y realiza una escala';
        }
        else {
            escale = ' y no realiza ninguna escala';
        }
        console.log ('El vuelo con origen: ' + flights[i].from + ' y destino a: ' + flights[i].to 
        + ' tiene un coste de: ' + flights[i].cost + escale);
    }
}
var standPrice = () => { // calculo del precio medio de los vuelos
    var eq = 0;
    var i = 0;
    for (i in flights) {
        eq += flights[i].cost;
    }
    i++;
    return (eq / i);
}
var numScales = () => { // cuenta cuantos vuelos hay con escacala
    for (var i in flights) {
        if (flights[i].scale === true){
            console.log ('El vuelo con origen: ' + flights[i].from + ' y destino a: ' + flights[i].to 
            + ' tiene un coste de: ' + flights[i].cost + ' y realiza una escala');
        }
    }
}
var lastFlights = () => {
    var i = (flights.length - 5);
    for (i; i < flights.length; i++){
        console.log('El vuelo con el id numero: ' + i + ' tiene como destino: ' + flights[i].to);
    }
}
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

// ---- Principio del programa ----
var user;
var avrgPrice;
welcome (); //pormpt user name 
console.log ('Bienvenido ' + user + ' a skylab airlines !!! \n\nInformacion de todos los vuelos:');
flightInfo (); // log flight info
avrg = standPrice().toFixed(2); //guardamos la media del precio de todos los vuelos
console.log('\n\nPrecio medio de los vuelos: ' + avrg);
console.log('\n\nLos vuelos que realizan escalas son: ');
numScales();
console.log('\n\nEl destino de los ultimos 5 vuelos son: ');
lastFlights();