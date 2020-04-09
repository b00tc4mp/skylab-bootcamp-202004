var numeros = []


function preguntes(numeros) {
    var pregunta = true;
    while (pregunta) {
        var x = parseFloat(prompt('Introduce un numero que quieras operar: '));
        if (!isNaN(x)) {
            numeros.push(x);
            pregunta = confirm('Quieres introducir más numeros');    
        }  else {
            alert('Introduce un valor valido!')
        }
    }
}

function suma(numeros) {
    acc = numeros[0];
    for(var i = 1; i < numeros.length; i++){
        acc = acc + parseFloat(numeros[i]);
    }
    console.log('La suma es igual a ' + acc);
}

function resta(numeros) {
    acc = numeros[0];
    for(var i = 1; i < numeros.length; i++){
        acc -= parseFloat(numeros[i]);
    }
    console.log('La resta es igual a ' + acc);
}

function multi(numeros) {
    acc = numeros[0];
    for(var i = 1; i < numeros.length; i++){
        acc *= parseFloat(numeros[i]);
    }
    console.log('La multiplicación es igual a ' + acc);
}

function division(numeros) {
    acc = numeros[0];
    for(var i = 1; i < numeros.length; i++){
        acc /= parseFloat(numeros[i]);
    }
    console.log('La división es igual a ' + acc.toFixed(3));
}

function unico(numeros) {
    var arrel = Math.sqrt(numeros[0]); 
    console.log('La raíz cuadrada es igual a ' + arrel);
}

preguntes(numeros);

if (numeros.length>1) {
suma(numeros);
resta(numeros);
multi(numeros);
division(numeros);

} else {
    unico(numeros);
}