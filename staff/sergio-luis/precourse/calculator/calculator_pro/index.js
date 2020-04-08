// ============ Program Calculator ======================
var finalResult = [],
    operation = [' + ', ' - ', ' * ', ' / '],
    numberArray = [],
    results = [];

//Run a program
calculator();

//Function program to calculate
function calculator() {
    verificationInputNumbers();

    if (numberArray.length > 1) {
        results.push(sum(numberArray));
        results.push(sub(numberArray));
        results.push(mult(numberArray));
        results.push(div(numberArray));
    } else if (numberArray.length === 1) {
        results.push(Math.sqrt(numberArray[0]));
    } else {
        alert('ERROR No ha introducido ningum valor, refresca la página!')
    }

    analyzeDecimal();
    formatFinalResult();
    newOperation();
};
//***************************
//**** FUNCTIONS ************
//***************************

//Verification of input numberArrays
function verificationInputNumbers() {
    do {
        var number = prompt('Introduce los números a calcular!\nPara parar de introducir números escriba la palavra "stop"!').toLowerCase();
        if (parseFloat(number) * 1 == number) {
            numberArray.push(parseFloat(number));
        } else if (number === 'stop') {
            alert('Gracias por introducir los números! \nLos resultados se mostraran por consola!');
        } else {
            console.log('No ha introducido un numero!');
        }
    } while (number !== 'stop');
}

// Operations 
function sum(arr) {
    var suma = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
        suma += arr[i + 1];
    }
    return suma
}

function sub(arr) {
    var subt = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
        subt -= arr[i + 1];
    }
    return subt
}

function mult(arr) {
    var mult = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
        mult *= arr[i + 1];
    }
    return mult
}

function div(arr) {
    var divi = arr[0];
    for (var i = 0; i < arr.length - 1; i++) {
        divi /= arr[i + 1];
    }
    return divi
}

//Results put just 3 decimal
function analyzeDecimal() {
    for (var i = 0; i < results.length; i++) {
        if (Math.floor(results[i]) !== results[i]) {
            if (results[i].toString().split(".")[1].length > 3) {
                results[i] = parseFloat(results[i].toFixed(3));
            }
        }
    }
}
//Format Final Result
function formatFinalResult() {
    if (results.length > 1) {
        var format = [];
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < numberArray.length; j++) {

                if (j === numberArray.length - 1) {
                    format.push(numberArray[j]);
                } else {
                    format.push(numberArray[j] + operation[i]);
                }
            }
            if (i === results.length - 1) {
                format.push(' = ' + results[i]);
            } else {
                format.push(' = ' + results[i] + ',  ');
            }
        };

        finalResult.push(format.join(''));
    } else {
        finalResult.push(' \u221a' + numberArray + ' = ' + results + ' ');
    };
    console.log('results = [ ' + finalResult + ' ]')
    finalResult.push('\n Next Operation\n')
}

//New operation
function newOperation() {
    do {
        var operation = prompt('Quieres hacer un nuevo calculo?! y/n').toLowerCase();
        if (operation === 'y') {
            numberArray = [];
            results = [];
            calculator();
        } else if (operation === 'n') {
            console.log('Bye!');
        } else {
            alert('Deve intoducir "y" o "n"!');
        }
    } while (operation !== 'y' && operation !== 'n')
};