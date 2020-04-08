var result=document.getElementById('result')
var display = document.getElementById('display')
var clear = document.getElementById('reset')
var idNumbers = ['number1', 'number2', 'number3', 'number4', 'number5', 'number6', 'number7', 'number8', 'number9', 'number0']
var availableOperation = ['addition','minus','multiply','division']
var currentNumber = ''
var currentOperation = null
var previousNumber = null


for (var i = 0; i < idNumbers.length; i++) {
    var number = document.getElementById(idNumbers[i]);
    number.addEventListener('click', function (event) {
        currentNumber += event.target.innerText;
        display.innerHTML = currentNumber;
    })
}

for (var i=0; i<availableOperation.length; i++) {
    var operation = document.getElementById(availableOperation[i]);
    operation.addEventListener('click', function (event) {
        previousNumber = currentNumber;
        currentNumber='';
        display.innerHTML = event.target.innerText;
        currentOperation = event.target.innerText;
    }) 
}

result.addEventListener('click', function (event){
    var result;
    if(currentOperation === '+') {
        result = Number(previousNumber) + Number(currentNumber)
    } else if(currentOperation === '-') {
        result = Number(previousNumber) - Number(currentNumber)
    } else if(currentOperation === '*') { 
        result = Number(previousNumber) * Number(currentNumber)
    } else if(currentOperation === '/') { 
        result = Number(previousNumber) / Number(currentNumber)
    }
    display.innerHTML = result
    currentNumber = result
})

clear.addEventListener('click', function (event){
    currentNumber = '' 
    currentOperation = null
    previousNumber = null
    display.innerHTML = ''
})

