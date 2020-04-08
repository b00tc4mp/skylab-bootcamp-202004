
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
    
   function question(name){
    name = prompt("Bon dia, escriu el teu nom...: ");
    alert("Hola " + name +" , benvingut")
}
 question()    
    
    
    var totalCost = 0;
    
    //Mostra tots els vols, informant de si fan escala o no.
    for (var i = 0; i< flights.length; i++){
        totalCost = totalCost + flights[i].cost;
        if(flights[i].scale == false){ 
    console.log("El vol amb origen: " + flights[i].from + " amb desti: " + flights[i].to + " te un preu de : " + flights[i].cost + " eur." + "  y  no realiza escala")
            
            
        
}
        else{
             console.log("El vol amb origen: " + flights[i].from + " amb desti: " + flights[i].to + " te un preu de : " + flights[i].cost + " eur." + "  y  realiza por lo menos una escala")
        }
    }
    //Calcul del preu mig 
    var averageCost = totalCost / flights.length;
    averageCost = averageCost.toFixed(2);
    console.log( " El preu mig dels vols es: " + averageCost + " eur.");
    
    // Mostra els vols que fan escala
    function scaleFlights(){
        console.log ( " Els vols que fan escala son:")
        for (var i = 0; i< flights.length; i++){
            if(flights[i].scale == true){
                console.log("Origen: " + flights[i].from + " amb desti: " + flights[i].to )
            }
        }
    }
    scaleFlights()
    
     //Mostra els 5 darrers vols del dia amb el seu desti
    function lastFive(){
        console.log("Els darrers vols del dia son: ")
        for (var i = 6; i < flights.length; i++){
            console.log("Desti: " + flights[i].to + " amb sortida desde: " + flights[i].from);
        }
    }
    lastFive()
