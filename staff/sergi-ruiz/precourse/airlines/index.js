function convertBool (string) {
    if (string.toLowerCase() == 'true') {
        return true;
    } else if (string.toLowerCase() == 'false') {
        return false;   
    }
}

function samePrice(flights, price) {
    let scales = "without scales";
 var numFlights = 0;
    for (let i = 0; i<flights.length; i++) {
        if (flights[i].cost == price) {
	numFlights++;
	if (flights[i].scales == true) {
		scales = "with scales";
	}
              console.log(`Flight with ID ${flights[i].id} to ${flights[i].to} from ${flights[i].from} with cost ${flights[i].cost} ${scales}`);
        }
    }
    if (numFlights == 0) {
	console.log("No flights with this parameters");
	}

}

function morePrice(flights, price) {
   let scales = "without scales";
 var numFlights = 0;
    for (let i = 0; i<flights.length; i++) {
        if (flights[i].cost > price) {
	numFlights++;
	if (flights[i].scales == true) {
		scales = "with scales";
	}
             console.log(`Flight with ID ${flights[i].id} to ${flights[i].to} from ${flights[i].from} with cost ${flights[i].cost} ${scales}`);
        }
    }
    if (numFlights == 0) {
	console.log("No flights with this parameters");
   }
}

function lessPrice(flights, price) {
   let scales = "without scales";
   var numFlights = 0;
    for (let i = 0; i<flights.length; i++) {
        if (flights[i].cost < price) {
	numFlights++;
	if (flights[i].scales == true) {
		scales = "with scales";
	}
              console.log(`Flight with ID ${flights[i].id} to ${flights[i].to} from ${flights[i].from} with cost ${flights[i].cost} ${scales}`);
        }
    }
    if (numFlights == 0) {
	console.log("No flights with this parameters");
}
}


var flights = [
{ id : 00 , to : 'Bilbao' , from : 'Barcelona' , cost : 1600 , scale : false },
{ id : 01 , to : 'New York' , from : 'Barcelona' , cost : 700 , scale : false },
{ id : 02 , to : 'Los Angeles' , from : 'Madrid' , cost : 1100 , scale : true },
{ id : 03 , to : 'Paris' , from : 'Barcelona' , cost : 210 , scale : false },
{ id : 04 , to : 'Roma' , from : 'Barcelona' , cost : 150 , scale : false },
{ id : 05 , to : 'London' , from : 'Madrid' , cost : 200 , scale : false },
{ id : 06 , to : 'Madrid' , from : 'Barcelona' , cost : 90 , scale : false },
{ id : 07 , to : 'Tokyo' , from : 'Madrid' , cost : 1500 , scale : true },
{ id : 08 , to : 'Shangai' , from : 'Barcelona' , cost : 800 , scale : true },
{ id : 09 , to : 'Sydney' , from : 'Barcelona' , cost : 150 , scale : true },
{ id : 10 , to : 'Tel-Aviv' , from : 'Madrid' , cost : 150 , scale : false }
];
var endApp = false;
while (endApp == false) {
var user = prompt("Insert your username:");
console.log(`Welcome ${user}`);	

var averageCost = 0;
var numScales = 0;

for (let i = 0; i<flights.length ; i++){
	let scales = "don't realize";
	averageCost = averageCost + flights[i].cost;
	
	if (flights[i].scale == true) {
		scales = 'realize';
		numScales++;
	}
	console.log(`The flight origin: ${flights[i].from} to ${flights[i].to} have a cost of ${flights[i].cost}€ and ${scales} scales.`);
	if (i == flights.length - 1 ) {
	 averageCost = (averageCost / flights.length).toFixed(2);
	 console.log(`The average cost of the flights is ${averageCost}€`);
	 console.log(`There are ${numScales} flights with scales`);
	}

}
console.log("The last 5 destinations are going to:");
for (let i = flights.length - 1; i>=flights.length - 5; i--) {
	console.log(flights[i].to);
}


var login = prompt("Are you ADMIN or USER?");
login = login.toLowerCase();
if (login == "admin") {
	var exit = false;
	while (exit == false) {
		var selection = prompt("Select: 1. CREATE FLIGHT, 2.REMOVE FLIGHT, 3.EXIT");
		switch(selection) {
			case "1" :
				if (flights.length < 15 ) {
					destination = prompt("Destination?");
					origin = prompt("Origin?");
					price = parseInt(prompt("Cost in €?"));
					scales = (prompt("Scales? true/false"));
					scales = convertBool(scales);
					var newFlight = {id: flights.length, to: destination, from:origin, cost:price, scale: scales};
					flights[flights.length] = newFlight;
					console.log(flights);
				} else {
					alert("Error: Max Flights reached"); 
				}
				break;
			case "2" :
				let idRemove = prompt("Please, insert the ID of the flight to remove");
				let i = 0;
				var found = false;
				while (found != true) {
					if (flights[i].id == idRemove) {
						flights.splice(i, 1);
						found = true;
						
						for (i ; i<flights.length; i++) {
							flights[i].id--;
						}
					} 
					i++;
					if (i == flights.length) {
						alert("Error: flight ID not found");
					}
				}
				break;
			case "3" :
				exit = true;
				break;
			default :
				break;
			}
		}
	} else if (login == "user") {
		var selection = prompt("Flight finder by price, select: 1.MORE PRICE 2.SAME PRICE 3.LESS PRICE");
		var price = parseInt(prompt("price in euros?"));
		switch(selection) {
    			case "1":
        			morePrice(flights, price);
        			break;
   			 case "2":
        			samePrice(flights, price);
        			break;
    			case "3": 
        			lessPrice(flights, price);
        			break;
    			default :
        			break;
			}
		console.log("This flights match the selected properties.");
		prompt("Insert ID to buy");
		alert("Thank you for the purchase, see you next time");
}

var finish = prompt("Close app? y/n");
finish = finish.toLowerCase();
if (finish == "y") {
	endApp = true;
} 
}
	



			