
var zeroBtn = document.getElementById('calc-zero')
var oneBtn = document.getElementById('calc-one')
var twoBtn = document.getElementById('calc-two')
var threeBtn = document.getElementById('calc-three')
var fourBtn = document.getElementById('calc-four')
var fiveBtn = document.getElementById('calc-five')
var sixBtn = document.getElementById('calc-six')
var sevenBtn = document.getElementById('calc-seven')
var eightBtn = document.getElementById('calc-eight')
var nineBtn = document.getElementById('calc-nine')

var clearBtn = document.getElementById('calc-clear');
var backspaceBtn = document.getElementById('calc-backspace');
var decimalBtn = document.getElementById('calc-coma');
var display = document.getElementById('calc-display');

var numBtns = document.getElementsByClassName('btn-num');
var operatorBtns = document.getElementsByClassName('btn-operator');

var displayVal = '0';
var pendingVal;
var operator;

// AC CLEAR DISPLAY FUNCTION

clearBtn.onclick = () => {
    displayVal = '0';
    operationArray = [];
    display.textContent = displayVal; 
};

// BACKSPACE FUNCTION

backspaceBtn.onclick = () => {
    var displayValLength = displayVal.length
    displayVal = displayVal.slice(0,displayValLength-1);
    
    if(displayVal === ''){
        displayVal = '0';
    }
    display.innerText = displayVal;
}

// DECIMAL BUTTON FUNCTION

decimalBtn.onclick = () => {
    if(!displayVal.includes('.')){
        displayVal += decimalBtn.textContent;
        display.innerText = displayVal;
    }
}

// SET FUNCTIONALITY TO NUMBER BUTTONS 

for(let i = 0; i < numBtns.length; i++){
    numBtns[i].onclick = () => {
        if(displayVal === '0' || displayVal === '+'|| displayVal === '-' || displayVal === 'x' || displayVal === '÷' || displayVal === '='){
            displayVal = '';
        }
        
        displayVal += numBtns[i].textContent;
        display.innerText = displayVal;
    }
    // numBtns[i] = addEventListener('click', updateDisplayValues, false);
    // console.log(numBtns[i]);
}

// SET FUNCTIONALITY TO OPERATOR BUTTONS 

for(var i = 0; i < operatorBtns.length; i++){
    operatorBtns[i].onclick = () => {
        var operatorHtml = operatorBtns[i].textContent
        switch (operatorHtml) {
            
            case '+':
                pendingVal = parseFloat(displayVal);
                operator = '+';
                displayVal = '+';
                display.innerText = displayVal; 
            break;
            case '-':
                pendingVal = parseFloat(displayVal);
                operator = '-';
                displayVal = '-';
                display.innerText = displayVal;
            break;
            case 'x':
                pendingVal = parseFloat(displayVal);
                operator = 'x';
                displayVal = 'x';
                display.innerText = displayVal;
            break;
            case '÷':
                pendingVal = parseFloat(displayVal);
                operator = '÷';
                displayVal = '÷';
                display.innerText = displayVal;
            break;
            case '=':
                if(pendingVal != undefined){
                    displayVal = parseFloat(displayVal);
                    displayVal = doOperation(pendingVal,displayVal)
                    displayVal = displayVal.toString();
                    
                    if(displayVal.length > 8){
                        displayVal = displayVal.slice(0,8)
                    }
                }
              

                display.innerText = displayVal;
            
            break;
            
            
            
        }
    }
}

function doOperation(x,y) {
    var result = x;
    switch (operator) {
        case '+':
        result += y;
        return result;
        break;
        case '-':
        result -= y;
        return result;
        break;
        case 'x':
        result = result * y;
        return result;
        break;
        case '÷':
        result = result / y;
        return result;
        break;
        
    }
}

