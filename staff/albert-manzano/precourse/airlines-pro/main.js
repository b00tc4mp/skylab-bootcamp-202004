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
    ],
    
var eraseId;
var confirm3;

function presentFlights() {
    for(var i=0;i<flights.length;i++){
        flightDisplay= `flight ${flights[i].id}: from ${flights[i].from} to ${flights[i].to} costs ${flights[i].cost} and `   
        concatenate(flights[i].scale);
    }  
}

function concatenate(scale) {
    if(scale===true){
        console.log(flightDisplay.concat(" has scales."));
    }else{
        console.log(flightDisplay.concat(" has no scales."));
    }    
}

function byeBye() {
    var bye=confirm("Do you want quit the program?")
    if(bye){
        console.log("Thanks! cya around!");
    }else{
        detectUser();
    }
}

function eraseFlight(eraseId){
    eraseId=parseInt(eraseId);
    for(var i=0;i<flights.length;i++){
        if(flights[i].id===eraseId){
            flights.splice([i],1);
            presentFlights();
            return
        } 
    }
    var confirm4=("Do you want to keep erasing flights?")
        if(confirm4){
            eraseFlight();
        }else{
            eraseOrAdd();
        }   
}

function newFlight() {
    var confirm1=true
    if(confirm1==true && flights.length<15){
            var flight= {
                id: parseInt(prompt("please introduce the ID number")),
                to: prompt("please introduce destination"),
                from: prompt("please introduce origin"),
                cost: parseInt(prompt("please introduce the cost of the flight")),
                scale: confirm("the flight realizes scales?"),   
                }
            
            flightDisplay=(`flight ${flight.id}: from ${flight.from} to ${flight.to} costs ${flight.cost} and `);
            concatenate(flight.scale);
            flights.push(flight);
            // presentFlights()
            confirm1=confirm("Do you want to add more flights?");
        }else if(flights.length=15){
            alert("can not add more flights");
            alert("erase some flights first");
            eraseOrAdd("erase");
        }else if(confirm1==false,null){
            eraseOrAdd("erase");
    }
}

function eraseOrAdd(){
    var eraseOrAdd=prompt("You can erase or add flights, what do you want to? erase or add?")
    switch (eraseOrAdd) { 
        case "erase":
            eraseId=prompt("select and ID number to erase the flight")
                if (isNaN(eraseId)) { 
                    alert("number not detected");
                    eraseId=prompt("select and ID number to erase the flight");
                }else{
                    eraseFlight(eraseId);
                }

            break;
            case "add":
                var add=confirm("do you want to add a flight?")
                if(flights.length<16 && add==true) {
                    newFlight()
                }else if(flights.length=16 && add== true){
                    alert("can not add more flights");
                    alert("erase some flights first");
                    eraseOrAdd=prompt("You can erase or add flights, what do you want to do? delete or add?");
                }else{
                    confirm3=confirm("do you want to keep operating as ADMIN?");
                    if(confirm3){
                        eraseOrAdd();
                    }else{
                        userOrAdmin=prompt("Please introduce if you are User or Admin?");
                    }
                }
             break;                     
            case null:
            confirm3=confirm("do you want to keep operating as ADMIN?");
                if(confirm3){
                    eraseOrAdd();
                }else{
                    userOrAdmin=prompt("Please introduce if you are User or Admin?");
                }
                break;
    }   
}

function userDisplay() {
    var flightsCopy=flights
    flightsCopy.sort((a, b) => a.cost - b.cost);
    alert("thanks for your purchase!");
    var confirm5=confirm("Do you want to do something else?");
    if(confirm5==true){
        detectUser();
    }else{
        byeBye();
    }
}

function detectUser(userOrAdmin){
    var userOrAdmin=prompt("Please introduce if you are User or Admin?");
    switch (userOrAdmin.toUpperCase()) {
        case "USER":
            userDisplay();
            break;
        case "ADMIN":
            eraseOrAdd();
            break;
        case null:
            byeBye()
            break;
        default:
            alert ("Option not detected!");
            break;
    }
    byeBye()
}

function skyLabAirlinesPro(){
    alert("these are the flights for today");
    presentFlights() ;
    detectUser()  ;
}

skyLabAirlinesPro()





