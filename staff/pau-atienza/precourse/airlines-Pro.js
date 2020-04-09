// Defino el objeto fuera de la función paraque podamos modificarlo como admin
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

function airlines() {
    //Pedimos el username
    username = prompt('Please introduce your username');
    //Saludamos
    console.log(`Hello ${username}, welcome to Skylab Airlines`);
    //Declaramos la variable flights
    console.log(`The flights scheduled for today are the following:`);
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
    //Mostramos los últimos 5 vuelos
    console.log('The flights still available for the day are the following:')
    for (let i = flights.length - 5; i<flights.length; i++){
        console.log(`The flight with ID ${flights[i].id} flies to: ${flights[i].to}`)
    };
    //Preguntamos si es user o admin
    let userOrAdmin = prompt('Are you a user or an administrator? USER/ADMIN');
    counter = 0;
    if (userOrAdmin.toUpperCase() == 'ADMIN') {
        //Si es admin, preguntamos qué quieren hacer
        do{

            let option = prompt('What action would you like to perform?\n1. Introduce new flights.\n2. Delete flights.\n3. Exit.\nPlease introduce the number of the desired option.');

            if (option == '1'){
            
                if (counter >= 15) {
                    alert('You are not allowed to introduce more than 15 new flights');
                }
                else{

                    //Declaramos un nuevo vuelo vacío
                    flights[flights.length] = {id: flights[flights.length - 1].id + 1, to: '', from: '', cost: 0, scale: false};
                
                    //Introducimos la destinación del vuelo. Entiendo que para determinar si la destinación es válida o no, debería de tener
                    //una base de datos con todas las posibles destinacions y comparar, pero como no la tenemos, utilizaré un condicional más
                    //genérico (si la destinación introducida es un string)

                    newFlightTo = prompt('You have chosen to introduce a new flight. What is the destination of the new flight?');

                    if (typeof newFlightTo == 'string') {
                        flights[flights.length - 1].to = newFlightTo[0].toUpperCase() + newFlightTo.substring(1).toLowerCase();
                    }
                    else{
                        console.log('Invalid destination. Please restart the process'); 
                        flights.splice(flights.length - 1);
                        return;
                    };

                    //Introducimos origen del nuevo vuelo (asumo que solamente puede ser Marid o Barcelona por los datos de los otros vuelos,
                    //cualquier otro input lo considero nulo y se tiene que reiniciar el proceso)

                    newFlightFrom = prompt('What is the origin of the new flight? Madrid/Barcelona');

                    if(newFlightFrom.toLowerCase() == 'barcelona') {
                        flights[flights.length - 1].from = 'Barcelona';
                    }
                    else if (newFlightFrom.toLowerCase() == 'madrid') {
                        flights[flights.length - 1].from = 'Madrid';
                    }
                    else{
                        console.log('Invalid origin. Please restart the process'); 
                        flights.splice(flights.length - 1);
                        return;
                    };

                    //Inroducimos el coste del nuevo vuelo. 
                 
                    newFlightCost = prompt('What is the price of the new flight in Euros?');
                    if(parseFloat(newFlightCost) / parseFloat(newFlightCost) == 1 || parseFloat(newFlightCost) == 0) {
                        flights[flights.length - 1].cost = parseFloat(newFlightCost);
                    }
                    else{
                        console.log('Invalid cost. Please restart the process'); 
                        flights.splice(flights.length - 1);
                        return;
                    };

                    //El nuevo vuelo tiene escalas? 

                    newFlightStopover = prompt('Does the new fight have any stopovers? Yes/No');

                    if(newFlightStopover.toLowerCase() == 'yes') {
                        flights[flights.length - 1].scale = true;
                    };

                    counter += 1;
                    //Alerta de 15 vuelos
                };
            }
            else if (option == '2') {
                //Preguntamos qué vuelo se quiere eliminar y lo eliminamos.
                flightID = prompt('Please introduce the ID of the flight that you wish to delete');
                flightID = parseInt(flightID)
                for (let i = 0; i < flights.length; i++){
                    if (flights[i].id == flightID) {
                        var counter2 = i
                    };
                };
    
                if (counter2){
                    flights.splice(counter2,1);
                }  
                else{
                    alert('Invalid ID. Please restart the process.');
                };
            }
            else if (option == '3') {
                console.log('Thank you for helping Skylab Airlanes to offer the best service.');
                return;
            }
            else{
                console.log('Invalid option.');
            };
            moreActions = prompt('Would you like to perform another action? Yes/No');

        } while (moreActions.toLowerCase() == 'yes');
           
        //Si dicen que no, agradecemos y nos despedimos
        if (moreActions.toLowerCase() == 'no'){
            console.log('Thank you for helping Skylab Airlanes to offer the best service.');
            return;
        }
        else{
            alert('Invalid answer. Please restart the process.');
            return;
        };
    }
    else if(userOrAdmin.toUpperCase() == 'USER'){
        
        do{
            let option = prompt('What action would you like to perform?\n1. Show flights filtered by price.\n2. Buy a flight.\n3. Exit.\nPlease introduce the number of the desired option.');

            if (option == '1'){
                //Filtrar los elementos con un precio mayor, menor o igual a una cifra
                filter = prompt('Please introduce the desired price filter for your search.\nThe filter should include a comparative operator (<, > or =) and a price\nseparated by spaces');
                filter = filter.split(' ');
                filter[1] = parseInt(filter[1]);
                //Check de que la cifra sea un número
                if (filter[1] / filter[1] !== 1 || filter[1] === 0) {
                    console.log('Invalid amount to filter for. Please restart the process.');
                    return;
                };

                //Definimos un objecto que incluye la relación entre el símbolo introducido en el prompt y el filto que queremos
                functions = {
                    '<' : function(i){return(flights[i].cost < filter[1])}, 
                    '=': function(i){return(flights[i].cost === filter[1])}, 
                    '>': function(i){return(flights[i].cost > filter[1])}
                };

                //Check de que el símbolo es uno de los tres que hemos pedido
                if (functions[filter[0]] === undefined){
                    console.log('Invalid operator. Please restart the process.');
                    return;
                };

                //Aplicamos el filtro que nos haya pedido el usuario y mostramos los vuelos que pasan el filtro.
                for (let i = 0; i<flights.length; i++){
                    if (functions[filter[0]](i) === true){
                        console.log(`The flight with id: ${flights[i].id}, origin: ${flights[i].from} and destination: ${flights[i].to} costs ${flights[i].cost}€ and ${flights[i].scale == true ? 'has' : 'does not have'} a stopover`)
                    };
                };
            }
            else if (option == '2'){
                ID = prompt('Please introduce the ID of the flight that you wish to buy');
                ID = parseInt(ID);
                var counter3 = 0
                for (i = 0; i<flights.length; i++){
                    if (flights[i].id === ID){
                        console.log('Thank you for your purchase.');
                        counter3 = 1
                    };
                };
                if(counter3 == 0) {
                    alert('Invalid ID.');
                };
            }
            else if (option == '3') {
                console.log('Thank you for choosing Skylab Airlanes. We look forward to helping you in the future.');
                return;
            }
            else{
                console.log('Invalid option.');
            };
            moreActions = prompt('Would you like to perform another action? Yes/No');
        } while(moreActions.toLowerCase() == 'yes')

        //Si dicen que no, agradecemos y nos despedimos
        if (moreActions.toLowerCase() == 'no'){
            console.log('Thank you for choosing Skylab Airlanes. We look forward to helping you in the future.');
            return;
        }
        else{
            alert('Invalid answer. Please restart the process.');
            return;
        }; 
    }
    else {console.log('Invalid answer. Please restart the process.')};
    return;
};