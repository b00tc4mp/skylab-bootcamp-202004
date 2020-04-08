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

var name = null;

function enterName(){
    
    name = prompt('Enter your name')
    if(!name){
        return enterName()
     }
     console.log(`HELLO ${name} WELCOME TO SKYLAB AIRLINES!`)
}

enterName()
 
/*
for(let i=0; i < flights.length; i++){
var to = flights[i].to
var from = flights[i].from
var cost = flights[i].cost
var scale = flights[i].scale
var status = scale ? ' realiza una' : ' no realiza ninguna'
    console.log(`El vuelo con origen: ${from}, y destino: ${to} tiene un coste de ${cost} y ${status} escala.
        `)
}
*/

flights.forEach(function({to: destination,from: origin,cost, scale}) {
    var status = scale ? ' realiza una' : ' no realiza ninguna'
    console.log(`El vuelo con origen: ${origin}, y destino: ${destination} tiene un coste de ${cost}€ y ${status} escala.
        `)
});
/*
var total = 0;
for(let i=0; i < flights.length; i++){
   
    var cost = flights[i].cost
    total += cost
   
    }
    console.log((total/flights.length).toFixed(3))
    */

var avg = (flights.reduce(function(acumulator, {cost}){ 
    return (acumulator + cost)
},0) / flights.length).toFixed(2)

console.log(avg)



var flightsScale = []
for(let i=0; i < flights.length; i++){
   
    var scale = flights[i].scale

    if(scale){
        flightsScale.push(flights[i])
    }
}
console.log(flightsScale.length)



var flightsScale = flights.filter(function(flight){
    return flight.scale;
})

console.log(flightsScale.length);


var flightsTo = flights.filter(function(flight){
    return (flight.id > 5)
})

console.log(flightsTo)

console.log('The last 5 flights of the day have the following destinations:')
flightsTo.forEach(function(flight){
    console.log(flight.to)
})



function login(){
    
    var role = prompt('Are you an admin or an user?')

    if(role === 'admin'){
        

        var action = prompt('Do you want to add or eliminate?')
            if(action === 'add'){

                function addFlight(){
                    var origin = prompt ('Where are you departing from?')
                    var destination = prompt('Where are you going?')
                    var cost = prompt('How much does it cost?')
                    var scale = confirm('Whith scale or not?')
                    var id = flights.length
    
                    var newFlight = {id, origin, destination, cost, scale}
    
                   flights.push(newFlight)

                   if (flights.length >= 15){
                    return alert('You cannot introduce more flights!')
                    }

                    var addMore = confirm('Do you want to add more flights?')

                    if (addMore) {
                        addFlight()
        
                    } else {
                        prompt('thank you')
                    }

                   console.log(flights)
                }
                
               addFlight()

            }
            if(action === 'eliminate'){
                var id = prompt('which id do you want to eliminate?')
                flights = flights.filter(function(flight){
                    return flight.id !== parseInt(id);
                })  
                console.log(flights); 
            }

     }

    if(role === 'user'){

            var flightsLowerToHigher = flights.sort(function(a,b){
                return a.cost - b.cost;
            });

            console.log(flightsLowerToHigher);

            var flightsHigherToLower = flights.sort(function(a,b){
                return b.cost - a.cost;
            });

            console.log(flightsHigherToLower)
            
           var sameCost = flights.filter(function(flight, i, array){
               var result = array.filter(function(f){
                    return flight.cost === f.cost
                })  
                return result.length >= 2
            });
           console.log(sameCost)
            
            
        }



        
        
    }login()
























    


