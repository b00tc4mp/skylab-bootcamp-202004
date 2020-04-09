// Review1 -> sum = Math.round(sum * 1000) / 1000;
//                  cambiado a ParseFloat(sum.toFixed(3));
// Review2 -> sqr = num1^2; cambiado a sqr = Math.sqrt(num1);

// El usuario va a introducir 2 numeros
// Por consola se mostrará un array con el resultado amigable
// results = [num1 + num2 = resultSum, num1 - num2 = resultRest, 
//          num1 * num2 = resultMult, num1 / num2 = resultDiv]
// Si no hay num2, result = √num1 
 

// Funcion principal - calculate(num1, num2)

function calculate(num1, num2) {
    if (typeof num1 == 'number' && typeof num2 == 'number') {
        var arr = [
            resultSum(num1, num2), 
            resultRest(num1, num2),
            resultMult(num1, num2),
            resultDiv(num1, num2)
        ];
        return 'results = ' + arr;

    } else if (typeof num1 == 'number' && typeof num2 == 'undefined'){
        var square = resultSquare(num1);
        return 'result = ' + square;

    } else {
        return 'Por favor introduce únicamente números.'
    }
}


// Funciones para los 4 resultados (num1 && num2)

// Suma
function resultSum(num1, num2) {
    var sum = num1 + num2;
    var fixSum = parseFloat(sum.toFixed(3));
    return num1 + ' + ' + num2 + ' = ' + fixSum;
}

// Resta
function resultRest(num1, num2) {
    var rest = num1 - num2;
    var fixRest = parseFloat(rest.toFixed(3));
    return ' ' + num1 + ' - ' + num2 + ' = ' + fixRest;
}

// Multiplicación
function resultMult(num1, num2) {
    var mult = num1 * num2;
    var fixMult = parseFloat(mult.toFixed(3));
    return ' ' + num1 + ' x ' + num2 + ' = ' + fixMult;
}

// División
function resultDiv(num1, num2) {
    var div = num1 / num2;
    var fixDiv = parseFloat(div.toFixed(3));
    return ' ' + num1 + ' / ' + num2 + ' = ' + fixDiv;
}


// Funcion para un parámetro (num1)

// Raíz Cuadrada
function resultSquare(num1) {
    var sqr = Math.sqrt(num1);
    var fixSqr = parseFloat(sqr.toFixed(3));
    return '√' + num1 + ' = ' + fixSqr;
} 

