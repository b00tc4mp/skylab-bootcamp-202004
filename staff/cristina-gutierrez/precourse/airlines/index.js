const flights = [
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

function welcome(name) {
    console.log("Bienvenido/a, " + name)
}
    
welcome(prompt("¿Cómo se llama?"));

function printFlights(origin, destination, cost, scale) {
    if (scale = true) {
        scale = "realiza una escala"
    }
    else {
        scale = "no realiza ninguna escala"
    }
    
    console.log("El vuelo con origen: " + origin + ", y destino: " + destination + " tiene un coste de " + cost + "€ y " + scale + ".")
}

flights.forEach(flight => printFlights(flight.from, flight.to, flight.cost, flight.scale));

let costs = [];
flights.forEach(flight => costs.push(flight.cost));

let total = costs.reduce((total, cost) => total + cost);

function printCost(averageCost) {
    console.log("El coste medio de los vuelos es de " + averageCost + "€.")
}

let averageCost = total / costs.length;
printCost(averageCost);

let flightsWithScale = [];
flights.forEach(flight => {
    if (flight.scale === true) {    
        flightsWithScale.push(flight.scale)
    }
});

function printFlightsWithScale(numberOfScales) {
    console.log("Un total de " + numberOfScales + " vuelos efectúan escalas.")
}

let numberOfScales = flightsWithScale.length;
printFlightsWithScale(numberOfScales);

let lastFlights = [];
flights.forEach(flight => {
    if (flight.id > 5) {    
        lastFlights.push(flight.to)
    }
});

function printLastFlights(destinations) {
    console.log("Los 5 últimos destinos del día son " + destinations + ".")
}

printLastFlights(lastFlights);