var num1 = 0;
var num2 = 0;
var resultado;
var state = 0;
var recursive = false;
var cut = 0;

function setResult(value) {
    document.getElementById('result').innerHTML = value;
}

function getResult() {
    return (document.getElementById('result').innerHTML);
}


function add(key) {
    recursive = false;
    var result = getResult();

    if (key == '+' || key == '-' || key == '*' || key == '/') {
        if (result != '0') {

            num1 = result;
            setResult(0);

            if (key == '+') {
                state = 0;
            }

            if (key == '-') {
                state = 1;
            }

            if (key == '*') {
                state = 2;
            }

            if (key == '/') {
                state = 3;
            }
        }
    } else if (result.length <= 9) {
        if (result != '0' || isNaN(key)) setResult(result + key);
        else setResult(key);
    }

}


function calc() {
    if (recursive) {
        num1 = getResult();
        num1 = parseFloat(num1);
    } else {
        num1 = parseFloat(num1);
        num2 = getResult();
        num2 = parseFloat(num2);
    }
    switch (state) {
        case 0:
            var result = num1 + num2;
            break;
        case 1:
            var result = num1 - num2;
            break;
        case 2:
            var result = num1 * num2;
            break;
        case 3:
            var result = num1 / num2;
            break;
    }


    result = result % 10000000000;
    if (result % 1 != 0) {
        result = result.toFixed(1);
    }
    setResult(result);
    recursive = true;

}

function del() {
    setResult(0);
}

function back() {
    var result = getResult();
    if (result != '0' || isNaN(key)) {
        setResult(result = result.substring(0, result.length - 1));
    }
}