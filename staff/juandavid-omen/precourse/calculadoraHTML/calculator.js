function setResult(value) {
    document.getElementById('result').value = value;
}

function getResult() {
    return document.getElementById('result').value;
}


function canAddDecimals(result) {
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] === '.') {
            return false;
        } else if(isNaN(result[i])) {
            return true;
        }
    }
    return true;
}

function isLastDigitIsNum(result) {
    if (isNaN(result[result.length-1])) {
        return false;
    }
    return true;
}

function addOperation(result, operation) {
    if ((operation == '.' && canAddDecimals(result)) 
    || operation !== '.' && isLastDigitIsNum(result)) {
        setResult(result + operation);
    }
} 

function concatValue(result, value) {
    if (isNaN(value)) {
        addOperation(result, value);
    } else {
        setResult(result + value);
    }
}

function add(value) {
    let result = getResult();

    if(result == 0 || result === '') {
       /* if(result != '0' || isNaN(value)) {
           setResult(value);
       } */
        setResult(value);      
    } else {
        concatValue(result, value);
    }
}

function decimals(value) {
    let number = Number.parseFloat(value);
    if (Number.isInteger(number)) {
        return number;
    }
    return number.toFixed(3);
}

function calculations() {
    let result = eval(getResult());
    setResult(decimals(result));
}    

function delet() {
    let result = getResult();
    if(result.length > 0) {
        result = result.substring(0, result.length-1);
    }
    setResult(result);
    
}

function totalDelet() { 
    setResult(0);
}