// ============== Program AirLines ================
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
var name;
//RUN PROGRAM
program();

//PROGRAM
function program() {

    welcome()

    do {
        var firstMenu = prompt('Hola ' + name + ' eleija una de seguintes opciones:\n1 - Mostrar Vuelos.\n2 - Mostar vuelos que efecuan escalas.\n3 - Coste Medio de vuelos.\n4 - Mostar los ultimos vuelos del dia.\nexit - Escriba exit para salir.\n\nNota: Los valores salen por consola!');
        switch (firstMenu) {
            case '1':
                showFlights();
                break;
            case '2':
                scale();
                break;
            case '3':
                mediumCost();
                break;
            case '4':
                showLastFligths();
                break;
            case 'exit':
                alert('Gracias!!!')
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo');
                break;
        }
    } while (firstMenu !== 'exit')

}

//***************************
//**** FUNCTIONS ************
//***************************

//Welcome
function welcome() {

    do {
        name = prompt('Bienvenido al programa Airlines!\nIntroduzca su nombre?');
    } while (!name)

}

//Show al Flights
function showFlights() {
    var i = 0;
    console.log('LISTA DE VUELOS :\n')
    for (i; i < flights.length; i++) {

        if (flights[i].scale) {
            console.log('Vuelo nº: ' + flights[i].id + ' - El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
        } else {
            console.log('Vuelo nº: ' + flights[i].id + ' - El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
        }
    }
    console.log('******************************************');
}
//Calculate mediumCost
function mediumCost() {
    var i = 0;
    var mediumCost = 0;
    for (i; i < flights.length; i++) {
        mediumCost += flights[i].cost;
    }
    mediumCost = (mediumCost / flights.length).toFixed(3);
    console.log('El coste medio de los vuelos es :' + mediumCost + ' €.\n******************************************');
}
//Show fligths who make scale
function scale() {
    var i = 0;
    console.log('VUELOS CON ESCALA :\n');
    for (i; i < flights.length; i++) {
        if (flights[i].scale) {
            console.log('Vuelo nº: ' + flights[i].id + ' - El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
        };
    }
    console.log('******************************************');
}
//Show the last Flights of the day
function showLastFligths() {
    var i = flights.length - 1;
    console.log('ULTIMOS DESTINOS DEL DIA :\n');
    for (i; i > 0; i--) {
        if (i > flights.length - 6) {
            if (flights[i].scale) {
                console.log('Vuelo nº: ' + flights[i].id + ' - El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
            } else {
                console.log('Vuelo nº: ' + flights[i].id + ' - El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
            };
        };
    };
    console.log('******************************************');
};