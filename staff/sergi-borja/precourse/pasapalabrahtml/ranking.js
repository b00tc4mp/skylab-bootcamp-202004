var name= localStorage.getItem('name');
var points= parseInt(localStorage.getItem('points'));

console.log(points);
console.log(name);

function Jugador(nameAux, puntosAux){
    this.nameAux = nameAux;
    this.puntosAux = puntosAux;
}

var jugador1 = new Jugador('Pedro', 4);
var jugador2 = new Jugador('Martin', 13);
var jugador3 = new Jugador('Nico', 10);
var jugador4 = new Jugador('Lionel', 19);
var jugador5 = new Jugador('Xavi', 5);
var jugador6 = new Jugador('Cristina', 8);
var jugador7 = new Jugador('Mario', 2);
var user = new Jugador(name, points);

var ranking = [jugador1,jugador2,jugador3,jugador4,jugador5,jugador6,jugador7,user];

ranking.sort((a, b) => b.puntosAux - a.puntosAux);

document.getElementById('first').innerHTML = ranking[0].nameAux + ' con '+ ranking[0].puntosAux + ' puntos'; 
document.getElementById('second').innerHTML = ranking[1].nameAux + ' con '+ ranking[1].puntosAux+ ' puntos';
document.getElementById('third').innerHTML = ranking[2].nameAux + ' con '+ ranking[2].puntosAux+ ' puntos';
document.getElementById('forth').innerHTML = ranking[3].nameAux + ' con '+ ranking[3].puntosAux+ ' puntos';
document.getElementById('five').innerHTML = ranking[4].nameAux + ' con '+ ranking[4].puntosAux+ ' puntos';
document.getElementById('six').innerHTML = ranking[5].nameAux + ' con '+ ranking[5].puntosAux+ ' puntos';
document.getElementById('seven').innerHTML = ranking[6].nameAux + ' con '+ ranking[6].puntosAux+ ' puntos';
document.getElementById('eight').innerHTML = ranking[7].nameAux + ' con '+ ranking[7].puntosAux+ ' puntos';