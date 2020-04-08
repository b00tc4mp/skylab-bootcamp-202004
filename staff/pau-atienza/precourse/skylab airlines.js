

function airlines() {
    //Pedimos el username
    username = prompt('Please introduce your username');
    //Saludamos
    console.log(`Hello ${username}, welcome to Skylab Airlines`);
    //Declaramos la variable flights
    console.log(`The flights scheduled for today are the following:`);
    var flights = [
        {id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false},
        {id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false},
        {id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true},
        {id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false},
        {id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false},
        {id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false},
        {id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false},
        {id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true},
        {id: 08, to: 'Shanghai', from: 'Barcelona', cost: 800, scale: true},
        {id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true},
        {id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false},
    ];
    //Mostramos los vuelos de la forma sugerida en el enunciado
    for (let i = 0; i<flights.length; i++){
        console.log(`The flight with origin: ${flights[i].from} and destination: ${flights[i].to} costs ${flights[i].cost}€ and ${flights[i].scale == true ? 'has' : 'does not have'} a stopover`)
    }
    //Calculamos el coste medio y lo mostramos por pantalla
    let averageCost = 0;
    for (let i = 0; i<flights.length; i++){
        averageCost += flights[i].cost;
    };
    averageCost = averageCost/flights.length;
    console.log(`The average cost of the flights is ${averageCost.toFixed(2)}€`);
    //Mostramos los vuelos que efectúan escalas por pantalla
    let numberOfFlightsWithStopovers = 0;
    for (let i = 0; i<flights.length; i++){
        flights[i].scale == true ? numberOfFlightsWithStopovers+= 1 : 
        numberOfFlightsWithStopovers = numberOfFlightsWithStopovers;
    };
    console.log(`From the scheduled flights, ${numberOfFlightsWithStopovers} have a stopover`);
    console.log('The flights still available for the day are the following:')
    for (let i = flights.length - 5; i<flights.length; i++){
        console.log(`The flight with ID ${flights[i].id} flies to: ${flights[i].to}`)
    };
    return
};

