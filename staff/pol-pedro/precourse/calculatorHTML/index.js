
//DOM HTML
function difCero (op, result) { 
    if (pantalla.textContent === '0' || op === true) {
        pantalla.textContent = '';
    }
    else if (result === true && op === true) {
        pantalla.textContent = '';
    }
    else if (result === true) {
        calc.textContent = '';
        pantalla.textContent = '';
    }
    return false;

}

function reset () {
    pantalla.textContent = '0';
    calc.textContent = '';
}

function deletLast () { 
    if (pantalla.textContent.length <= 1) {
        pantalla.textContent = '0'; 
    }
    else{
        var screen = pantalla.textContent.slice(0, -1);
        pantalla.textContent = screen; 
    } 
}

function dispCalc (simbol, result) {
    if (result == false) {
        calc.textContent = calc.textContent + pantalla.textContent + ' ' + simbol + ' ' ;
        if (calc.textContent.length > 27) {
            calc.style.overflowY= 'auto';
            calc.scrollTop = calc.scrollHeight;
        }
    }
    else {
        calc.textContent = pantalla.textContent + ' ' + simbol + ' ' ;
    }
}

function operation (simbol, lastNum, newNum) {
    var result;
    switch (simbol) {
        case 1:
            result = Math.round((Number(lastNum) / Number(newNum)) * 100) / 100;
            return result.toString();
            break;
        case 2:
            result = Math.round((Number(lastNum) * Number(newNum)) * 100) / 100;
            return result.toString();
            break;
        case 3:
            result = Math.round((Number(lastNum) - Number(newNum)) * 100) / 100;
            return result.toString();
            break;
        case 4:
            result = Math.round((Number(lastNum) + Number(newNum)) * 100) / 100;
            return result.toString();
            break;
        default:
            return newNum;
            break;
    }   

}

function testComa () { 
    for (var i in pantalla.textContent) {
        if(pantalla.textContent[i] === '.'){
            return true;
        }
    }
    return false;
}

function percent () {
    var numPercent = Number(pantalla.textContent)
    if (numPercent >= 1){
        numPercent = Number(pantalla.textContent) * 0.01;
        pantalla.textContent = numPercent.toString();
    }
}

function masNums () {
    if (pantalla.textContent.length <= 10) {
        pantalla.style.fontSize = '50px';
    }
    else if (pantalla.textContent.length > 10) {
        pantalla.style.fontSize = '45.5px';
        if (pantalla.textContent.length > 11) {
            pantalla.style.fontSize = '41.7px';
            if (pantalla.textContent.length > 12) {
                pantalla.style.fontSize = '38.5px';
                if (pantalla.textContent.length > 13) {
                    pantalla.style.fontSize = '35.7px';
                    if (pantalla.textContent.length > 14) {
                        pantalla.style.fontSize = '33.3px';
                    }
                }
            }
        }
    }
}

function exp (lastNum) {
    if (lastNum.length > 15){
        var num = Number(lastNum).toExponential(10);
        return num.toString();
    }
    else {
        return lastNum;
    }
    
}

var siete = document.getElementById('siete');
var ocho = document.getElementById('ocho');
var nueve = document.getElementById('nueve');
var cuatro = document.getElementById('cuatro');
var cinco = document.getElementById('cinco');
var seis = document.getElementById('seis');
var uno = document.getElementById('uno');
var dos = document.getElementById('dos');
var tres = document.getElementById('tres');
var pantalla = document.getElementById('pantalla');
var C = document.getElementById('C');
var borrar = document.getElementById('borrar');
var porciento = document.getElementById('porciento');
var div = document.getElementById('div');
var por = document.getElementById('por');
var menos = document.getElementById('menos');
var mas = document.getElementById('mas');
var cero = document.getElementById('cero');
var coma = document.getElementById('coma');
var igual = document.getElementById('igual');
var calc = document.getElementById('calculo');

// Variables

var op = false;
var lastNum = 0;
var lastOp = 0;
var result  = false;
var aComa = false;
siete.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result, lastNum);
        pantalla.innerHTML = pantalla.textContent + '7'; 
        result  = false;
        masNums ();
    }   
}
ocho.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '8';
        result  = false;
        masNums ();
    } 
}
nueve.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '9';
        result  = false;
        masNums ();
    } 
}
cuatro.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '4';
        result  = false;
        masNums ();
    } 
}
cinco.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '5';
        result  = false;
        masNums ();
    } 
}
seis.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '6';
        result  = false;
        masNums ();
    } 
}
uno.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '1';
        result  = false;
        masNums ();
    } 
}
dos.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '2';
        result  = false;
        masNums ();
    } 
}
tres.onclick = function() {
    if (pantalla.textContent.length < 15 || op === true){
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '3';
        result  = false;
        masNums ();
    } 
}
C.onclick = function() {
    reset();
    lastNum = 0;
    masNums ();
}   
borrar.onclick = function() {
    if(op === false && result === false){
        deletLast();
        masNums ();
    }
}
porciento.onclick = function() {
    if (op === false) {
        percent();
        masNums ();
    }

}
div.onclick = function() {
    if (op === false) {
        dispCalc('÷', result);
        op = true;
        lastNum = operation(lastOp, lastNum, pantalla.textContent);
        lastNum = exp (lastNum);
        pantalla.textContent = lastNum;
        masNums ();
        lastOp = 1; 
        aComa = false;  
    }
}
por.onclick = function() {
    if(op === false) {
        dispCalc('x', result);
        op = true;
        lastNum = operation(lastOp, lastNum, pantalla.textContent);
        lastNum = exp (lastNum);
        pantalla.textContent = lastNum;
        masNums ();
        lastOp = 2;  
        aComa = false;  
    }

}  
menos.onclick = function() {
    if (op === false) {
        dispCalc('-', result);
        op = true;
        lastNum = operation(lastOp, lastNum, pantalla.textContent);
        lastNum = exp (lastNum);
        pantalla.textContent = lastNum;
        masNums ();
        lastOp = 3;
        aComa = false;  
    }
}
mas.onclick = function() {
    debugger;
    if (op === false) {
        dispCalc('+', result);
        op = true;
        lastNum = operation(lastOp, lastNum, pantalla.textContent);
        lastNum = exp (lastNum);
        pantalla.textContent = lastNum;
        masNums ();
        lastOp = 4;
        aComa = false;  
    }
}
cero.onclick = function() {
    if (pantalla.textContent.length < 15 && pantalla.textContent != '0') {
        op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '0'; 
        masNums ();
    }
}
coma.onclick = function() { //hacer una funcion que compruebe si hay coma 
    if(testComa() === false && op === false && pantalla.textContent.length < 14) {
        //op = difCero(op, result);
        pantalla.innerHTML = pantalla.textContent + '.';
        masNums ();
    } 
}
igual.onclick = function() {
    if(result === false) {
        dispCalc('=', result);
        lastNum = operation(lastOp, lastNum, pantalla.textContent);
        lastNum = exp (lastNum);
        pantalla.textContent = lastNum;
        //lastNum = 0;
        lastOp = 0;
        op = false;
        result = true;
        coma = false;  
        masNums ();
    }
}

