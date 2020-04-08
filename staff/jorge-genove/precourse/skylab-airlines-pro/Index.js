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
  { id: 10, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false }
];
var lookForTLC;
var finishedTLC;
var tempNewFlightsStorageTLC;
var tempNewFlightsStorageTLCBool;
var adminOrUserTLC;
var deleteFlightNumber;
var resultados = [];
var suma = 0;
var counter = 0;
var ultimosVuelos = [];
function comproId(id, arrToComp) {
  for (let i = 0; i < arrToComp.length; i++) {
    if (id == arrToComp[i].id) {
      return true;
    }
  }
  return false;
}

var vuelos = { flights, suma, counter, ultimosVuelos };

function skyLabAirLines() {
  var username = prompt("Username");
  if (username == null || username == "") {
    alert("debes introducir un username");
    skyLabAirLines();
  } else {
    alert(`Welcome ${username}`);
    ultimosVuelos = flights.slice(6, flights.length);
    for (let i = 0; i < flights.length; i++) {
      suma = suma + flights[i].cost;
      if (flights[i].scale === true) {
        flights[i].scale = "hace escala";
        counter = counter + 1;
      } else {
        flights[i].scale = "no hace ninguna escala";
      }
      console.log(
        `El vuelo con destino ${flights[i].to} procedente de ${flights[i].from} tiene un coste de ${flights[i].cost} y ${flights[i].scale}`
      );
    }
  }
  suma = suma / flights.length;
  console.log(`El precio medio de todos los vuelos es ${roundToX(suma, 3)}`);
  console.log(`Los vuelos que hacen escala en el dia de hoy son ${counter}`);
  for (let j = 0; j < ultimosVuelos.length; j++) {
    console.log(ultimosVuelos[j].to);
  }
}
skyLabAirLines();
var control = true;
var buy;
var deleteFlight;
var lookFor;
var finished;
var tempNewFlightsStorage;
var questions = [
  "new id",
  "new destination",
  "new from",
  "new cost",
  "si hace escala añade SI, sino NO"
];
var finishedF = function finishedFF() {
  finished = prompt("Are you finished? y/n");
  finishedTLC = finished.toLowerCase();
  if (flights.length > 15) {
    alert("You can't add more flights");
  } else if (finishedTLC === "n" || finished == null) {
    nF();
  } else if (finishedTLC === "y" || finished == "") {
    control = false;
    alert("Thank you for adding new flights");
    if (confirm("¿Quieres borrar vuelos?")) {
      setTimeout(deleteFlF, 1000);
    } else {
      if (confirm("¿Quieres volver al menu")) {
        firstQuestionFA();
      } else {
        nF();
      }
    }
  }
};
var deleteMFF = function deleteMF() {
  if (confirm("¿Quieres borrar mas vuelos?")) {
    setTimeout(deleteFlF, 3000);
  } else {
    if (confirm("¿volver al menu?")) {
      firstQuestionFA();
    } else {
      deleteFl();
    }
  }
};
function lookForBF() {
  lookForB = prompt("Añade un precio");
  lookForNumB = Number(lookForB);
  if (Number.isNaN(lookForNumB) || lookForB == "") {
    alert("Es necesario poner un numero");
    lookForBF();
  } else if (lookForB === null) {
    if (confirm("¿no quieres buscar ningun vuelo?")) {
      firstQuestionFU();
    }
  } else {
    resultados = flights.filter(flights => flights.cost < lookForNumB);
    for (let i = 0; i < resultados.length; i++) {
      console.log(
        `Vuelo con destino ${resultados[i].to} desde ${resultados[i].from} con un coste de ${resultados[i].cost}, su id de compra es ${resultados[i].id}`
      );
    }
    setTimeout(buyingF, 7000);
  }
}
function lookForIF() {
  lookForI = prompt("Añade un precio");
  lookForNumI = Number(lookForI);
  if (Number.isNaN(lookForNumI) || lookForI == "") {
    alert("Es necesario poner un numero");
    lookForIF();
  } else if (lookForI === null) {
    if (confirm("¿no quieres buscar ningun vuelo?")) {
      firstQuestionFU();
    }
  } else {
    resultados = flights.filter(flights => flights.cost === lookForNumI);

    for (let i = 0; i < resultados.length; i++) {
      console.log(
        `Vuelo con destino ${resultados[i].to} desde ${resultados[i].from} con un coste de ${resultados[i].cost}, su id de compra es ${resultados[i].id}`
      );
    }
  }
  if (resultados.length === 0) {
    alert("ningun precio coincide, añade otro precio");
    return lookForIF();
  }
  setTimeout(buyingF, 7000);
}
function lookForAF() {
  lookForA = prompt("Añade un precio");
  lookForNumA = Number(lookForA);
  if (Number.isNaN(lookForNumA) || lookForA == "") {
    alert("Es necesario poner un numero");
    lookForAF();
  } else if (lookForA === null) {
    if (confirm("¿no quieres buscar ningun vuelo?")) {
      firstQuestionFU();
    }
  } else {
    resultados = flights.filter(flights => flights.cost > lookForNumB);
    for (let i = 0; i < resultados.length; i++) {
      console.log(
        `Vuelo con destino ${resultados[i].to} desde ${resultados[i].from} con un coste de ${resultados[i].cost}, su id de compra es ${resultados[i].id}`
      );
    }
    setTimeout(buyingF, 7000);
  }
}

function firstQuestionFA() {
  firstQuestionA = prompt(
    "Si quieres añadir vuelos intruduce, AÑADIR, si quieres borrarlos introduce, BORRAR, si quieres salir aprieta CANCELAR"
  );
  if (firstQuestionA !== null) {
    firstQuestionATLC = firstQuestionA.toUpperCase();
    if (firstQuestionATLC === "AÑADIR") {
      nF();
    } else if (firstQuestionATLC === "BORRAR") {
      for (let i = 0; i < flights.length; i++){
        console.log(`El vuelo con destino ${flights[i].to} procedente de ${flights[i].from} tiene un coste de ${flights[i].cost} y ${flights[i].scale} su id es:${flights[i].id}`)
      }

      setTimeout(deleteFlF, 4000);
    } else if (
      firstQuestionATLC === "" ||
      firstQuestionATLC !== "BUSCAR" ||
      firstQuestionATLC !== "COMPRAR"
    ) {
      alert("debes introducir BORRAR o AÑADIR");
      firstQuestionFA();
    }
  } else {
    if (confirm("¿Quieres salir?")) {
      setTimeout(askF, 0);
    } else {
      firstQuestionFA();
    }
  }
}

function firstQuestionFU() {
  firstQuestionU = prompt(
    "Si quieres buscar vuelos intruduce, BUSCAR, si quieres comprar introduce, COMPRAR, si quieres salir aprieta CANCELAR"
  );
  if (firstQuestionU !== null) {
    firstQuestionUTLC = firstQuestionU.toUpperCase();
    if (firstQuestionUTLC === "BUSCAR") {
      lookFor1();
    } else if (firstQuestionUTLC === "COMPRAR") {
      for (let i = 0; i < flights.length; i++) {
        console.log(
          `Vuelo con destino ${flights[i].to} desde ${flights[i].from} con un coste de ${flights[i].cost}, su id de compra es ${flights[i].id}`
        );
      }
      setTimeout(buyingFWS, 3000);
    } else if (
      firstQuestionUTLC === "" ||
      firstQuestionUTLC !== "BUSCAR" ||
      firstQuestionUTLC !== "COMPRAR"
    ) {
      alert("debes introducir BUSCAR o COMPRAR");
      firstQuestionFU();
    }
  } else {
    if (confirm("¿Quieres salir?")) {
      setTimeout(askF, 0);
    } else {
      firstQuestionFU();
    }
  }
}

var buyingFWS = function buyingWS() {
  buyWS = prompt("Wanna buy someone? Put id ");
  if (buyWS !== null) {
    buyWSN = Number(buyWS);
    if (Number.isNaN(buyWS) || buyWS == "") {
      alert("debes introducir un numero de id");
      return buyingWS();
    }
  } else {
    if (confirm("¿volver al menu?")) {
      return firstQuestionFU();
    } else {
      buyingWS();
    }
  }

  if (!comproId(buyWS, flights)) {
    alert("ese Id no existe");
    buyingWS();
  } else {
    for (let i = 0; i < flights.length; i++) {
      if (flights[i].id === buyWSN) {
        alert(
          `Gracias por su compra del vuelo con destino ${flights[i].to} por un precio de ${flights[i].cost} euros vuelva pronto`
        );
      }
    }
    if (confirm("¿Quieres comprar mas vuelos?")) {
      return buyingWS();
    } else {
      if (confirm("¿volver al menu?")) {
        return firstQuestionFU();
      } else {
        return buyimgWS();
      }
    }
  }
};

function lookFor1() {
  lookFor = prompt(
    "Si quieres buscar vuelos con precios mas bajos de, Añade BAJO, mas altos, ALTO, o igual, IGUAL"
  );
  if (lookFor != null) {
    lookForTLC = lookFor.toLowerCase();
    lookForNum = Number(lookFor);
    if (Number.isNaN(lookForNum) == false || lookFor === "") {
      alert(
        "debes introducir, BAJO, ALTO o IGUAL segun el tipo de busqueda que desees"
      );
      lookFor1();
    } else if (lookForTLC === "bajo") {
      lookForBF();
    } else if (lookForTLC === "alto") {
      lookForAF();
    } else if (lookForTLC === "igual") {
      lookForIF();
    } else if (
      lookForTLC != "bajo" ||
      lookForTLC != "alto" ||
      lookForTLC != "igual"
    ) {
      alert(
        "debes introducir, BAJO, ALTO o IGUAL segun el tipo de busqueda que desees"
      );
      lookFor1();
    }
  } else {
    if (confirm("¿no quieres hacer ninguna busqueda?")) {
      if (confirm("¿volver al menu")) {
        firstQuestionFU();
      } else {
        lookFor1();
      }
    }
  }
}

var buyingF = function buying() {
  buy = prompt("Wanna buy someone? Put id");
  if (buy !== null) {
    buyN = Number(buy);
    if (Number.isNaN(buyN) || buy == "") {
      alert("debes introducir un numero de id");
      return buying();
    }
  } else {
    if (confirm("¿Volver al menu?")) {
      return firstQuestionFU();
    } else {
      buyingF();
    }
  }

  if (!comproId(buy, resultados)) {
    alert("ese Id no existe");
    buying();
  } else {
    for (let i = 0; i < resultados.length; i++) {
      if (resultados[i].id === buyN) {
        alert(
          `Gracias por su compra del vuelo con destino ${resultados[i].to} por un precio de ${resultados[i].cost} euros vuelva pronto`
        );
      }
    }

    if (confirm("quieres comprar mas vuelos?")) {
      return buying();
    } else {
      if (confirm("¿Volver al menu?")) {
        return firstQuestionFU();
      } else {
        return buying();
      }
    }
  }
};

var askF = function ask() {
  var adminOrUser = prompt(
    "Introduce Admin o User. Si quieres salir aprieta cancelar"
  );
  if (adminOrUser == null) {
    alert("adios, gracias por usar skylabairlines");
    return;
  } else if (adminOrUser == "") {
    alert("debes introducir si eres Admin or User");
    ask();
  }
  adminOrUserTLC = adminOrUser.toLowerCase();
  if (adminOrUserTLC === "admin") {
    firstQuestionFA();
  } else if (adminOrUserTLC === "user") {
    firstQuestionFU();
  } else if (adminOrUserTLC !== "admin" || adminOrUserTLC !== "user") {
    alert("debes introducir Admin or User");
    ask();
  }
};

function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

var deleteFlF = function deleteFl() {
  
  deleteFlight = prompt("Want to delete any flight? Write the id");
  deleteFlightNumber = Number(deleteFlight);
  if (!comproId(deleteFlightNumber, flights)) {
    alert("ese Id no existe");
    return setTimeout(deleteFlF, 3000);
  }
  if (Number.isNaN(deleteFlightNumber) || deleteFlight == "") {
    alert("debes introducir un numero de id");
    deleteFl();
  } else if (deleteFlight == null) {
    if (confirm("¿no quieres borrar vuelos")) {
      if (confirm("¿volver al menu?")) {
        firstQuestionFA();
      } else {
        deleteFl();
      }
    }
  } else if (Number.isNaN(deleteFlightNumber) == false) {
    for (let i = 0; i < flights.length; i++) {
      if (flights[i].id === deleteFlightNumber) {
        flights.splice(i, 1);
        for (let i = 0; i < flights.length; i++){
          console.log(`El vuelo con destino ${flights[i].to} procedente de ${flights[i].from} tiene un coste de ${flights[i].cost} y ${flights[i].scale} su id es:${flights[i].id}`)
        }
        setTimeout(deleteMFF, 3000);
      }
    }
  }
};

function nF() {
  while (control === true) {
    var newFlights = {};
    for (let i = 0; i < questions.length; i++) {
      tempNewFlightsStorage = prompt(questions[i]);

      if (i === 0) {
        newFlights.id = Number(tempNewFlightsStorage);
        tempNewFlightsStorageNum = Number(tempNewFlightsStorage);
        if (
          Number.isNaN(tempNewFlightsStorageNum) ||
          tempNewFlightsStorage == null ||
          tempNewFlightsStorage == ""
        ) {
          alert("tienes que introducir un numero");
          return nF();
        } else if (comproId(tempNewFlightsStorage, flights)) {
          alert("Ese Id ya existe");
          return nF();
        }
      } else if (i === 1) {
        newFlights.to = tempNewFlightsStorage;
        tempNewFlightsStorageNum = Number(tempNewFlightsStorage);
        if (
          Number.isNaN(tempNewFlightsStorageNum) == false ||
          tempNewFlightsStorage == null ||
          tempNewFlightsStorage == ""
        ) {
          alert("debes introducir un destino");
          i = 0;
        }
      } else if (i === 2) {
        newFlights.from = tempNewFlightsStorage;
        tempNewFlightsStorageNum = Number(tempNewFlightsStorage);

        if (
          Number.isNaN(tempNewFlightsStorageNum) == false ||
          tempNewFlightsStorage == null ||
          tempNewFlightsStorage == ""
        ) {
          alert("debes introducir un origen");
          i = 1;
        }
      } else if (i === 3) {
        newFlights.cost = Number(tempNewFlightsStorage);
        tempNewFlightsStorageNum = Number(tempNewFlightsStorage);
        if (
          Number.isNaN(tempNewFlightsStorageNum) ||
          tempNewFlightsStorage == null ||
          tempNewFlightsStorage == ""
        ) {
          alert("tienes que introducir un numero");
          i = 2;
        }
      } else if (i === 4) {
        newFlights.scale = tempNewFlightsStorage;
        tempNewFlightsStorageNum = Number(tempNewFlightsStorage);
        if (tempNewFlightsStorage != null) {
          tempNewFlightsStorageTLC = tempNewFlightsStorage.toLowerCase();

          if (
            tempNewFlightsStorage == "" ||
            Number.isNaN(tempNewFlightsStorageNum == false)
          ) {
            alert("debes añadir SI o NO");
            i = 3;
          } else if (tempNewFlightsStorageTLC === "si") {
            newFlights.scale = "hace escala";
          } else if (tempNewFlightsStorageTLC === "no") {
            newFlights.scale = "no hace escala";
          } else if (
            tempNewFlightsStorageTLC !== "si" ||
            tempNewFlightsStorageTLC !== "no"
          ) {
            alert("debes añadir SI o NO");
            i = 3;
          }
        } else {
          alert("Debes introducir SI o NO");
          i = 3;
        }
      }
    }

    flights.push(newFlights);
    for (let i = 0; i < flights.length; i++){
      console.log(`El vuelo con destino ${flights[i].to} procedente de ${flights[i].from} tiene un coste de ${flights[i].cost} y ${flights[i].scale} su id es: ${flights[i].id}`)
    }
    return setTimeout(finishedF, 3000);
  }
}
setTimeout(askF, 4000);
