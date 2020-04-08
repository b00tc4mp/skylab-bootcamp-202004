var num;
var num2;

num = (parseFloat(prompt('Introduce un numero:' )));
num2 = (parseFloat(prompt('Introduce otro numero:' )));

var suma = num + num2;
var resta = num - num2;
var multiplicacion = num * num2;
var division = num / num2;
var cuadrada = Math.sqrt(num);
var cuadrada2 = Math.sqrt(num2);

var decimal = parseFloat(suma.toFixed(3));
var decimal2 = parseFloat(resta.toFixed(3));
var decimal3 = parseFloat(multiplicacion.toFixed(3));
var decimal4 = parseFloat(division.toFixed(3));
var decimal5 = parseFloat(cuadrada.toFixed(3));
var decimal6 = parseFloat(cuadrada2.toFixed(3));

if(isNaN(num) && isNaN(num2)) {
    console.log('MAL! Hay que introducir un numero por favor');

} else if (num == "" || isNaN(num)) {
    console.log('La raíz cuadrada del numero introducido es ' +  decimal6);

} else if (num2 == "" || isNaN(num2)) {
    console.log('La raíz cuadrada del numero introducido es ' +  decimal5);


}  else {
  
    var resultados = ['La suma es ' + decimal, 'La resta es ' + decimal2, 'La multiplicación es ' + decimal3, 'La división es ' + decimal4];
    console.log(resultados);

}