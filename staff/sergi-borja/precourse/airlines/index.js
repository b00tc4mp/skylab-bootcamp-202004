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

var name = prompt('¿Cuál es tu nombre?');
var media = 0;
var escala = 0;

j = 0;

alert('Hola ' + name + ', Bienvenido a Skylab Airlines');
alert('Te vamos a mostrar todos los vuelos disponibles para hoy:');


for (i=0;i<flights.length; i++) {
    
    
    media += flights[i].cost;
    
    if (flights[i].scale == true) {
        j = j+1;
        console.log('El vuelo con origen ' + flights[i].from + ' y destino ' + flights[i].to + ' cuesta ' + flights[i].cost + ' y tiene escala.');
    }   else if (flights[i].scale == false) {
                console.log('El vuelo con origen ' + flights[i].from + ' y destino ' + flights[i].to + ' cuesta ' + flights[i].cost + ' y no tiene escala.');
    }      

}                  
media = media/flights.length;
escala = parseInt(j);
 

console.log('');
console.log('El coste medio de los vuelos es de: ' + media.toFixed(2) + ' euros')
console.log('El numero de vuelos con escala es de: ' + escala);
console.log('Los cinco ultimos destinos del día son ' + flights[6].to + ', ' + flights[7].to + ', '  + flights[8].to + ', ' + flights[9].to + ' y ' + flights[10].to);

