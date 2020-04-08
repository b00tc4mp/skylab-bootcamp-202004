// ============ Program Calculator ======================
var num1,
    num2,
    results = [],
    finalResult = [];

//Run calculator
calculator(3, 5)

function calculator(firtNum, secondNum) {
    num1 = firtNum;
    num2 = secondNum;

    if (typeof num1 == 'number' && typeof num2 == 'number') {
        results.push(num1 + num2);
        results.push(num1 - num2);
        results.push(num1 * num2);
        results.push(num1 / num2);
        analyzeDecimal();
        formatFinalResult()
    } else if (typeof num1 === 'number' && typeof num2 == 'undefined') {
        results.push(Math.sqrt(num1));
        analyzeDecimal();
        formatFinalResult()
    } else {
        console.log('No ha introducido un número!');
    }

}

//=========== Analise of results ====================
function analyzeDecimal() {
    for (var i = 0; i < results.length; i++) {
        if (Math.floor(results[i]) !== results[i]) {
            if (results[i].toString().split(".")[1].length > 3) {
                results[i] = parseFloat(results[i].toFixed(3));
            }
        }
    }
}

// =============Format Final Result ==================
function formatFinalResult() {
    var operation = [' + ', ' - ', ' * ', ' / '];
    if (results.length > 1) {
        for (var i = 0; i < results.length; i++) {
            finalResult[i] = (' ' + num1 + operation[i] + num2 + ' = ' + results[i] + ' ');
        }
    } else {
        finalResult = (' \u221a' + num1 + ' = ' + results + ' ');
    }
    console.log('results = [ ' + finalResult + ' ]');
    results = [];
}