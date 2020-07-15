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
var nom;
var compraVolTipus;

//Missatge de benvinguda

function benvinguda() {

    nom = prompt("Cual es tu nombre?");
    nom = nom.charAt(0).toUpperCase() + nom.slice(1);
    console.log(nom + " bienvenido a Skylab Airlines!");
    console.log("----------------------------------");

};

//Llistat de tots els vols

function visualizarVuelos() {

    for (var i = 0; i < flights.length; i++) {
        var escala = "";
        if (flights[i].scale == true) {
            escala = "realiza escala";
        } else {
            escala = "no realiza escala";
        }
        console.log("##--El vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
    }
    console.log("----------------------------------");
}

//Cost mitja de tots els vols

function costeMedio() {

    var costeMedio = 0;
    var costeTotal = 0;

    for (var i = 0; i < flights.length; i++) {
        costeTotal = costeTotal + parseInt(flights[i].cost);
    }
    costeMedio = costeTotal / flights.length - 1;
    console.log("El coste medio de todos los vuelos es de: " + costeMedio + "€");
    console.log("----------------------------------");
}

//Calcul del numero total de vols que fan escala

function escalas() {

    var numeroEscalas = 0;

    for (var i = 0; i < flights.length; i++) {

        if (flights[i].scale == true) {
            numeroEscalas++;
        }

    }
    console.log("Un total de " + numeroEscalas + " vuelos realizan escalas");
    console.log("----------------------------------");
}

//Visualització dels ultims 5 vols

function ultimosVuelos() {

    console.log("Destinos de los ultimos 5 vuelos: ");

    for (var i = flights.length - 5; i < flights.length; i++) {

        console.log("-" + flights[i].to);

    }
    console.log("----------------------------------");
}

//Crear un vol

function crearVuelo() {

    if (flights.length < 15) {

        var id = prompt("Introduzca el Id del vuelo:");
        var desti = prompt("Introduzca el destino del vuelo:");
        var origen = prompt("Introduzca el origen del vuelo:");
        var preu = prompt("Introduzca el precio del vuelo");

        do {
            var escala = prompt("El vuelo realiza escala?, clica (s) si (n) no:");
            if (escala != "s" && escala != "n") {
                alert("Tienes que introducir s(si) o n(no)!");
            } else if (escala == "s") {
                escala = true;
            } else {
                escala = false;
            }

        } while (escala != "s" && escala != "n" && escala != true && escala != false);
        flights[flights.length] = { id: id, to: desti, from: origen, cost: preu, scale: escala };
    }
    else {
        alert("Ya has introducido el máximo de vuelos posibles en la base de datos!");
    }
    check = false;

}

//Esborrar un vol

function borrarVuelo() {

    var idBorrar = prompt("Introduzca el Id del vuelo que quieras borrar:");
    var checkId = 0;
    for (var i = 0; i < flights.length; i++) {

        if (flights[i].id == idBorrar) {

            flights.splice(i, 1);
            checkId++;
        }

    }
    if (checkId == 0) {
        alert("El id introducido no existe");
    }

    check = false;
}

//Llistat preus vols per sobre del preu introduit per l'usuari

function volsAlt() {
    compraVolTipus = "alt";
    console.log("Listado de vuelos con el precio superior a " + seleccionPrecio + "€")

    for (var i = 0; i < flights.length; i++) {
        var escala = "";
        if (flights[i].scale == true) {
            escala = "realiza escala";
        } else {
            escala = "no realiza escala";
        } if (flights[i].cost > seleccionPrecio) {
            console.log("##--El vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
        }
    }
    console.log("----------------------------------");
    check = false;
    compra();
    
}

//Llistat preus vols per sota del preu introduit per l'usuari

function volsBaix() {
    compraVolTipus = "baix";
    console.log("Listado de vuelos con el precio inferior a " + seleccionPrecio + "€")
    for (var i = 0; i < flights.length; i++) {
        var escala = "";
        if (flights[i].scale == true) {
            escala = "realiza escala";
        } else {
            escala = "no realiza escala";
        } if (flights[i].cost < seleccionPrecio) {
            console.log("##--El vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
        }
    }
    console.log("----------------------------------");
    check = false;
    compra();
    
}

//Llistat preus vols iguals que l'introduit per l'usuari


function volsIgual() {
    compraVolTipus = "igual";
    console.log("Listado de vuelos con el precio igual a " + seleccionPrecio + "€")
    var x = 0;
    for (var i = 0; i < flights.length; i++) {
        var escala = "";

        if (flights[i].scale == true) {
            escala = "realiza escala";
        } else {
            escala = "no realiza escala";
        } if (flights[i].cost == seleccionPrecio) {
            console.log("##--El vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
            x++;
        }

    }
    if (x == 0) {

        alert("No hay vuelos con el precio igual al introducido por el usuario")

    }
    console.log("----------------------------------");
    check = false;
    compra();
    
}

function compra() {
    var x = 0;
    do {
        var compraId = prompt("Introduce el Id del vuelo que quieras comprar");
    } while (isNaN(compraId) == true);


    for (var i = 0; i < flights.length; i++) {

        if (flights[i].cost > seleccionPrecio && compraId == flights[i].id && compraVolTipus == "alt") {

            var escala = "";
            if (flights[i].scale == true) {
                escala = "realiza escala";
            } else {
                escala = "no realiza escala";
            }
            console.log("##--Has comprado el vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
            x++;
        check = true;
        alert("Gracias por su compra! Vuelva pronto");
        }

        else if (flights[i].cost < seleccionPrecio && compraId == flights[i].id && compraVolTipus == "baix") {

            var escala = "";
            if (flights[i].scale == true) {
                escala = "realiza escala";
            } else {
                escala = "no realiza escala";
            }

            console.log("##--Has comprado el vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
            x++;
            check = true;
        alert("Gracias por su compra! Vuelva pronto");
        } else {
            var escala = "";
            if (flights[i].scale == true) {
                escala = "realiza escala";
            } else {
                escala = "no realiza escala";
            }
            if (flights[i].cost == seleccionPrecio && compraId == flights[i].id && compraVolTipus == "igual") {
                console.log("##--Has comprado el vuelo numero " + flights[i].id + " con origen: " + flights[i].from + " y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€ y " + escala);
                x++;
                check = true;
        alert("Gracias por su compra! Vuelva pronto");
            }
        } 
    }
    if (x == 0) {
        console.log("No existe vuelo con el Id: " + compraId + " Puede que no haya seleccionado el rango de precios correcto")
    }
}

//Execució del programa

benvinguda();
visualizarVuelos();
costeMedio();
escalas();
ultimosVuelos();




do {
    var check = true;
    var opcio = prompt("Selecciona el numero de una de las opciones: \n" +
        "1-Mostrar información de los vuelos vuelos\n" +
        "2-Admin\n" +
        "3-User\n" +
        "Haz clic en cancelar para salir.");

    switch (opcio) {
        case "1":
            console.log("##########################################")
            visualizarVuelos();
            costeMedio();
            escalas();
            ultimosVuelos();
            check = false;
            break;
        case "2":

            do {
                check = true;
                var opcioAdmin = prompt("Selecciona una opción: \n" +
                    "1-Crear un nuevo vuelo\n" +
                    "2-Borrar vuelo ya existente\n" +
                    "3-Mostrar todos los vuelos existentes\n" +
                    "Haz clic en cancelar para volver al menú anterior.");

                switch (opcioAdmin) {

                    case "1":
                        crearVuelo();
                        break;
                    case "2":
                        borrarVuelo();
                        break;
                    case "3":
                        visualizarVuelos();
                        check = false;
                        break;
                    case null:
                        break;
                    default:
                        check = false;
                        alert("Opción elegida incorrecta!");
                }

            } while (check == false);
            check = false;
            break;
        case "3":
                var seleccionPrecio
            do {
                seleccionPrecio = prompt("Busqueda por precio, introduce un precio:");
                if (isNaN(seleccionPrecio) || seleccionPrecio == "") {
                    alert("Introduce un precio con valores numericos!");
                }
            } while (isNaN(seleccionPrecio) == true || seleccionPrecio == "")

            do {
                check = true;
                var menuUser = prompt("Selecciona una opción: \n" +
                    "1-Vuelos por encima del valor introducido \n" +
                    "2-Vuelos por debajo del valor introducido\n" +
                    "3-Vuelos con un valor identico al introducido\n" +
                    "Clica cancelar para volver al menú anterior.");

                switch (menuUser) {

                    case "1":
                        volsAlt();
                        break;
                    case "2":
                        volsBaix();
                        break;
                    case "3":
                        volsIgual();
                        break;
                    case null:
                        break;
                    default:
                        check = false;
                        alert("Opción elegida incorrecta!");


                }
            }
            while (check == false);
            check = false;
            break;

        case null:

            alert("Adeu " + nom + "! Fins la propera!");
            break;

        default:
            check = false;

            alert("Opció triada incorrecte!");
    }
}
while (check == false);
