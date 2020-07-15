// JS SKYLAB AIRLINES - SkyLab Coders

// LISTA DE VUELOS

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

// COSTES

var costAverage = 0;
var costSum = 0; 

// PROGRAMA

askUsername();

displayFlights();

displayAverage();

displayNumScales();

last5Flights();

// FUNCIONES

// Se preguntará por el nombre de usuario y dará la bienvenida.


function askUsername() {
    var username = '';

    while (username.length <= 0) {
        username = prompt('Por favor introduce tu USUARIO.');
        if (username.length > 0) {
            alert('Es un placer verte de nuevo ' + username + '!')
        } else {
            alert('Este USUARIO no es válido.')
        }
    }
}

// El usuario visualizará todos los vuelos disponibles de una forma amigable : El
//      vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no
//      realiza ninguna escala.

function displayFlights() {
    console.log('********************');
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].scale == false) {
            console.log(
                flights[i].id +
                ': El vuelo con origen: ' +
                flights[i].from +
                ', y destino: ' +
                flights[i].to +
                ' tiene un coste de ' +
                flights[i].cost +
                '€ y no realiza ninguna escala.'
            )
        } else {
            console.log(
                flights[i].id +
                ': El vuelo con origen: ' +
                flights[i].from +
                ', y destino: ' +
                flights[i].to +
                ' tiene un coste de ' +
                flights[i].cost +
                '€ y sí realizará escala.'
            )
        }
    }
    console.log('********************');
} 

// A continuación, el usuario verá el coste medio de los vuelos.

function displayAverage() {
    for (var i = 0; i < flights.length; i++) {
        costSum += flights[i].cost;
    }

    costAverage = costSum / flights.length;
    costAverage = parseFloat(costAverage.toFixed(2))

    console.log('')
    console.log(
        'El coste medio de los vuelos de hoy es: ' + 
        costAverage + 
        '€ .'
    )
}

// También podrá ver cuántos vuelos efectúan escalas.

function displayNumScales() {
    // get num scales
    var numScales = 0;

    for (var i = 0; i < flights.length; i++) {
        if (flights[i].scale == true) {
            numScales++;
        }
    }
    // log the text
    console.log('')
    console.log(
        'Les informamos de que ' +
        numScales +
        ' de los ' +
        flights.length +
        ' vuelos programados para hoy, realizarán escala.'
    )
}

// Sabiendo que los últimos 5 vuelos (los últimos 5 ID's) son los últimos del día,
//      muestra al usuario sus destinos.

function last5Flights() {
    console.log('')
    console.log('Los últimos 5 vuelos de hoy son dirección: ')
    
    for(var i = flights.length -5; i < flights.length; i++) {
        console.log('   ● ' + flights[i].to)
    }

    console.log('')
    console.log('Gracias por confiar en SkyLab Airlines - Hasta pronto!')
}
