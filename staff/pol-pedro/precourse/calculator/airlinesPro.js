var welcome = () => user = prompt('Introduce tu Usuario:'); // entrada del nombre de usuario 
var adminUser = () => { //funcion para controlar admin o user
    var level;
    do {
        level = prompt ('Eres ADMIN o USER ?');
        level = level.toUpperCase();
        if (!(level === 'ADMIN' || level === 'USER')) {
            console.log ('Tienes que introducir ADMIN o USER');
        }
    }while (!(level === 'ADMIN' || level === 'USER'));
    return level;
}
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
        console.log ('El vuelo de ID: ' + flights[i].id + ' con origen: ' + flights[i].from + ' y destino a: ' + flights[i].to 
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
var lastFlights = () => { // ultimos 5 vuelos
    var i = (flights.length - 5);
    for (i; i < flights.length; i++){
        console.log('El vuelo con el id numero: ' + i + ' tiene como destino: ' + flights[i].to);
    }
}
var nameVer = (name) => { // controlamos el origen y el destino introducidos
    for (var i in name) {
        if (!((name[i] >= 'a' && name[i] <= 'z') || (name[i] >= 'A' && name[i] <= 'Z'))){
            return false;
        }
    }
    return true;
}
var nameStandar = (name) => { // corregimos la escritura de los nombres
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
}
var nameNewFlight = (cont) => { // funcion para introducir el nombre de nuevos vuelos
    var test;
    do{
        newFlight = prompt ('Origen');
        test = nameVer (newFlight);
        if (test === false) {
            console.log ('Datos erroneos el nombre de origen o destino solo puede tener letras');
        }
    }while (test === false);
    flights[cont].from = nameStandar (newFlight);
    do{
        newFlight = prompt ('Destino');
        test = nameVer (newFlight);
        if (test === false) {
            console.log ('Datos erroneos el nombre de origen o destino solo puede tener letras');
        }
    }while (test === false);
    flights[cont].to = nameStandar (newFlight);
}
var bool = (val) => { // transforma strings a booleanos
    if (val === 'true') {
        return true;
    }
    else {
        return false;
    }
}
var higherPrice = (flightMemori, price) => { //ordena el string flightMemori hasta price en orden decrecienete
    var ver = true;
    for (var i in flights) {
        if (flights[i].cost >= price){  
            if (ver === true){
                flightMemori[0] = flights[i]
                ver = false;  
            }
            else{
                if (flights[i].cost >= flightMemori[0].cost) {
                    flightMemori.unshift(flights[i]);
                    continue;
                }
                else if (flights[i].cost < flightMemori[(flightMemori.length-1)].cost) {
                    flightMemori.push(flights[i]);
                    continue;
                }
                for (var g in flightMemori) {
                    if (flights[i].cost >= flightMemori[g].cost){
                        for (var contLoop = (flightMemori.length); contLoop > g; contLoop--){
                            flightMemori[contLoop] = flightMemori[contLoop-1];
                        }
                        flightMemori[g]=flights[i];
                        break;
                    }
                } 
            }
        }
    } 
    if (ver === false){
        return flightMemori;
    }
    else {
        console.log ('No hay vuelos con precios superiores a ' + price);
        return flightMemori[0] = false;
    }
}
var lowerPrice = (flightMemori, price) => {
    var ver = true;
    for (var i in flights) {
        if (flights[i].cost <= price){  
            if (ver === true){
                flightMemori[0] = flights[i]
                ver = false;  
            }
            else{
                if (flights[i].cost <= flightMemori[0].cost) {
                    flightMemori.unshift(flights[i]);
                    continue;
                }
                else if (flights[i].cost > flightMemori[(flightMemori.length-1)].cost) {
                    flightMemori.push(flights[i]);
                    continue;
                }
                for (var g in flightMemori) {
                    if (flights[i].cost <= flightMemori[g].cost){
                        for (var contLoop = (flightMemori.length); contLoop > g; contLoop--){
                            flightMemori[contLoop] = flightMemori[contLoop-1];
                        }
                        flightMemori[g]=flights[i];
                        break;
                    }
                } 
            }
        }
    } 
    if (ver === false){
        return flightMemori;
    }
    else {
        console.log ('No hay vuelos con precios inferiores a ' + price);
        return flightMemori[0] = false;
    }
}
var moreLess = () => { // Gestiona las opciones del usuario
    var price, id, opcion;
    var ver = true;
    var flightMemori = [];
    price = Number(prompt ('Precio al que comparar:'));
    do {
        opcion = Number(prompt ('(1) Mas alto | (2) Mas bajo | (3) Igual'));
        if (opcion === 1) {
            flightMemori = higherPrice (flightMemori, price); 
            //funcion info flight pero para flight memori
            var escale; 
            var i = 0;
            console.log ('\n\n');
            for (i in flightMemori){
                if (flightMemori[i].scale === true){ 
                    escale = ' y realiza una escala';
                }
                else {
                    escale = ' y no realiza ninguna escala';
                }
            console.log ('El vuelo con origen: ' + flightMemori[i].from + ' y destino a: ' + flightMemori[i].to 
            + ' tiene un coste de: ' + flightMemori[i].cost + escale);
            }
        }
        else if (opcion === 2) {
            flightMemori = lowerPrice (flightMemori, price); 
            //funcion info flight pero para flight memori
            var escale; 
            var i = 0;
            console.log ('\n\n');
            for (i in flightMemori){
                if (flightMemori[i].scale === true){ 
                    escale = ' y realiza una escala';
                }
                else {
                    escale = ' y no realiza ninguna escala';
                }
            console.log ('El vuelo con origen: ' + flightMemori[i].from + ' y destino a: ' + flightMemori[i].to 
            + ' tiene un coste de: ' + flightMemori[i].cost + escale);
            }
        }
        else if (opcion === 3) {
            var cont = 0;
            for (var i in flights) {
                if (flights[i].cost === price){
                    flightMemori[cont] = flights[i];
                    cont ++;
                }
            }
            if (cont != 0) {
                //funcion info flight pero para flight memori
                var escale; 
                var i = 0;
                console.log ('\n\n');
                for (i in flightMemori){
                    if (flightMemori[i].scale === true){ 
                        escale = ' y realiza una escala';
                    }
                    else {
                        escale = ' y no realiza ninguna escala';
                    }
                console.log ('El vuelo con origen: ' + flightMemori[i].from + ' y destino a: ' + flightMemori[i].to 
                + ' tiene un coste de: ' + flightMemori[i].cost + escale);
                }
            }
            else {
                console.log ('No hay ningun vuelo con ese precio');
                flightMemori[0] = false;
            }
        }
        else {
            console.log ('Tinene que introducir 1, 2 o 3');
        }
    } while (!(opcion === 1 || opcion === 2 || opcion === 3));
    if (flightMemori[0] != false) {
        do {
            id = Number(prompt ('Id del vuelo que quieres comprar: '));
            for (var g in flightMemori) {
                if (flightMemori[g].id === id) {
                    ver = false;
                }
            }
            if (ver === true){
                console.log ('No hay ningun vuelo con ese id intentalo de nuevo');
            }
    
        }while (ver === true);  
        console.log ('Gracias por su compra y hasta la proxima');
    }
}
var changeFlights = () => { // funcion que gestiona las funciones del admin
    var newFlight, test;
    do{
        var cont = flights.length;
        var select = prompt('Introducir vuelos (1) / Borrar vuelos (2) / salir (3):');
        if (select === '1'){
            if (cont > 15){
                alert();
            }
            else {
                flights[cont] = { id: cont, to: '', from: '', cost: 00 , scale: false };
                nameNewFlight (cont); //nombres destino y origen de los nuevos vuelos
                do{ //precio del nuevo vuelo
                    newFlight = Number(prompt ('Precio:'));
                    if (Number.isNaN(newFlight)) {
                        console.log ('Tines que introducir un numero');
                    }
                }while (Number.isNaN(newFlight));
                flights[cont].cost = newFlight.toFixed(0); 
                do { //escala del nuevo vuelo
                    newFlight = prompt ('escala:');
                    if (!(newFlight === 'true' || newFlight === 'false')) {
                        console.log ('Tines que introducir true o false');
                    }
                }while((!(newFlight === 'true' || newFlight === 'false')));

                flights[cont].scale = bool(newFlight);  
            }
        }
        if (select === '2') {
           var id = Number(prompt ('ID del vuelo que quieres borrar: '));
           delete flights[id];
        }
        console.log ('===================================================\n');
        flightInfo ();
    }while (select !== '3');

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
var user, level;
welcome (); //pormpt user name 
console.log ('Bienvenido ' + user + ' a skylab airlines !!! \n\nInformacion de todos los vuelos:');
flightInfo (); // log flight info
avrg = standPrice().toFixed(2); //guardamos la media del precio de todos los vuelos
console.log('\n\nPrecio medio de los vuelos: ' + avrg);
console.log('\n\nLos vuelos que realizan escalas son: ');
numScales();
console.log('\n\nEl destino de los ultimos 5 vuelos son: ');
lastFlights();
level = adminUser();
if (level === 'ADMIN') {
     changeFlights ();
}
else {
    moreLess();
}

