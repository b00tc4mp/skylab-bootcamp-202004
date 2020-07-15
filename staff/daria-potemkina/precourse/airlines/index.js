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

function myFlights(flight){

function printFligths(f){
            console.log('El vuelo con id ' + f.id + ' con origen: ' + f.from + ', y destino: ' + f.to + ' tiene un coste de ' + f.cost + '€ y no realiza escala.');
}

function reserve (flight){
    var bookId = prompt('Introduzca el id de vuelo para realizar la reserva',0);
    if(bookId === null){
        return;
    }else{
    var bookingId = Number(bookId);
    var booking = flight.map(fly => fly.id).indexOf(bookingId);
    while (booking === -1 || isNaN(bookId) || bookId === 'undefined'){
        alert('El id introducido no existe');
        bookId = prompt('Introduzca el id de vuelo para realizar la reserva',0);
        if(bookId === null){
            return;
        }else{
        bookingId = Number(bookId);
        booking = flight.map(fly => fly.id).indexOf(bookingId);
        }
    }
    }
    alert('Gracias por su compra!');
}

function admin (flight){
   
    var addFlight = confirm('¿Quiere añadir un vuelo nuevo?');
    while (flight.length < 17 && addFlight === true) {
        if (flight.length === 16) {
            alert("No es posible intrducir más de 15 id's de vuelos.");
            break;
        } else {
            var newFlight ={
                id: flights[flights.length-1].id+1,
                to: prompt('Destino')
            }
            
            var ifStringTo = Number(newFlight.to);

            while(isNaN(ifStringTo) === false || newFlight.to === '' || newFlight.to === null){
                alert('El valor introducido es vacío o numérico. Vuelva a probar de nuevo.');
                newFlight.to = prompt('Destino');
                ifStringTo = Number(newFlight.to);
            }

            newFlight.from = prompt('Origen');
            var ifStringFrom = Number(newFlight.from);

            while(isNaN(ifStringFrom) === false || newFlight.from === '' || newFlight.from === null){
                alert('El valor introducido es vacío o numérico. Vuelva a probar de nuevo.');
                newFlight.from = prompt('Origen');
                ifStringFrom = Number(newFlight.from);
            }

            newFlight.cost = Number(prompt('Coste',0));
            while (isNaN(newFlight.cost)){
                alert('El coste debe ser un valor numérico.');
                newFlight.cost = Number(prompt('Coste'));
            }

            newFlight.scale = confirm('Vuelo con escala?\nPulse Aceptar si vuelo tiene escala y Cancelar en caso contrario.');
            flight.push(newFlight);
            for (var f in flight) {
                printFligths(flight[f]);
            };
            addFlight = confirm('¿Quiere añadir un vuelo nuevo?');
        }
    }
    if (addFlight === false) {
        var execute = true;
        while (execute) {
            var deleteFlight = confirm('¿Quere eliminar un vuelo?');
            if (deleteFlight === true){
                var ids = Number(prompt('Introduzca el id de vuelo a eliminar.',0));
                var indexId = flight.map(fly => fly.id).indexOf(ids);
                if(indexId >= 0){
                    flight.splice(indexId, 1);
                    alert('El vuelo con el id: ' + ids + ' ha sido eliminado!');
                    for (var f in flight){
                    printFligths(flight[f]);
                    execute = false;
                    }
                }else{
                    alert('El id no existe!')
                }
            }else{
                execute = false;
            }
        }
    }
}


function client (flight){
    var menu = String(prompt('Bienvenid@ a Skylab Airlines!\n\n Introduzca BUSCAR si quiere buscar los vuelos según su precio. \n Introduzca COMPRAR si quiere realizar la compra. \n Pulse Cancel si quiere salir del programa.')).toUpperCase();
    var execute = true;
    while(execute){
        if(['BUSCAR', 'COMPRAR', 'NULL'].indexOf(menu) === -1){
            alert('Texto introducido no es correcto. Deba introducir "BUSCAR" o "COMPRAR". Vuelva a intenentar.');
            menu = String(prompt('Bienvenid@ a Skylab Airlines!\n\n Introduzca BUSCAR si quiere buscar los vuelos según su precio. \n Introduzca COMPRAR si quiere realizar la compra. \n Pulse Cancel si quiere salir del programa.')).toUpperCase();
            }else{
                execute = false;
            }
    }
    if(menu === 'BUSCAR'){

    var orden = confirm('Quiere mostrar los precios superiores a un precio determinado?');
    if (orden === true){
        var price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio superior al introducido.'));
        while (isNaN(price)){
            alert('El precio debe ser un valor numérico');
            price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio superior al introducido.'));
        }
        for (var f in flight) {
            if(flight[f].cost > price){
            printFligths(flight[f]);
            }
        }
    }
    
    orden = confirm('Quiere mostrar los precios inferiores a un precio determinado?');
    if (orden === true){
        price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio inferior al introducido.')); 
        while (isNaN(price)){
            alert('El precio debe ser un valor numérico');
            price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio inferior al introducido.'));
        }
        for (var f in flight) {
            if(flight[f].cost < price){
            printFligths(flight[f]);
            }
        }
    }

    orden = confirm('Quiere mostrar los precios iguales a un precio determinado?');
    if (orden === true){
        price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio igual al intorducido.')); 
        while (isNaN(price)){
            alert('El precio debe ser un valor numérico');
            price = Number(prompt('Introzuca el precio para mostrar los vuelos con precio igual al intorducido.'));
        }
        for (var f in flight) {
            if(flight[f].cost === price){
            printFligths(flight[f]);
            }
        }
    }
}else if (menu === 'COMPRAR'){
    reserve(flight);
}
}

function dailyFlights(flight) {

    var name = prompt("Por favor, introduzca su nombre.");
    var numName = Number(name);
    var totalCost = 0;
    var averageCost;
    var scaleFlights = 0;
    var lastFlights;

    if(isNaN(numName)){
        console.log(name + ', bienvenido/a a Skylab Airlines!');
        
    }else{ 
        var execute = true;
        while(execute){
        alert('El nombre no puede ser un valor numérico! Vuelva a intentar!');
        name = prompt("Por favor, introduzca su nombre.");
        numName = Number(name);
        if(isNaN(numName)){
            console.log(name + ', bienvenido/a a Skylab Airlines!');
            execute = false;
        }
        }
        
    }

    for (var f in flight) {
        printFligths(flight[f]);
    };

    flight.forEach(element => {
        totalCost += element.cost;
        return totalCost;
    });

    averageCost = totalCost / (flight.length - 1);
    console.log('El coste medio de los vuelos es de ' + averageCost + '€.');

    flight.forEach(element => {
        if (element.scale === true) {
            scaleFlights++;
        }
        return scaleFlights;
    });

    console.log(scaleFlights + ' vuelos realizan escalas.');

    lastFlights = flight.slice(-5);
    console.log('Los últimos vuelos del día son:');

    for (var i = 0; i < lastFlights.length; i++) {
        printFligths(lastFlights[i]);
    }
}

dailyFlights(flight);

function confirmExit (){
    var exit = confirm('¿Desea salir del programa?')
    while(exit === false){
        adminOUSer(flight);
        exit = confirm('¿Desea salir del programa?')
    }
alert('Gracias por elegir a Skylab Airlines!');
}

function adminOUSer(flight){

var execute = true;
var user = String(prompt('Confirme si es ADMIN o USER')).toUpperCase();


while(execute){
    if(['ADMIN', 'USER', 'NULL'].indexOf(user) === -1){
    alert('Texto introducido no es correcto. Deba introducir "ADMIN" o "USER". Vuelva a intenentar.');
    user = String(prompt('Confirme si es ADMIN o USER')).toUpperCase();
    }else{
        execute = false;
    }
}
if (user === 'ADMIN'){
    admin(flight);
    adminOUSer(flight);
}else if (user === 'USER'){
    client(flight);
    adminOUSer(flight);
}else if(user === 'NULL'){
    confirmExit ();
}
}
adminOUSer(flight);

}


myFlights(flights);
