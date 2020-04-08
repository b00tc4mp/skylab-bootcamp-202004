const MAX_FLIGHT = 15;

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
    for (var i = flights.length - 1; i > 5; i--) {
        flightsDestinations += flights[i].to;
        if (i > 5 + 1){
            flightsDestinations += ', ';
        } 
    }
    console.log(`Estos son los ultimos 5 vuelos del dia y sus destinos son: ${flightsDestinations}.`)
}

function getCostFlight() {
    var costFlight;
    do {
        var costInput = prompt('Escribe el costo');
        
        if( costInput === null) {
            return null;
        }

        costFlight = parseFloat(costInput);
        
        if(isNaN(costFlight)) {
            alert(`el valor: ${costInput} no es numerico`)
        }
    } while(!costFlight);
    return costFlight;
}

function searchFlightsByPrice(price, searchPrice) {
    var searchResults = [];
    for (var i = 0; i < flights.length; ++i) {
        if ((flights[i].cost > price && searchPrice == 1) 
        || (flights[i].cost < price && searchPrice == 2)
        || (flights[i].cost == price && searchPrice == 3)) {
            searchResults.push(flights[i]);
        }
    }
    return searchResults;
}

function searchBy(id, flights) {
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].id == id) {
            return i;
        } 
    }
    return -1;
}

function doUserOption() {
    var price = getCostFlight();
    var searchPrice = prompt(`Elige una opcion:\n1.Mayor que ${price}€.\n2.Menor que ${price}€.\n3.Igual que ${price}€.`);
    if (searchPrice != 1 && searchPrice != 2 && searchPrice != 3) {
        alert(`La opción de búsqueda ${searchPrice} es incorrecta`);
        return;
    }
    var searchResults = searchFlightsByPrice(price, searchPrice);

    console.log(searchResults);

    var buyId = prompt('Indica el ID del vuelo que quieres comprar');
    if (searchBy(buyId, searchResults) === -1) {
        alert(`El vuelo con el ID '${buyId}' no existe`);
    } else {
        alert(`Has comprado el vuelo con ID: ${buyId}, Gracias por su compra. `)
    }

}

function getFromFlight() {
    var fromFlight; 
    do {
        fromFlight = prompt('Escribe el origen');
        if( fromFlight === null) {
             break;
        }
        if(fromFlight === '') {
            alert(`${fromFlight} No se asignado un valor`)
        }
    } while(!fromFlight);
    return fromFlight;
}

function getToFlight() {
    var toFlight; 
    do {
        toFlight = prompt('Escribe el destino');
        if( toFlight === null) {
            break;
       }
    
        if(toFlight === '') {
            alert(`${toFlight} No se asignado un valor`)
        }
    } while(!toFlight);
    return toFlight;
}

function createNewId() {
    if (flights.length == 0) {
        return 0;
    }
    var lastFlightId = flights[flights.length - 1].id;
    return lastFlightId + 1;
}

function createFlight() {
    
    if (flights.length === MAX_FLIGHT) {
        alert('No puedes crear mas vuelos')
    } else {  
        var id = createNewId();
        var from = getFromFlight();
        if (from == null) {
            throw "El origen no puede estar vacío";
        }
        var to = getToFlight();
        if (to == null) {
            throw "El destino no puede estar vacío";
        }
        var cost = getCostFlight();
        if (cost == null) {
            throw "El precio no puede estar vacío";
        }
        var scale = confirm('Tiene escala?');
        var flight = { 
            id: id,
            to: to,
            from: from,
            cost: cost,
            scale: scale,
        }
        flights.push(flight);
        alert('se ha creado el vuelo correctamente')
        console.log(flights);
    }
}


function removeFlight() {
    var id = prompt('Indica el numero de "ID" que quieres elimanar');
    var positionFlight = searchBy(id, flights);
    if (positionFlight === - 1){
        alert(`no se encuentra el vuelo con ID: ${id}.`)
    } else {
        flights.splice(positionFlight, 1);
        alert(`el vuelo con ID ${id} ha sido eliminado.`)
    }
    console.log(flights);
}

function doAdminOption() {
    var moreOperationsAdmin;
    do {
        var adminOption = prompt('Elige una opcion a realizar sobre los vuelos:\n1. Crear.\n2. Eliminar.\nIndica un numero!');
        
        if (adminOption === null) {
            break;
        }

        if (adminOption == 1) {
            try {
                createFlight();
            } catch(exception) {
                alert(`El vuelo no se ha podido crear: ${exception}`);
            }
        } else if (adminOption == 2) {
            removeFlight();
        } else {
            alert(`'${adminOption}' es una opcion incorrecta`)
        }
        
        moreOperationsAdmin = confirm("Deseas realizar más operaciones de admin?");
    } while(moreOperationsAdmin);
}

function doUserOrAdminOption() {
    var moreOptions;
    do { var userOrAdmin = prompt('Indica si eres: ADMIN/USER').toLowerCase();
        if (userOrAdmin === 'admin') {
            doAdminOption();
        } else if (userOrAdmin === 'user') {
            doUserOption();
        } else {
            alert(`'${userOrAdmin}' es un valor incorrecto.`);
        }

        moreOptions = confirm("Deseas realizar más operaciones?");
    } while (moreOptions);
}

function skyAirlines() {
    var userName = prompt('Escribe tu nombre por favor.'); 
    console.log(`Sr/a ${userName}, sea bienvenido/a a SkyAirlines`);
    showFlights();
    averageCost();
    scaleFlightsCount();
    showLastFlightsDestinations();
    doUserOrAdminOption();
}

skyAirlines();