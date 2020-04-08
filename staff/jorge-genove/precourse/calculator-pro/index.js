alert("Welcome to calculator PRO!");
var controlPregunta;
var control = true;
var operaciones = [];
var numerosPasados = [];
var numero;
function operaciones2() {
  var suma = 0;
  var mult = 1;
  var resta = numerosPasados[0] * 2;
  var div = numerosPasados[0] * numerosPasados[0];

  for (let i = 0; i < numerosPasados.length; i++) {
    suma = roundToX(suma + numerosPasados[i], 3);
    resta = roundToX(resta - numerosPasados[i], 3);
    mult = roundToX(mult * numerosPasados[i], 3);
    div = roundToX(div / numerosPasados[i], 3);
  }
  operaciones.push(suma, resta, mult, div);
}
function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

function calculator() {
  if (confirm("¿Quieres añadir un numero?")) {
    for (let j = 0; control === true; j++) {
      controlPregunta = Number(prompt("Añade un numero"));
      if (Number.isNaN(controlPregunta)) {
        alert("debes introducir un numero");
        break;
      } else if (
        controlPregunta == "" ||
        controlPregunta == "undefined" ||
        controlPregunta == null
      ) {
        control = false;
      } else {
        numerosPasados[j] = controlPregunta;
      }
    }
  } else {
    alert("Que lastima los calculos son divertidos");
  }
}

calculator();
operaciones2();
console.log(`${numerosPasados.join(' + ')} = ${operaciones[0]}, 
${numerosPasados.join(' - ')} = ${operaciones[1]}, 
${numerosPasados.join(' * ')} = ${operaciones[2]}, 
${numerosPasados.join(' / ')} = ${operaciones[3]}`);
ask();
function ask() {
  var askF = prompt("New numbers? y/n");
  if (askF === "y") {
    control = true;
    operaciones = [];
    calculator();
    operaciones2();
    console.log(`${numerosPasados.join(' + ')} = ${operaciones[0]}, 
${numerosPasados.join(' - ')} = ${operaciones[1]},
${numerosPasados.join(' * ')} = ${operaciones[2]}, 
${numerosPasados.join(' / ')} = ${operaciones[3]}`);
    ask();
  } else if (askF === "n") {
    console.log("Bye");
  } else {
    console.log("I can't understand you");
    ask();
  }
}
