var numeros = [];
var resultats = [];

//Funcions de sumar, restar, multiplicar i dividir

function sumar(numeros) {

    var suma = 0;
    for (var i = 0; i < numeros.length - 1; i++) {
        suma = suma + parseFloat(numeros[i]);

    }
    if (suma % 1 == 0) {
        return suma;
    }
    else {
        return suma.toFixed(3);
    }
}
function restar(numeros) {

    var resta = 0;
    for (var i = 0; i < numeros.length - 1; i++) {
        if (i == 0) {
            resta = parseFloat(numeros[i]) - resta;
        } else {
            resta = resta - parseFloat(numeros[i]);
        }
    }
    if (resta % 1 == 0) {
        return resta;
    }
    else {
        return resta.toFixed(3);
    }

}
function multiplicar(numeros) {

    var multiplicacio = 1;
    for (var i = 0; i < numeros.length - 1; i++) {
        multiplicacio = multiplicacio * parseFloat(numeros[i]);

    }

    if (multiplicacio % 1 == 0) {
        return multiplicacio;
    }
    else {
        return multiplicacio.toFixed(3);
    }

}
function dividir(numeros) {

    var divisio = 1;
    for (var i = 0; i < numeros.length - 1; i++) {
        if (i == 0) {
            divisio = parseFloat(numeros[i]) / divisio;
        } else {
            divisio = divisio / parseFloat(numeros[i]);
        }

    }
    if (divisio % 1 == 0) {
        return divisio;
    }
    else {
        return divisio.toFixed(3);
    }

}

//Mostra de resultats de les operacions

function mostrarCalculs() {

    for (var i = 0; i < resultats.length; i++) {

        console.log(resultats[i]);
    }
    console.log("");
    console.log("");
}

//Calcul de totes les operacions

function calculadoraPro(numeros) {

    resultats.push("Suma: " + sumar(numeros));
    resultats.push("Resta: " + restar(numeros));
    resultats.push("Multiplicació: " + multiplicar(numeros));
    resultats.push("Divisió: " + dividir(numeros));


    mostrarCalculs();
    resultats.push("=========Següent calcul==========");

}

//Execució del programa calculadora Pro

do {
    var numeros = [];
    do {

        numeros.push(prompt(`Introdueix un número (0-9) i clica acceptar tants cops com vulguis per 
fer el càlcul de suma, resta, multiplicació i divisió dels números introduits entre ells. 
Prem (c) per saber-ne el resultat.
Per calcular l'arrel quadrada d'un numero introdueix el numero i acceptar, seguidament clicar la (c) i acceptar.`));

        if (numeros[numeros.length - 1] != "c" && isNaN(numeros[numeros.length - 1]) == true || numeros[numeros.length - 1] == "" || numeros[0] == "c") {
            if (numeros[0] == "c") {
                alert("No pots calcular res, encara no has introduit cap numero!")
            } else {
                alert("Format no correcte!");
                numeros.pop();
            }
        }

    } while (numeros[numeros.length - 1] != "c" && numeros[numeros.length - 1] != null);


    if (numeros.length == 2 && numeros[numeros.length - 1] != null) {

        if (Math.sqrt(numeros[0]) % 1 == 0) {

            resultats.push("L'arrel quadrada de " + numeros[0] + " = " + Math.sqrt(parseFloat(numeros[0])));
            mostrarCalculs();
            resultats.push("=========Següent calcul==========");


        } else {

            resultats.push("L'arrel quadrada de " + numeros[0] + " = " + Math.sqrt(parseFloat(numeros[0])).toFixed(3));
            mostrarCalculs();
            resultats.push("=========Següent calcul==========");

        }

    }
    else {

        if (numeros[numeros.length - 1] != null && numeros[0] != "c") {
            calculadoraPro(numeros);
        }
    }

    do {

        unAltre = prompt("Vols fer un altre operació? (s)i o (n)o?")

        if (unAltre != "n" && unAltre != "s" && unAltre != null) {
            alert("Format de resposta no correcte");
        } else if (unAltre == null) {
            alert("Adeu!");
        }
    }
    while (unAltre != "n" && unAltre != "s" && unAltre != null);

    if (unAltre == "n") {

        alert("Adeu!");

    }

} while (unAltre == "s");


