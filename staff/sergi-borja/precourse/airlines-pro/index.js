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


function createflight() {
    for (var i = 0; i < flights.length; i++) {
    }
    do {
        var to = prompt('Cuál es el destino del vuelo?');
    } while (!isNaN(to));
    do {
        var from = prompt('Cuál es el origen del vuelo?');
    } while (!isNaN(from));
    do {
        var cost = prompt('Cuál es el coste del vuelo?');
    } while (isNaN(cost));
    var scale = confirm('El vuelo tendrá alguna escala?');
    var newflight = {};
    newflight.id = i;
    newflight.to = to;
    newflight.from = from;
    newflight.cost = cost;
    newflight.scale = scale;
    flights.push(newflight);
}

function elimvols() {
    do {
        var eliminar = parseInt(prompt('Qué vuelo quieres eliminar? (Introduce la ID del vuelo)'));
    } while (isNaN(eliminar));
    flights.splice(eliminar, eliminar);
}

function showflights(x) {
    alert('Esta es la lista de vuelos encontrados:')
    console.log('************************************SKYLAB AIRLINES*****************************************')
    for (var i = 0; i < x.length; i++) {
        if (x[i].scale) {
            console.log('El vuelo con ID ' + x[i].id + ' con origen ' + x[i].from + ' y destino ' + x[i].to + ' cuesta ' + x[i].cost + ' y tiene escala.');
        } else if (!x[i].scale) {
            console.log('El vuelo con ID ' + x[i].id + ' con origen ' + x[i].from + ' y destino ' + x[i].to + ' cuesta ' + x[i].cost + ' y no tiene escala.');
        }
    }
}

var vuelos = [];

do {
    showflights(flights);
    var whoareyou = prompt('Indica si quieres entrar como "admin", "user" o "salir".');
} while (whoareyou != 'admin' && whoareyou != 'user' && whoareyou != 'salir');

if (whoareyou == 'admin') {
    var create = confirm('Quieres crear un nuevo vuelo?');
    while (create) {
        createflight();
        if (flights.length < 16) {
            create = confirm('Quieres crear otro vuelo?');
        } else {
            alert('NO SE PUEDEN INTRODUCIR MÁS VUELOS!!');
            create = false;
        }
    }

    var decide = confirm('Quieres eliminar un vuelo?')
    while (decide) {
        showflights(flights);
        elimvols();
        decide = confirm('Quieres eliminar otro vuelo?')
    }

    whoareyou = confirm('Las opciones de administrador finalizan aquí. Quieres entrar como usuario?');
    if (whoareyou) {
        whoareyou = 'user';
    } else {
        alert('HASTA LA PRÓXIMA!!')
    }


} if (whoareyou == 'user') {
    do {
        var precio = parseInt(prompt('Indique el precio deseado:'));
    } while (isNaN(precio));

    do {
        var opcion = prompt('Deseas encontrar un vuelo con precio más "alto", "bajo" o "igual"?');
    } while (opcion != 'alto' && opcion != 'bajo' && opcion != 'igual');

    if (opcion == 'alto') {
        for (var j = 0; j < flights.length; j++) {
            if (flights[j].cost > precio) {
                vuelos.push(flights[j]);
            }
        }
        showflights(vuelos);
    }

    if (opcion == 'bajo') {
        for (var j = 0; j < flights.length; j++) {
            if (flights[j].cost < precio) {
                vuelos.push(flights[j]);
            }
        }
        showflights(vuelos);
    }

    if (opcion == 'igual') {
        for (var j = 0; j < flights.length; j++) {
            if (flights[j].cost == precio) {
                vuelos.push(flights[j]);
            }
        }
        showflights(vuelos);
    }

    var comparacion = false;
    function compare() {
        for (var z = 0; z < vuelos.length; z++) {
            if (cual == vuelos[z].id) {
                comparacion = true;
            }
        }
        return comparacion;
    }

    var copiaArray = flights;
    var k = 0;
    var buy = confirm('Quieres comprar un vuelo?');
    while (buy) {
        k++;
        do {
            var cual = prompt('Qué vuelo quieres comprar, indica el ID del vuelo para referirte a él.');
            compare();
        } while (!comparacion)
        alert('Vuelo con destino a ' + copiaArray[cual].to + ' comprado con éxito.');
        buy = confirm('Quieres comprar otro vuelo?')
    }
    if (k > 0) {
        alert('Gracias por su compra, vuelva pronto.')
    } else if (k == 0) {
        alert('Lástima! Adiós!!')
    }
} else if (whoareyou == 'salir') {
    console.log('PUES NAH, ADIÓS');
}

