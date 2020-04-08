function add(args) {
    let result = 0;
    for (num of args ) {
        result += num;
    }
    return result;
}

function subtract(args) {
    let result = args[0];
    for (let num = 1; num < args.length; num++) {
       result -= args[num];
    }
    return result;
}

function multiply(args) {
    let result = args[0];
    for (let num = 1; num < args.length; num++) {
        result *= args[num];
     }
    return result;
} 

function divide(args) {
    let result = args[0];
    for (let num = 1; num < args.length; num++) {
        result /= args[num];
     }
    return result; 
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

function validateParameters(args) {
    for (let i = 0; i < args.length; i++) {
        if (Number.isNaN(args[i])) {
            return false;
        }
    }  
    return true;   
}

function doOperations(args) { 
    let operationResults = [];

    if (!validateParameters(args)) {
        console.error(`One of the assigned values is not a number`);
    } else if (args.length === 1) {
        let firstParam = args[0];
        operationResults[0] = `sqrt(${firstParam}) = ${formatDecimals(squareRoot(firstParam))}`;
    } else {
        operationResults[0] = `Sum result : ${formatDecimals(add(args))}`;
        operationResults[1] = `Subtraction result : ${formatDecimals(subtract(args))}`;
        operationResults[2] = `Multiplication result : ${formatDecimals(multiply(args))}`;
        operationResults[3] = `Division result : ${formatDecimals(divide(args))}`;
    }
    return operationResults;
}

function getNumbers() {
    let numbers = [];
    let moreNumbers; 

    do {
        let number = parseFloat(prompt('Insert a number'));
        moreNumbers = confirm('Do you want to add another number?');
        numbers.push(number);                    
    
    } while(moreNumbers);
    return numbers;

}

function buildFinalResult(operationResults) {
    let finalResult = '';
    for (let i = 0; i < operationResults.length; i++) {
        finalResult += operationResults[i];
        if (i < operationResults.length - 1) {
            finalResult += '\n';    
        }
    } 
    if (finalResult === '') {
        finalResult = 'Not posible to do operations with the introduced data';
    }
    return finalResult;
}

function calculator() {
    let newOperation;
    do {
        let numbers = getNumbers(); 
        let operationResults = doOperations(numbers);
        let finalResult = buildFinalResult(operationResults);
        alert(finalResult);
        newOperation = confirm('Do you want to do a new operation?');
    } while (newOperation);

    alert("Bye!");

}
calculator();