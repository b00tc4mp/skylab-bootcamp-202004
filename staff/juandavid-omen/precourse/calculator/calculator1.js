function squareRoot(a) {
    let sqrt = Math.sqrt(a);
    if (Number.isInteger(sqrt)) {
        return sqrt;
    }
    return sqrt.toFixed(3);
}

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
function decimals(number) {
    if ( Number.isInteger(number)) {
        return number;
    }
    return number.toFixed(3);
}

function calculator(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        let results = [`${a} + ${b} = ${decimals(add(a,b))}`, 
                    `${a} - ${b} = ${decimals(subtract(a, b))}`, 
                    `${a} * ${b} = ${decimals(multiply(a, b))}`,
                    `${a} / ${b} = ${decimals(divide(a, b))}`];
        for (let result of results) {
            console.log(result);
        } 
    } else if (typeof a === 'number' && typeof b === "undefined") { 
        console.log(`sqrt(${a}) = ` + squareRoot(a));
    } else if (typeof a != 'number') {  
        console.log(`The value '${a}' is not a number.`);
        
    } else { 
        console.log(`The value '${b}' is not a number.`);
    }
}

calculator(4);
calculator(5);
calculator('f');
calculator(4, '9');
calculator('2', 1);
calculator(4, 5);
calculator(4.2, 5.6);