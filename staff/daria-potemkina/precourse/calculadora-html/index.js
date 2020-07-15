let result = document.getElementById("result").innerHTML;
let x = 0,
    y = 0;
let z = '';

function addNumber(num){
    let limitResult;
    num = String(num);
    result = String(result);
    if (result === "0" && num === '.'){
        result += num;
    }else if(result === '0' && num !=='.'){
        result = num;
    }else{
        if(num === '.' && result.indexOf('.') === -1){
            result += num;
        }else if (num !== '.'){
            result += num;
        }
        if (result.length > 15){
            limitResult = result.slice(0,15);
            result = limitResult;
        }
    }

    document.getElementById("result").innerHTML = result;
}

function operEqual (){
    let stringResult;
    y = Number(result);
    if(z === '+'){
        result = x + y;
    }else if(z === "-"){
        result = x - y;
    }else if(z === "x"){
        if (y === 0){
            result = x;
        }else{
            result = x * y;
        }
    }else if(z === "/"){
        if (y === 0){
            result = x;
        }else{
            result = x / y;
            if (isNaN(result)){
                result = 0;
            }
        }
    }
    
    stringResult = result.toString();
    if (stringResult.length > 15){
        result = Number(stringResult.slice(0,15));
    }
    document.getElementById("result").innerHTML = result;
    x = result;
    y = 0;
    z = '';
}

function add(){
    if(z === ''){
        z = "+";
        x = Number(result);
        result = 0;
    }else{
        operEqual();
        z = '+';
        result = 0;
    }
}

function substract (){
    if(z === ''){
        z = "-";
        x = Number(result);
        result = 0;
    }else{
        operEqual();
        z = "-";
        result = 0;
    }
}

function multiply (){
    if (z === ''){
        z = "x";
        x = Number(result);
        result = 0;
    }else{
        operEqual();
        z = "x";
        result = 0;
    }
}

function division (){
    if(z === ''){
        z = "/";
        x = Number(result);
        result = 0;
    }else{
        operEqual();
        z = "/";
        result = 0;
    }
}

function allClear (){
    result = 0;
    z = "";
    document.getElementById("result").innerHTML = result;;
}

function clear (){
    result = String(result);
    if (result.length === 1){
        result = 0;
        document.getElementById("result").innerHTML = result;;
    }else{
        let newResult;
        newResult = result.slice(0, -1);
        result = newResult;
        document.getElementById("result").innerHTML = result;

    }
}

document.getElementById("cero").addEventListener('click', function(){addNumber(0)});
document.getElementById("uno").addEventListener('click', function(){addNumber(1)});
document.getElementById("dos").addEventListener('click', function(){addNumber(2)});
document.getElementById("tres").addEventListener('click', function(){addNumber(3)});
document.getElementById("cuatro").addEventListener('click', function(){addNumber(4)});
document.getElementById("cinco").addEventListener('click', function(){addNumber(5)});
document.getElementById("seis").addEventListener('click', function(){addNumber(6)});
document.getElementById("siete").addEventListener('click', function(){addNumber(7)});
document.getElementById("ocho").addEventListener('click', function(){addNumber(8)});
document.getElementById("nueve").addEventListener('click', function(){addNumber(9)});
document.getElementById("dec").addEventListener('click', function(){addNumber(".")});

document.getElementById('sum').addEventListener('click', add);
document.getElementById('rest').addEventListener('click', substract);
document.getElementById('mult').addEventListener('click', multiply);
document.getElementById('div').addEventListener('click', division);
document.getElementById('ac').addEventListener('click', allClear);
document.getElementById('ret').addEventListener('click', clear)
document.getElementById('equal').addEventListener('click', operEqual);