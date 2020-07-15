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
  
function showFlights() {
    for (flight of flights) {
        var scale = '';
        if (flight.scale) {
            scale ='realiza escala';
        } else {
            scale ='no realiza ninguna escala';
        }
        console.log(`El vuelo con origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${scale}.`);   
    }
}

function averageCost() {
    var sum = 0;
    for (flight of flights) {
        sum += flight.cost;
    }

    var average = (sum / flights.length).toFixed(3);
    console.log(`El coste medio de los vuelos es: ${average}`);
}

function scaleFlightsCount() {
    var flightsCount = 0;
    for (flight of flights) {
        if(flight.scale) {
            flightsCount++;
        }
    }
    console.log(`${flightsCount} vuelos efectúan escala.`);
}

function showLastFlightsDestinations() {
    var flightsDestinations = '';
    for (var i = flights.length - 1; i > 5; i--){
        flightsDestinations += flights[i].to;
        if (i > 5 + 1){
            flightsDestinations += ', ';
        } 
    }
    console.log(`Estos son los ultimos 5 vuelos del dia y sus destinos son: ${flightsDestinations}.`)
}

function skyAirlines() {
    var userName = prompt('Escribe tu nombre por favor.'); 
    console.log(`Sr/a ${userName}, sea bienvenido/a a SkyAirlines`);
    showFlights();
    averageCost();
    scaleFlightsCount();
    showLastFlightsDestinations();
}
skyAirlines();