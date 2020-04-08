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
function program(){
    greet();
    show();
    price();
    scales();
    lastFive();

}
//Pide el nombre al usuario y le saluda
function greet(){
    var name="";
    do{
        name= prompt("Introduce nombre de usuario", "");
    }while(isNaN(parseFloat(name))==false || name=="");
}
//Muestra la informacion de los vuelos
function show(){
    flights.forEach(vuelo => {
        if(vuelo.scale==true){
            console.log("El vuelo con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y  realiza escalas");
        }else{
            console.log("El vuelo con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y no realiza escalas");        
        }
    });
    //console.log("El vuelo con origen aa y destino bb tiene un coste de xxxx€ y no realiza escalas")
}
//Calcula el precio medio de los vuelos
function price(){
    var precio=0;
    flights.forEach(vuelo => {
        precio+=vuelo.cost;
    });
    precio= precio/flights.length+1;
    precio=precio.toFixed(2);
    console.log("El precio medio de los vuelos es de "+precio+"€");
}
//Cuenta cuantos vuelos tienen escalas
function scales(){
    var s=0;
    flights.forEach(vuelo=>{
        if(vuelo.scale==true){
            s++;
        }
    });
    console.log("Hay un total de "+s+" vuelos con escala");
}
//Muestra el destino de los últimos 5 vuelos del día
function lastFive(){
    var destino="Los últimos 5 vuelos del día van a "
    for(var i=flights.length-5;i<flights.length;i++){
        if(i==flights.length-1){
            destino+= "y "+flights[i].to+" respectivamente"
        }else{
            destino+=flights[i].to+" ";
        }
    }
    console.log(destino);
}

program();

//preguntar nombre
//dar la bienvenida
//mostrar vuelos disponibles
//mostrar precio medio de los vuelos
