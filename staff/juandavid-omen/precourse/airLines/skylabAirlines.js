var flights = [
    { id : 00 , to : 'Bilbao' , from : 'Barcelona' , cost : 1600 , scale : false },
    { id : 01 , to : 'New York' , from : 'Barcelona' , cost : 700 , scale : false },
    { id : 02 , to : 'Los Angeles' , from : 'Madrid' , cost : 1100 , scale : true },
    { id : 03 , to : 'Paris' , from : 'Barcelona' , cost : 210 , scale : false },
    { id : 04 , to : 'Roma' , from : 'Barcelona' , cost : 150 , scale : false },
    { id : 05 , to : 'London' , from : 'Madrid' , cost : 200 , scale : false },
    { id : 06 , to : 'Madrid' , from : 'Barcelona' , cost : 90 , scale : false },
    { id : 07 , to : 'Tokyo' , from : 'Madrid' , cost : 1500 , scale : true },
    { id : 08 , to : 'Shangai' , from : 'Barcelona' , cost : 800 , scale : true },
    { id : 09 , to : 'Sydney' , from : 'Barcelona' , cost : 150 , scale : true },
    { id : 10 , to : 'Tel-Aviv' , from : 'Madrid' , cost : 150 , scale : false }
    ];

function showFligths() {

    for (flight of flights) {
        var scale = '';
        if (flight.scale === true) {
            scale = 'realiza alguna';
        } else {
            scale = 'no realiza ninguna';
        }
        console.log(`El vuelo con origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${scale} escala.`)
    }
}

function averageCost() {
    var sum = 0;
    for (var i = 0; i < flights.length; i++) {
     sum += flights[i].cost;
    }
    var totalAverageCost = sum / flights.length;
    return totalAverageCost.toFixed(3);
}
function flightsScale() {
    var withScale = 0;
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].scale) {
          withScale++;
        } 
    }
    return withScale;
}

function lastFlights() {
    var lastFlightsOfTheDay = '';
    for (var i = flights.length - 1; i > 5; i--) {
        lastFlightsOfTheDay += flights[i].to;
        if (i > 5 + 1) {
            lastFlightsOfTheDay += ', ';
        }
    } 
    return lastFlightsOfTheDay;
}

function skylabAirlines() {
    console.log('Su nombre por favor.');
    var userName = 'juan'.toLocaleUpperCase();
    console.log(`Sr/a ${userName} sea bienvenido/a. \nEstos son los vuelos disponibles para el dia de hoy: `);
    showFligths();
    console.log(`Sr/a ${userName} el coste medio de los vuelos es: ${averageCost()}€, ${flightsScale()} vuelos son los que realizan escala y \nestos son los ultimos vuelos del dia: ${lastFlights()}.`);
}
skylabAirlines();