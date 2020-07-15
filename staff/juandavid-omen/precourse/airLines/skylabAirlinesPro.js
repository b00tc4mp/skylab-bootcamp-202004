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

const MAX_FLIGHTS = 15; 
function showFligths(flights) {
    for (flight of flights) {
        var scale = '';
        if (flight.scale === true) {
            scale = 'realiza alguna';
        } else {
            scale = 'no realiza ninguna';
        }
        console.log(`El vuelo con ID ${flight.id}, origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${scale} escala.`)
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

function getNewId() {
    var id = flights[flights.length - 1].id;
    id += 1;
    return id;
}

function createFlight() {
    if (flights.length === MAX_FLIGHTS) {
        alert('Has superado el limite de vuelos.');
    } else {
        var id = getNewId();
        var to = prompt('Escribe el destino');
        var from = prompt('Escribe el origen');
        var cost = prompt('Escribe el coste');
        var scale = confirm('Tiene escala?');
        var newFlight = {
            id : id , 
            to : to , 
            from : from, 
            cost : cost , 
            scale : scale 
        };
        flights.push(newFlight);
        alert('Has creado un nuevo vuelo.');
    }
}

function searchIndexFlight(id) {
    for(var i = 0; i < flights.length; i++) {
        if(flights[i].id == id) {
            return i;          
        } 
    }
    return -1;
}

function deleteFlight() {
    var deleteId = prompt('Indica el ID del vuelo a eliminar');
    var i = searchIndexFlight(deleteId);
    if ( i !== -1 ) {
        flights.splice(i, 1);
        alert(`El vuelo con el ID '${deleteId}' se ha eliminado.`);
    } else {
        alert(`El vuelo con el ID '${deleteId}' no se ha encontrado.`);
    }
}

function doAdminAction() {
    var moreActions;
    do { 
        var option = prompt('Que accion sobre los vuelos quieres ejecutar?\n1 - Crear vuelos.\n2 - Eliminar vuelos.\nIndica un numero.');
        switch(option) {
            case '1':
                createFlight();
                break;
            case '2':
                deleteFlight();
                break;
            default: 
                alert(`La opcion '${option}' no es correcta!`)
                break;
        }
        moreActions = confirm('Quieres realizar una nueva accion?');
    } while(moreActions);
    showFligths(flights);
}

function searchFlightsByPrice(price, priceFilter){
    var searchResults = [];
    for (var i = 0; i < flights.length; i++) {
        if (priceFilter === '1' && price < flights[i].cost) {
           searchResults.push(flights[i]);
        } else if (priceFilter === '2' && price > flights[i].cost) {
            searchResults.push(flights[i]);
        } else if (priceFilter === '3' && price === flights[i].cost) {
            searchResults.push(flights[i]);
        }
    }
    return searchResults;
}

function doUserAction() {
    var price = parseFloat(prompt('Con qué precio quieres filtrar los vuelos?'));
    var priceFilter = prompt(`Elige una opcion:\n1 - Mayor que ${price}€.\n2 - Menor que ${price}€.\n3 - Igual que ${price}€.`);
    var searchResults = searchFlightsByPrice(price, priceFilter);
    console.log("Estos són los resultados de la búsqueda:\n");
    showFligths(searchResults);
    if (searchResults.length === 0) {
        alert('No se encuentran resultados');
    } else {
        var idToBuy = parseFloat(prompt('Indica el ID del vuelo que quieres comprar.'));
        if (searchIndexFlight(idToBuy) !== -1) {
            alert('Gracias por su compra.');
        } else {
            alert(`El vuelo con el ID '${idToBuy}' no existe`);
        }
    }   
    alert('Adiós');   
}

function skylabAirlines() {
    var userName = prompt('Su nombre por favor.');
    userName = userName.toLocaleUpperCase();
    console.log(`Sr/a ${userName} sea bienvenido/a. \nEstos son los vuelos disponibles para el dia de hoy: `);
    showFligths(flights);
    console.log(`Sr/a ${userName} el coste medio de los vuelos es: ${averageCost()}€, ${flightsScale()} vuelos son los que realizan escala y \nestos son los ultimos vuelos del dia: ${lastFlights()}.`);

    var userRole = prompt('Indica si eres: ADMIN/USER');
    userRole = userRole.toLocaleUpperCase();
    if (userRole === 'ADMIN') {
        doAdminAction();
    } else if (userRole === 'USER'){
        doUserAction()
    } else {
        alert(`Este valor '${userRole}' no es correcto.`)
    }
}
skylabAirlines();