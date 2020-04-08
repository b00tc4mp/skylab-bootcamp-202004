function todo() {
    var display = document.getElementById('current-operator');
    var equal = document.getElementById('dobleEqual');
    var del = document.getElementById('delete');
    var suma = document.getElementById('suma');
    var resta = document.getElementById('resta');
    var multi = document.getElementById('multi');
    var div = document.getElementById('division');
    var allClear = document.getElementById('dobleAc');
    var num1 = document.getElementById('uno');
    var num2 = document.getElementById('dos');
    var num3 = document.getElementById('tres');
    var num4 = document.getElementById('cuatro');
    var num5 = document.getElementById('cinco');
    var num6 = document.getElementById('seis');
    var num7 = document.getElementById('siete');
    var num8 = document.getElementById('ocho');
    var num9 = document.getElementById('nueve');
    var num0 = document.getElementById('cero');
    var dot = document.getElementById('dot');

    var operando = [];
    var nums = [];
    var signos = [];
    var help = 0;

    num0.onclick = function () {
        display.innerHTML = display.innerHTML + 0;
        operando.push(0);
    }
    num1.onclick = function () {
        display.innerHTML = display.innerHTML + 1;
        operando.push(1);
    }
    num2.onclick = function () {
        display.innerHTML = display.innerHTML + 2;
        operando.push(2);

    }
    num3.onclick = function () {
        display.innerHTML = display.innerHTML + 3;
        operando.push(3);
    }
    num4.onclick = function () {
        display.innerHTML = display.innerHTML + 4;
        operando.push(4);
    }
    num5.onclick = function () {
        display.innerHTML = display.innerHTML + 5;
        operando.push(5);
    }
    num6.onclick = function () {
        display.innerHTML = display.innerHTML + 6;
        operando.push(6);
    }
    num7.onclick = function () {
        display.innerHTML = display.innerHTML + 7;
        operando.push(7);
    }
    num8.onclick = function () {
        display.innerHTML = display.innerHTML + 8;
        operando.push(8);
    }
    num9.onclick = function () {
        display.innerHTML = display.innerHTML + 9;
        operando.push(9);
    }
    allClear.onclick = function () {
        display.innerHTML = '';
        nums = [];
        operando = [];
        signos = [];
        return [nums, operando, signos];
    }
    suma.onclick = function () {
        help++;
        if (operando.length != 0) {
            display.innerHTML = display.innerHTML + '+';
            var toNumber = Number(operando.join(''));
            nums.push(toNumber);
            operando = [];
            signos.push('+');
        }
    }
    resta.onclick = function () {
        help++;
        if (operando.length != 0) {
            display.innerHTML = display.innerHTML + '-';
            var toNumber = Number(operando.join(''));
            nums.push(toNumber);
            operando = [];
            signos.push('-');
        }
    }
    multi.onclick = function () {
        help++;
        if (operando.length != 0) {
            display.innerHTML = display.innerHTML + 'x';
            var toNumber = Number(operando.join(''));
            nums.push(toNumber);
            operando = [];
            signos.push('x');
        }
    }
    div.onclick = function () {
        help++;
        if (operando.length != 0) {
            display.innerHTML = display.innerHTML + '/';
            var toNumber = Number(operando.join(''));
            nums.push(toNumber);
            operando = [];
            signos.push('/');
        }
    }
    del.onclick = function () {
        if (help == 0) {
            display.innerHTML = '';
            operando.pop();
            var showNumber = Number(operando.join(''));
            if (nums.indexOf(0) != -1) {
                display.innerHTML = '';
            } else {
                display.innerHTML = display.innerHTML + showNumber;
            }
        }

    }

    dot.onclick = function () {
        for (var z = 0; z < operando.length; z++) {
            if (operando[z] != '.') {
                operando.push('.')
                display.innerHTML = display.innerHTML + '.';
            }
        }
    }

    equal.onclick = function () {
        help++;
        var toNumber2 = Number(operando.join(''));
        nums.push(toNumber2);
        if (signos.indexOf('+') != -1) {
            var add = (acc, b) => acc + b;
            var resultadosuma = nums.reduce(add);
            display.innerHTML = '' + parseFloat(resultadosuma.toFixed(2));
            operando = [];
            operando.push(resultadosuma);
        } else if (signos.indexOf('-') != -1) {
            var resta = (acc, b) => acc - b;
            var resultadoresta = nums.reduce(resta);
            display.innerHTML = '' + parseFloat(resultadoresta.toFixed(2));
            operando = [];
            operando.push(resultadoresta);
        } else if (signos.indexOf('x') != -1) {
            var multiply = (acc, b) => acc * b;
            var resultadomulti = nums.reduce(multiply);
            display.innerHTML = '' + parseFloat(resultadomulti.toFixed(2));
            operando = [];
            operando.push(resultadomulti);
        } else if (signos.indexOf('/') != -1) {
            var division = (acc, b) => acc / b;
            var resultadodiv = nums.reduce(division);
            display.innerHTML = '' + parseFloat(resultadodiv.toFixed(2));
            operando = [];
            operando.push(resultadodiv);
        }
        signos = [];
        nums = [];
        console.log(operando);
    }

}

todo();
