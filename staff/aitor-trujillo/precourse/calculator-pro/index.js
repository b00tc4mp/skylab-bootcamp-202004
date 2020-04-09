// JS Calculator PRO - Skylab Coders

// Realizar las operaciones indendientemente de los argumentos
// Preguntar al usuario si quiere realizar otra operación

// Preguntar al usuario por los numeros que querrá operar
// Insert num / type e to finish

var nums = [];

askUser();

calcAgain();

// Funcion principal - calculate(...nums)

function calculate(...nums) {
    var arr = [
        resultSum(...nums), 
        resultRest(...nums),
        resultMult(...nums),
        resultDiv(...nums)
    ];
    console.log('You requested to calculate: ' + nums)
    console.log('results: ' + arr)
}


// Operaciones: Sum, Subs, Mult, Div

// Suma
function resultSum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    var fixSum = parseFloat(sum.toFixed(3));
    return 'Sum = ' + fixSum;
}

// Resta
function resultRest() {
    var rest = 0;
    for (var i = 0; i < arguments.length; i++) {
        rest -= arguments[i];
    }
    var fixRest = parseFloat(rest.toFixed(3));
    return ' Subtraction = ' + fixRest;
}

// Multiplicación
function resultMult() {
    var mult = 1;
    for (var i = 0; i < arguments.length; i++) {
        mult *= arguments[i];
    }
    var fixMult = parseFloat(mult.toFixed(3));
    return ' Multiplication = ' + fixMult;
}

// División
function resultDiv() {
    var div = 1;
    for (var i = 0; i < arguments.length; i++) {
        div /= arguments[i];
    }
    var fixDiv = parseFloat(div.toFixed(3));
    return ' Division = ' + fixDiv;
}


// Funcion para preguntar al usuario los números a calcular
function askUser() {
    nums = [];
    var ans;
    while(ans !== 'e') {
        ans = prompt("Insert Number. (or type 'e' to finish)");
        if (ans === 'e') {
            console.log('Hands to work!')

        } else {
            ans = Number(ans)

            if (isNaN(ans)) {
                alert("That is not possible, I calculate numbers only.");
                calcAgain();
            } else {
                nums.push(ans);
            }
        }
    }
    calculate(...nums);
}

// Funcion para preguntar al usuario 'New Numbers? y/n'
function calcAgain() {
    setTimeout(function(){
    var answer = prompt('New Numbers? y/n');
    if (answer === 'y') {
        askUser();
    } else if (answer === 'n') {
        console.log('See you soon :(')
    } else {
        alert("Please insert: y => Yes, n => No");
        calcAgain();
    }

    }, 3000)
}