// JS SKYLAB AIRLINES PRO - SkyLab Coders

// Después de Display, prompt ADMIN/USER
// ADMIN: Poder crear vuelos por prompt, max 15
//        Eliminar vuelos por ID
// USER: Buscar por precio (alto, bajo o igual)
//

// LISTA DE VUELOS

var flights = [
  { id: 00, to: "Bilbao", from: "Barcelona", cost: 1600, scale: false },
  { id: 01, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 02, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 03, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 04, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 05, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 06, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 07, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 08, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 09, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

// COSTES

var costAverage = 0;
var costSum = 0;

// Usuario
var username = "";

// Busquedas
var price;
var sortBy;

// PROGRAMA

askUsername();

displayFlights();

displayAverage();

displayNumScales();

last5Flights();

// FUNCIONES

function askUsername() {
  while (username.length <= 0) {
    username = prompt("Por favor introduce tu USUARIO.");
    if (username.length > 0) {
      alert("Es un placer verte de nuevo " + username + "!");
    } else {
      alert("Este USUARIO no es válido.");
    }
  }
}

function displayFlights() {
  console.log("********************");
  for (var i = 0; i < flights.length; i++) {
    if (flights[i].scale == false) {
      console.log(
        flights[i].id +
          ": El vuelo con origen: " +
          flights[i].from +
          ", y destino: " +
          flights[i].to +
          " tiene un coste de " +
          flights[i].cost +
          "€ y no realiza ninguna escala."
      );
    } else {
      console.log(
        flights[i].id +
          ": El vuelo con origen: " +
          flights[i].from +
          ", y destino: " +
          flights[i].to +
          " tiene un coste de " +
          flights[i].cost +
          "€ y sí realizará escala."
      );
    }
  }
  console.log("********************");
}

function displayAverage() {
  for (var i = 0; i < flights.length; i++) {
    costSum += flights[i].cost;
  }

  costAverage = costSum / flights.length;
  costAverage = parseFloat(costAverage.toFixed(2));

  console.log("");
  console.log("El coste medio de los vuelos de hoy es: " + costAverage + "€ .");
}

function displayNumScales() {
  // get num scales
  var numScales = 0;

  for (var i = 0; i < flights.length; i++) {
    if (flights[i].scale == true) {
      numScales++;
    }
  }
  // log the text
  console.log("");
  console.log(
    "Les informamos de que " +
      numScales +
      " de los " +
      flights.length +
      " vuelos programados para hoy, realizarán escala."
  );
}

function last5Flights() {
  console.log("");
  console.log("Los últimos 5 vuelos de hoy son dirección: ");

  for (var i = flights.length - 5; i < flights.length; i++) {
    console.log("   ● " + flights[i].to);
  }
}

// AIRLINES-PRO

adminOrUser();

// FUNCIONES PRO

function adminOrUser() {
  answer = prompt("Introduce ADMIN/USER o E para Salir");

  if (answer == "admin" || answer == "ADMIN") {
    // funcion para modificar
    console.log("********************");
    console.log("Se han desbloqueado las funciones de Administrador");
    console.log("********************");
    iAmAdmin();
  } else if (answer == "user" || answer == "USER") {
    // funcion buscar por precio y seleccionar id
    iAmUser();
  } else if (answer == "E" || answer == "e") {
    alert("¡Hasta pronto!");
  } else {
    alert("Por favor introduce ADMIN/USER/E únicamente.");
    adminOrUser();
  }
}

// *** FUNCIONES ADMIN ***

function iAmAdmin() {
  adminRequest();

  if (edit == "1") {
    addFlight();
  } else if (edit == "2") {
    removeFlight();
  } else if (edit == "e" || edit == "E") {
    alert("Hasta pronto " + username + "!");
  } else {
    alert("Entrada no válida.");
    iAmAdmin();
  }
}

function adminRequest() {
  edit = prompt(
    "Introduce 1 para añadir vuelo / " +
      "Introduce 2 para Eliminar por ID / " +
      "Introduce E para Salir"
  );
}

// Funcion AÑADIR VUELO

function addFlight() {
  if (flights.length >= 15) {
    // Limitar a 15
    alert("No es posible añadir más vuelos, límite de 15.");
    iAmAdmin();
  } else {
    // Crear vuelo con prompts
    var newId = flights[flights.length - 1].id + 1;
    alert("Creando vuelo con ID: " + newId);
    var newFlight = {
      id: parseInt(("0" + newId).slice(-2)),
      to: prompt("Introduce Destino."),
      from: prompt("Introduce Origen."),
      cost: parseInt(prompt("Introduce Precio.")),
    };
    var newScale = prompt("Hace Escala? Introduce SI o NO");

    // Añadir escala true/false, .push(newFlight) y mostrar
    if (newScale == "si" || newScale == "SI") {
      newFlight.scale = true;
      flights.push(newFlight);
      displayFlights();
    } else if (newScale == "no" || newScale == "NO") {
      newFlight.scale = false;
      flights.push(newFlight);
      displayFlights();
    } else {
      alert("Error, no se ha podido crear el vuelo.");
    }

    iAmAdmin();
  }
}

// Funcion ELIMINAR VUELO

function removeFlight() {
  displayFlights();
  alert("Mostrando vuelos por consola.");

  // Preguntar por id y almacenar en nueva var
  var removeId = parseInt(prompt("Introduce el ID a Eliminar"));
  console.log(removeId);

  // Seleccionar el id
  console.log("Eliminando vuelo " + removeId);

  var findFlight = flights.indexOf(flights.find((x) => x.id === removeId));
  // Eliminar y mostrar
  flights.splice(findFlight, 1);

  displayFlights();

  iAmAdmin();
}

// *** FUNCIONES USER ***

// Introducir precio a buscar
function iAmUser() {
  userPrice();
  userSort();

  if (sortBy == "1") {
    displayBigger();
  } else if (sortBy == "2") {
    displayLower();
  } else if (sortBy == "3") {
    displayEqual();
  } else if (sortBy == "e" || sortBy == "E") {
    alert("Hasta pronto " + username + "!");
  } else {
    alert("Entrada no válida.");
    iAmUser();
  }

  userChoice();
}

function userPrice() {
  price = parseInt(prompt("Introduce el importe para buscar vuelos."));
}

// Elegir qué Busqueda: < / > / =

function userSort() {
  sortBy = prompt(
    "Introduce 1 para buscar vuelos más caros / " +
      "Introduce 2 para buscar vuelos más baratos / " +
      "Introduce 3 para buscar vuelos por valor de " +
      price +
      " / " +
      "Introduce E para Salir"
  );
}

// Loop para mostrar todos los vuelos compatibles

function displayBigger() {
  for (i = 0; i < flights.length; i++) {
    if (flights[i].cost >= price) {
      console.log(flights[i]);
    }
  }
}

function displayLower() {
  for (i = 0; i < flights.length; i++) {
    if (flights[i].cost <= price) {
      console.log(flights[i]);
    }
  }
}

function displayEqual() {
  for (i = 0; i < flights.length; i++) {
    if (flights[i].cost == price) {
      console.log(flights[i]);
    }
  }
}

// Seleccionar por id

function userChoice() {
  var choice = parseInt(prompt("Introduce el ID para comprar el billete."));
  var selectFlight = flights.indexOf(flights.find((x) => x.id === choice));
  if (selectFlight != -1) {
    alert("Gracias por su compra, vuelva pronto.");
  } else {
    alert("No se ha podido encontrar el vuelo seleccionado.");
    iAmUser();
  }
}
