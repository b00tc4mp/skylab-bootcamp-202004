
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}
    
function multiply(a, b) {
    return a * b;
} 

function divide(a, b) {
    return a / b;   
}

function formatDecimals(number) {
   if (Number.isInteger(number)) {
        return number;
    }
    return number.toFixed(3);
}

function squareRoot(a) {
   return Math.sqrt(a);
}

function calculator (a, b) {
    let operationResults = [];
    if (typeof a !== 'number') {
        console.error(`The value "${a}" is not a number.`);
    } else if (b === undefined) {
        operationResults[0] = `sqrt(${a}) = ${formatDecimals(squareRoot(a))}`;
    } else if (typeof b !== 'number') {
        console.error(`The value "${b}" is not a number.`);
    } else {
        operationResults[0] = `${a} + ${b} = ${formatDecimals(add(a, b))}`;
        operationResults[1] = `${a} - ${b} = ${formatDecimals(subtract(a, b))}`;
        operationResults[2] = `${a} x ${b} = ${formatDecimals(multiply(a, b))}`;
        operationResults[3] = `${a} / ${b} = ${formatDecimals(divide(a, b))}`;
    }
    return operationResults;
}


let operationResults = calculator(0);
let finalResult = '';
for (let i = 0; i < operationResults.length; i++) {
    finalResult += operationResults[i];
    if (i < operationResults.length - 1) {
        finalResult += '\n';
    }
}


console.log(finalResult);
