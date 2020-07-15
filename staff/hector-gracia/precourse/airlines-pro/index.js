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
    var admin=false;// Si es el administrador o un usuario
    greet();
    show();
    price();
    scales();
    lastFive();
    admin=askAdmin();
    if(admin==true){
        console.log("Entra como administrador");
        edit();
    }else{
        search();
        booking();
    }

}
//Saluda al usuario
function greet(){
    var name="";
    do{
        name= prompt("Introduce nombre de usuario", "");
    }while(isNaN(parseFloat(name))==false || name=="");
    
    console.log("Bienvenido "+name);
}
//Muestra la informacion de los vuelos 
function show(){
    flights.forEach(vuelo => {
        if(vuelo.scale==true){
            console.log("El vuelo "+vuelo.id+" con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y  realiza escalas");
        }else{
            console.log("El vuelo "+vuelo.id+" con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y no realiza escalas");        
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
//Pregunta si es in administrador
function askAdmin(){
    var r="";
    do{
        r=prompt("¿Eres administrador? y/n","");
    if (r=="n"){
        return false;
    }else if (r=="y"){
        return true;
    }
    }while(r=!"n" || r!="y");
    
}
//Pregunta al administrador que quiere hacer
function edit(){
    var e= "Message";
    do{
        e=prompt("Introduce 'a' para añadir vuelos, introduce 'e' para eliminar, introduce 's' para salir");
        if(e=="a"){
            //Comprueba si puede añadir vuelos
            if(flights.length>14){
                alert("Solo puede haber no puede haber más de 15 vuelos a la vez");
            }else{
                addFlight();
            }
        }else if(e=="e"){
            deleteFlight();
        }
        //Muestra los vuelos para poder ver los cambios
        if(e=="a" || e=="e")
        {        
            console.log("Información de vuelos actualizada");
            show();
        }
        }while(e!="s");
    
    
}
//Pide información para crear un nuevo vuelo
function addFlight(){
    var flight=["id","to","from","cost","scale"];
    //Crea una id para el vuelo automaticamente
    flight[0]=flights[flights.length-1].id+1;
    do{
        flight[1]=prompt("Introduce destino del vuelo");
    }while(isNaN(parseFloat(flight[1]))==false || flight[1]=="");
    do{
        flight[2]=prompt("Introduce origen del vuelo");
    }while(isNaN(parseFloat(flight[2]))==false || flight[2]=="");
    do{
        flight[3]=prompt("Introduce coste del vuelo");
    }while(isNaN(flight[3])==true || flight[3]=="");
    do{
        flight[4]=prompt("¿El vuelo tiene escala? y/n");
    }while(flight[4]!="y" && flight[4]!="n");
    
    //Comprueba si tiene escala
    if (flight[4]=="y"){
        flight[4]=true;
    }else{
        flight[4]=false;
    }
    flights.push({ id: flight[0], to: flight[1], from: flight[2], cost: flight[3], scale: flight[4] });
}
//Elimina vuelo
function deleteFlight(){
    var id=prompt("Introduzca id del vuelo que desea eliminar");
    id= parseInt(id,10);
    for(var i=0;i<flights.length;i++){
        if(flights[i].id==id){
            flights.splice(i,1);
        }
    }
}
//Busqueda de vuelos
function search(){
    var precio= prompt("Introduce precio de busqueda");
    var filtered=flights;
    precio= parseFloat(precio);
    var criterio=prompt("¿Buscar precio mayor, menor o igual? a/b/i");
    //Aplica el filtro
    switch(criterio){
        case "a": 
                filtered = flights.filter(function(value, index, arr){
                    return value.cost > precio;
                });
                break;
        case "b":
                filtered = flights.filter(function(value, index, arr){
                    return value.cost < precio;
                });
                break;
        case "i":
                filtered = flights.filter(function(value, index, arr){
                    return value.cost == precio;
                });
                break;

        default:
            alert("Se ha introducido un valor incorrecto");
    }
    //Muestra los vuelos filtrados
    showFiltered(filtered);
    
}
//Muestra la informacion de los vuelos 
function showFiltered(filtered){
    filtered.forEach(vuelo => {
        if(vuelo.scale==true){
            console.log("El vuelo "+vuelo.id+" con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y  realiza escalas");
        }else{
            console.log("El vuelo "+vuelo.id+" con origen "+vuelo.from+" y destino "+vuelo.to+" tiene un coste de "+vuelo.cost+"€ y no realiza escalas");        
        }
    });
}
//Reserva el vuelo
function booking(){
    var vuelo=prompt("Introduzca el numero del vuelo que desea comprar");
    vuelo=parseInt(vuelo,10);
    var exist=false;
    for(var i=0;i<flights.length;i++){
        if(flights[i].id==vuelo){
            exist=true;
        }
    }
    if(exist){
        alert("Gracias por su compra, vuelva pronto.");
    }else{
        alert("El vuelo que usted ha solicitado no existe");
    }
}

program();

//preguntar nombre
//dar la bienvenida
//mostrar vuelos disponibles
//mostrar precio medio de los vuelos
//preguntar por administrador
//crear nuevo vuelo
//eliminar vuelo
//buscar por precio
