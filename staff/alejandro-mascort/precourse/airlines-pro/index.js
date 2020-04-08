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

(function airlines() {
    let user = prompt("Introduce el nombre de usuario: ");
    //verificar que se introduce un nombre de usuario
    while (!user) {
        alert("Debes introducir un usuario para poder acceder al menú de vuelos");
        user = prompt("Introduce el nombre de usuario: ");
    }
    alert("Bienvenido, " + user + ".");
    let costeMedio = 0;
    let numEscalas = 0;
    let ultimosVuelos = "";
    //función que provoca que los vuelos se visualicen en un formato claro para el usuario.
    for (let i = 0; i < flights.length; i++) {
        let escala = (flights[i].scale) ? "." : " y no realiza ninguna escala.";
        console.log("El vuelo con origen " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€" + escala + "\n");
        costeMedio += flights[i].cost;
        if (flights[i].scale) {
            numEscalas++;
        }
        //para crear el string que devuelve los últimos 5 destinos del dia
        if (flights[i].id >= (flights.length - 5)) {
            if (flights[i].id <= (flights.length - 3)) {
                ultimosVuelos += " " + flights[i].to + ",";
            } else if (flights[i].id == (flights.length - 2)) {
                ultimosVuelos += " " + flights[i].to;
            } else {
                ultimosVuelos += " y " + flights[i].to + ".";
            }
        }
    }
    costeMedio /= flights.length;
    console.log("\n");
    console.log("El coste medio de los vuelos es: " + costeMedio.toFixed(2) + "€\n");
    console.log("Existen " + numEscalas + " vuelos que realizan escala.\n");
    console.log("Los últimos vuelos del día presentan los siguientes destinos:" + ultimosVuelos + "\n");
    console.log("\n");
    //función para seleccionar si entrar como ADMIN o como USER
    function adminUser() {
        let accesAs = inputCorrecto(["admin", "user", "salir"], "Escriba ADMIN, USER o SALIR (finalizar la sesión).");
        if (accesAs == "admin") {
            admin();
        } else if (accesAs == "user") {
            userAcces();
        } else {
            alert("Sesión Finalizada.");
        }
    }
    adminUser();
    //función que permite al administrador crear hasta un máximo de 15 vuelos o eliminar vuelos a partir del id.
    function admin() {
        let modificarVuelos = inputCorrecto(["añadir", "eliminar", "salir"], "AÑADIR, ELIMINAR o SALIR.");
        if (modificarVuelos == "añadir") {
            if (flights.length == 15) {
                alert("Ya hay 15 vuelos registrados, no se pueden añadir más.")
            } else {
                let identif = flights.length;
                let destino = inputPalabra("Avión con destino a: ");
                let origen = inputPalabra("Avión con origen: ");
                let precio = inputPrecio("El precio del vuelo es: ");
                let escala = inputCorrecto(["si", "no"], "El avión realiza alguna escala: responda SI o NO");
                flights[identif] = { id: identif, to: destino, from: origen, cost: precio, scale: (escala == "SI") };
            }
            console.log(flights);
            admin();
        } else if (modificarVuelos == "eliminar") {
            let ids = [...Array(flights.length).keys()].map(function (x) { return String(x); });
            let eliminarVuelos = Number(inputCorrecto(ids, "Indica el id del vuelo a eliminar: "));
            flights.splice(eliminarVuelos, 1);
            //función que actualiza los ids una vez se ha borrado un vuelo
            (function actualiza_id() {
                for (let i = 0; i < flights.length; i++) {
                    flights[i].id = i;
                }
            })();
            console.log(flights);
            admin();
        } else {
            adminUser();
        }
    }
    //función que permite al usuario buscar por precio y realizar la compra de dicho vuelo
    function userAcces() {
        let busqueda = inputCorrecto(["alto", "bajo", "igual", "salir", "comprar"], "ALTO, BAJO, IGUAL, COMPRAR o SALIR.");
        if (busqueda != "salir") {
            if (busqueda == "alto") {
                buscaPrecio(">");
            } else if (busqueda == "bajo") {
                buscaPrecio("<");
            } else if (busqueda == "igual") {
                buscaPrecio("=");
            } else {
                comprarVuelo();
                userAcces();
            }
        } else {
            adminUser();
        }
    }
    // función que permite comprar un vuelo tecleando el ID del mismo.
    function comprarVuelo() {
        let ids = [...Array(flights.length).keys()].map(function (x) { return String(x); });
        let comprarVuelos = Number(inputCorrecto(ids, "Indique el id del vuelo a comprar: "));
        alert("Gracias por su compra, vuelva pronto.");
    }
    //función que recibe un array con los valores válidos del prompt y un string con la pregunta que el prompt hace al usuario 
    //sirve para verificar que el input del prompt es uno de los demandados
    function inputCorrecto(listaInputs, pregunta) {
        let respuesta = prompt(pregunta).toLowerCase();
        while (!listaInputs.includes(respuesta)) {
            alert("Input inválido");
            respuesta = prompt(pregunta);
        }
        return respuesta;
    }
    //función que asegura que el input introducido sea numérico
    function inputPrecio(pregunta) {
        let precio = Number(prompt(pregunta));
        while (!precio) {
            alert("Input inválido");
            precio = Number(prompt(pregunta));
        }
        precio = Number(precio);
        return precio;
    }
    //función que asegura que el input introducido sean únicamente letras
    function inputPalabra(pregunta) {
        let palabra = prompt(pregunta);

        while (validarPalabra(palabra) == 0) {
            alert("Input Inválido");
            palabra = prompt(pregunta);
        }
    }
    //función que devuelve 0 si el argumento 'palabra' contiene algún cáracter que no pertenezca a un nombre
    function validarPalabra(palabra) {
        let abc = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ .ç`'´";
        let counter = 0;
        for (let i = 0; i < abc.length; i++) {
            if (palabra.includes(abc[i])) {
                counter++;
            }
        }
        return counter;
    }
    //funcion que devuelve los vuelos con los precios mayores,menores o iguales según el signo especificado. 
    function buscaPrecio(signo) {
        let precio = inputPrecio("Indique el precio a buscar");
        let contador = 0;
        for (let i = 0; i < flights.length; i++) {
            if (signo == ">") {
                if (flights[i].cost > precio) {
                    let escala = (flights[i].scale) ? "." : " y no realiza ninguna escala.";
                    console.log("El vuelo con ID: " + flights[i].id + " y con origen " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€" + escala + "\n");
                    contador++;
                }
            } else if (signo == "=") {
                if (flights[i].cost == precio) {
                    let escala = (flights[i].scale) ? "." : " y no realiza ninguna escala.";
                    console.log("El vuelo con ID: " + flights[i].id + " y con origen " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€" + escala + "\n");
                    contador++;
                }
            } else {
                if (flights[i].cost < precio) {
                    let escala = (flights[i].scale) ? "." : " y no realiza ninguna escala.";
                    console.log("El vuelo con ID: " + flights[i].id + " y con origen " + flights[i].from + ", y destino: " + flights[i].to + " tiene un coste de " + flights[i].cost + "€" + escala + "\n");
                    contador++;
                }
            }
        }
        console.log("\n");
        if (contador == 0) {
            alert("No se han encontrado vuelos.");
        }
        userAcces();
    }
})();