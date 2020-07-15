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
//global variable for the search price of menu user
var search;

//RUN PROGRAM
program();


//Principal Menu
function program() {
    welcome()
    do {
        var firstMenu = prompt('Hola ' + name + ' elija una de seguintes opciones:\n1 - Mostrar Vuelos.\n2 - Mostar vuelos que efecuan escalas.\n3 - Coste Medio de vuelos.\n4 - Mostar los ultimos vuelos del dia.\n5 - Configuracion.\n\nexit - Salir.\nNota: Los valores salen por consola!').toLowerCase();
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
            case '5':
                configuration()
                break;
            case 'exit':
                alert('Gracias por utilizar el programa Airlines!!!')
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo');
                break;
        }
    } while (firstMenu !== 'exit')

}
//Menu of Configuration
function configuration() {
    do {
        var configurationMenu = prompt('Quieres entrar como usuario o administrador? USER/ADMIN\nexit - Salir').toLowerCase();
        switch (configurationMenu) {
            case 'user':
                user()
                break;
            case 'admin':
                admin()
                break;
            case 'exit':
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo!');
                break;
        }
    } while (configurationMenu !== 'exit');
}
//Menu administrator
function admin() {
    do {
        var adminMenu = prompt('CONFIGURACIÓN ADMINISTRADOR:\n1 - Crear Vuelos.\n2 - Eliminar Vuelos.\n3 - Mostrar Vuelos.\nexit- Salir.');
        switch (adminMenu) {
            case '1':
                creatFlights();
                break;
            case '2':
                deleteFlights();
                break;
            case '3':
                showFlights();
                break;
            case 'exit':
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo');
                break;
        }
    } while (adminMenu !== 'exit');

}
//Menu User
function user() {
    do {
        var userMenu = prompt('CONFIGURACIÓN Usuario:\n1 - Buscar por precio.\n2 - Comprar.\n3 - Mostrar Vuelos.\nexit- Salir.');
        switch (userMenu) {
            case '1':
                searchPrice();
                break;
            case '2':
                buyFlights();
                break;
            case '3':
                showFlights();
                break;
            case 'exit':
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo');
                break;
        }
    } while (userMenu !== 'exit');
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
    mediumCost = (mediumCost / flights.length).toFixed(2);
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

//FUNCTION ADMIN

//Function creatObjectFlight 
function creatObjectFligth() {
    return {
        id: parseInt(prompt('Introduce el id!')),
        to: prompt('Introduce el destino!'),
        from: prompt('introduce la origen!'),
        cost: parseInt(prompt('Introduce el coste!')),
        scale: boolean()
    };
};
//Function of scale to create a flight
function boolean() {
    do {
        var bool = prompt('Introduce se hace escala! y/n').toLocaleLowerCase();
        if (bool === 'y') {
            return true;
        } else if (bool === 'n') {
            return false;
        }
    } while (bool !== 'y' && bool !== 'n');
}
// Function creatFlights
function creatFlights() {
    if (flights.length < 16) {
        flights.push(creatObjectFligth());
        console.log('****** El vuelo ha sido creado!*********')
    } else {
        alert('No se puede crear mas vuelos!');
    }
};
//Function choise number of the flight to DeleteFlights
function deleteFlights() {
    do {
        var id = parseInt(prompt('Introduce el número de vuelo para borrar el vuelo!'));
        var anyId = true;
        for (var i = 0; i < flights.length; i++) {
            if (flights[i].id === id) {
                if (flights.length > 0) {
                    anyId = false;
                    deleteFlightById(id);
                } else {
                    alert('No se pueden borrar más vuelos');
                }
            }
        }
        if (anyId) {
            alert('No existe el número de vuelo ' + id + ' !');
        }
    } while (id * 1 !== id);
}

//Function deleteFlightsById
function deleteFlightById(ide) {
    var nFligth = ide;
    var i = 0;
    for (i; i < flights.length; i++) {
        if (flights[i].id == ide) {
            flights.splice(i, 1);
        }
    }
    console.log('********** Vuelo nº: ' + nFligth + ' - Fue eliminado! *********');
}

//FUNCTION USER

//Function SearchPrice
function searchPrice() {
    do {
        search = parseInt(prompt('Introduce el precio que desea buscar!'));
    } while (search * 1 !== search);
    menuPrice();
}

//Function of mennu to chose diferents prices of flights
function menuPrice() {
    do {
        var optionSearchMenu = prompt('BUSCAR POR PRECIO:\n1 - Más alto.\n2 - Más bajo.\n3 - Igual.\nexit- Salir.');
        switch (optionSearchMenu) {
            case '1':
                highPrice();
                break;
            case '2':
                lowerPrice();
                break;
            case '3':
                samePrice();
                break;
            case 'exit':
                break;
            default:
                alert('La opcion introducida no es correcta! Vuelva a intentarlo');
                break;
        }
    } while (optionSearchMenu !== 'exit')
}
//Function highPrice
function highPrice() {
    console.log('VALOR MÁS ALTO:');
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].cost > search) {
            if (flights[i].scale) {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
            } else {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
            };

        }
    }
    console.log('******************************************');
}


//Function lowerPrice
function lowerPrice() {
    console.log('VALOR MAS BAJO:');
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].cost < search) {
            if (flights[i].scale) {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
            } else {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
            };

        };
    }
    console.log('******************************************');
}

//Function samePrice
function samePrice() {
    console.log('VALOR PARECIDO:');
    var anySearch = true;
    for (var i = 0; i < flights.length; i++) {
        if (flights[i].cost >= (search - 100) && flights[i].cost <= (search + 100)) {
            if (flights[i].scale) {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
                anySearch = false;
            } else {
                console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
                anySearch = false;
            };

        }
    }
    if (anySearch) {
        alert('No fue encontrado ningun vuelo con el precio aproximado de ' + search + '€ aproximado!\n Vuelva a introducir una nova busqueda!')
    }

    console.log('******************************************');
}

//Function BuyFlights
function buyFlights() {
    do {
        var buy1 = prompt('quiere comprar?y/n').toLowerCase();
        if (buy1 === 'y') {
            do {
                var anyId = true;
                var buy2 = parseInt(prompt('Introduce el número del vuelo que quiere comprar!'));
                for (var i = 0; i < flights.length; i++) {
                    if (flights[i].id == buy2) {
                        if (flights[i].scale) {
                            console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y efectua escala\n');
                        } else {
                            console.log(flights[i].id + ' : El vuelo con origen: ' + flights[i].from + ' y con destino: ' + flights[i].to + ' tiene un coste de ' + flights[i].cost + '€, y no efectua escala\n');
                        };
                        console.log('Gracias por su compra, vuelva pronto.');
                        deleteFlightById(buy2);
                        anyId = false;
                        console.log('******************************************');
                    }
                }
                if (anyId) {
                    alert('No existe el número de vuelo ' + buy2 + ' !');
                }
            } while (buy2 * 1 !== buy2);
        }
    } while (buy1 !== 'y' && buy1 !== 'n');
}