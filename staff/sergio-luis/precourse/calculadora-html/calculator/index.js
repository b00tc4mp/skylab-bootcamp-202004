//Variables
var ids = ['ac', 'c', 'positive-negative', 'percentage', 'division', 'multiplication', 'subtraction', 'addition', 'equal', 'point', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var arrGetElementId = [];
var fristComponentOperation = '';
var secondComponentOperation = '';
var operationType = '';
var point = '';
var finalResult = '';
var historic = document.getElementById('historic');
var outputCampus = document.getElementById('outputCampus');

//this part store al ids in a array with "document.getElementById"
ids.forEach(function arrElements(ids) {
    arrGetElementId.push(document.getElementById(ids));
});

//Add a funcionality for all keys
arrGetElementId.forEach(keyAssign);

//Function for add funcionality to the key
function keyAssign(arrGetElementId) {
    arrGetElementId.onmouseup = function() {
        upKey(event);
    }
    arrGetElementId.onmousedown = function() {
        pressKey(event);
    }
}

//Function when we up key
function upKey(event) {
    event.target.style.backgroundColor = '';
    event.target.style.color = '';
    resizeOutputCampus()
}

//function when we press the key
function pressKey(event) {
    audio();
    event.target.style.backgroundColor = 'rgb(190, 190, 190)';
    switch (event.target.textContent) {
        case 'AC':
            resetAC();
            break;
        case 'C':
            document.getElementById('ac').style.display = 'block';
            event.target.style.display = 'none';
            resetC();
            outputCampus.textContent = '0'
            break;
        case '+/-':
            positiveNegative()
            break;
        case '%':
            percentage()
            break;
        case '÷':
            storeValuesWith('÷')
            break;
        case '×':
            storeValuesWith('×')
            break;
        case '-':
            storeValuesWith('-')
            break;
        case '+':
            storeValuesWith('+')
            break;
        case '=':
            storeSecondComponentOperation(event);
            operationResult();
            break;
        case ',':
            addPoint();
            break;
        default:
            verificateOutputCampus(event);
            break;
    }
}

//Function of the button C
function resetC() {
    outputCampus.textContent = '';
    point = '';
    if (historic.textContent !== '' || finalResult === 'ERROR!') {
        historic.textContent = '';
        outputCampus.textContent = '';
    }
}


//Function of the button AC
function resetAC() {
    outputCampus.textContent = '0';;
    historic.textContent = '';
    fristComponentOperation = '';
    secondComponentOperation = '';
    point = ''
    operationType = '';
}

// Function add positive value or negative value
function positiveNegative() {

    if (outputCampus.textContent !== '') {
        var change = changeCommaToPoint(outputCampus.textContent);
        var resultNegative = parseFloat(change) * (-1);
        outputCampus.textContent = changePointToComma(resultNegative)
    }
    if (isNaN(outputCampus.textContent)) {
        resetAC()
    }
}

//Function percentage
function percentage() {
    var resultPercentage;
    var change;
    if (outputCampus.textContent !== '') {
        change = changeCommaToPoint(outputCampus.textContent)
        resultPercentage = parseFloat(change) / 100;
        if (isNaN(resultPercentage)) {
            outputCampus.textContent = 'ERROR!'
        } else {
            outputCampus.textContent = changePointToComma(resultPercentage);
        }
    }
}
//Function who store the firstComponent operation and de type of operation
function storeValuesWith(caracter) {
    operationType = caracter
    storeFristComponentOperation(event);
    resetC();
}

//Function to store the the numbers and operation
function storeFristComponentOperation(event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'orange';
    fristComponentOperation = outputCampus.textContent;

}

//Function to store the the numbers and operation
function storeSecondComponentOperation(event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'orange';
    secondComponentOperation = outputCampus.textContent;
}

//Function operationResults return results
function operationResult() {
    var result = 0;
    var roundResult;
    var firstValue = changeCommaToPoint(fristComponentOperation);
    var secondValue = changeCommaToPoint(secondComponentOperation);
    switch (operationType) {
        case '÷':
            result = parseFloat(firstValue) / parseFloat(secondValue);
            break;
        case '×':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            break;
        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            break;
        case '+':
            result = parseFloat(firstValue) + parseFloat(secondValue);
            break;
    }
    roundResult = analyzeDecimal(result);
    finalResult = changePointToComma(roundResult);
    outputCampus.textContent = changePointToComma(roundResult);
    resizeOutputCampus();
    addHistoricCampus();
}

//This function change Comma ',' to point '.'
function changeCommaToPoint(element) {
    var arrNumber = element.split("");
    for (var i = 0; i < arrNumber.length; i++) {
        if (arrNumber[i] == ',') {
            arrNumber[i] = '.';
        }
    }
    return arrNumber.join("");
}

// This function change point '.'to comma ','
function changePointToComma(element) {
    var result;
    var arrNumber = element.toString().split("");
    for (var i = 0; i < arrNumber.length; i++) {
        if (arrNumber[i] == '.') {
            arrNumber[i] = ',';
        }
    }
    if (arrNumber.length > 13) {
        result = 'ERROR!'
        historic.textContent = '';
    } else {
        result = arrNumber.join("");
    }
    return result;
}

//This function return a result with 3 decimal if the result have decimal numbers 
function analyzeDecimal(result) {
    var output;
    if (Math.floor(result) !== result && result.toString().split(".")[1].length > 3) {
        output = parseFloat(result.toFixed(3));
    } else {
        output = result;
    }
    return output;
}

//Function resize outputCampus if we put more character the character are smaller
function resizeOutputCampus() {
    var campusLength = outputCampus.textContent.length;
    if (campusLength < 6) {
        outputCampus.style.fontSize = '90px';
    } else if (campusLength < 9) {
        outputCampus.style.fontSize = '70px';
    } else {
        outputCampus.style.fontSize = '55px';
    }
}

//Add  to Historic
function addHistoricCampus() {
    if (fristComponentOperation !== '' && secondComponentOperation !== '' && operationType !== '' && finalResult !== 'ERROR!') {
        historic.textContent = fristComponentOperation + operationType + secondComponentOperation + '=' + finalResult;
    }
}

//Function addPoint
function addPoint() {
    if (point === '' && finalResult === '' && outputCampus.textContent !== '') {
        point = '.'
        outputCampus.textContent += ',';
    }
}

//Condictions for outputCampus this change the key AC to C! and dont permit write more than 12 caracteres and put more than one zero in the beginer of operation
function verificateOutputCampus(event) {
    if (finalResult !== '') {
        resetC()
        finalResult = '';
        historic.textContent = '';
    }
    if (outputCampus.textContent === 'ERROR!') {
        resetAC();
    }
    if (outputCampus.textContent === '0') {
        resetC();
    }
    if (outputCampus.textContent.length >= 0) {
        document.getElementById('ac').style.display = 'none';
        document.getElementById('c').style.display = 'block';
    }
    if (outputCampus.textContent.length < 11) {
        if (!(outputCampus.textContent.length == 1 && outputCampus.textContent === '0')) {
            outputCampus.textContent += event.target.textContent;
        }
    }
}
//Function for execute audio
function audio() {
    var click = new Audio('click.mp3');
    click.play();
}