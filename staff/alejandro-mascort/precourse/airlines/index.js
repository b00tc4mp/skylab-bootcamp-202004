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

(function airlines(){
    let user=prompt("Introduce your user name: ");
    while(!user){
        user=prompt("Introduce your user name: ");
    }
    alert("Welcome, "+user+".");
    let costeMedio=0;
    let numEscalas=0;
    let ultimosVuelos="";
    for (let i=0;i<flights.length;i++){
        let escala=(flights[i].scale)? "." : " y no realiza ninguna escala.";
        console.log("El vuelo con origen "+flights[i].from+ ", y destino: "+flights[i].to+" tiene un coste de "+flights[i].cost+ "€"+escala+"\n");
        costeMedio+=flights[i].cost;
        if (flights[i].scale){
            numEscalas++;
        }
        if (flights[i].id>=(flights.length-5)){
            if (flights[i].id<=(flights.length-3)){
                ultimosVuelos+=" "+flights[i].to+",";
            }else if(flights[i].id==(flights.length-2)){
                ultimosVuelos+=" "+flights[i].to;
            }else{
                ultimosVuelos+=" y "+flights[i].to+".";
            }
        }
    }
    costeMedio/=flights.length;
    console.log("\n");
    console.log("El coste medio de los vuelos es: "+costeMedio.toFixed(2)+"€\n");
    console.log("Existen "+numEscalas+" vuelos que realizan escala.\n");
    console.log("Los últimos vuelos del día presentan los siguientes destinos:"+ultimosVuelos+"\n");
})();