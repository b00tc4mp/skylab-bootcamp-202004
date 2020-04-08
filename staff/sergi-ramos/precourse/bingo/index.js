var name;
var aceptarCarton = false;
var numeroRandomBola = 0;
var turnos = 1;
var exit = true;
var aciertoBola = false;
var linia = false;
var bingoWin = false;
var soloUnaLinea = false;
var numerosYaSalidos = [];
var partida = true;
var participants = [];
var punts = 0;
var saleClasificacion = false;
var clasificacion = "CLASIFICACION\n";
var bingoCard = [
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false },
    { number: 0, matched: false }
];


function bingo() {

    //funcion que genera un numero random del 1 al 90

    function generarNumero() {
        var numero;
        numero = Math.random() * (91 - 1) + 1;
        numero = Math.trunc(numero);
        return numero;
    }
    //Comprueba que no haya salido ya el numero random dos veces y lanza el alert del numero salido

    function mostrarBola() {
        var x = 0;
        while (x != -1) {
            numeroRandomBola = generarNumero();
            x = numerosYaSalidos.indexOf(numeroRandomBola);
            if (x == -1) {
                numerosYaSalidos.push(numeroRandomBola);
            }
        }
        alert("Eeeel " + numeroRandomBola + "!!");
        //console.log(turnos);
        return numeroRandomBola;
    }

    //Comprueba que el numero random que sale coincide con alguno del carton y si es el primer turno sale alert de que empieza

    function comprobarNumero() {
        if (turnos == 1) {
            alert("Empieza la partida primeeeeer numero!");
            //console.log(aciertoBola)
        }
        numeroRandomBola = mostrarBola();
        for (var i = 0; i < bingoCard.length; i++) {
            if (numeroRandomBola == bingoCard[i].number) {
                bingoCard[i].number = "X";
                bingoCard[i].matched = true;
                i = 15;
                aciertoBola = true;
            }
        }
    }

    //Controla el mensaje que sale despues de que salga una bola, ya sea no encontrado, encontrado, linea o bingo

    function cartonDespuesBola() {
        if (bingoWin) {
            alert("BINGOOOOOOOOOOOOOOO!!");
            linia = false;
            aciertoBola = false;
            punts = punts + (90 - turnos) * 15
            saleClasificacion = true;
        } else if (linia == true && soloUnaLinea == true) {
            alert("LINEAAAAAAAAA! Muy bien " + name + "!! has cantado linea con el numero " + numeroRandomBola + " Uno menos!\n" + "Línea 1:      " + bingoCard[0].number + "        " + bingoCard[1].number + "        " + bingoCard[2].number + "        " + bingoCard[3].number + "        " + bingoCard[4].number + "\n" +
                "Línea 2:      " + bingoCard[5].number + "        " + bingoCard[6].number + "        " + bingoCard[7].number + "        " + bingoCard[8].number + "        " + bingoCard[9].number + "\n" +
                "Línea 3:      " + bingoCard[10].number + "        " + bingoCard[11].number + "        " + bingoCard[12].number + "        " + bingoCard[13].number + "        " + bingoCard[14].number + "\n");
            linia = false;
            aciertoBola = false;
            punts = (90 - turnos) * 5;
        } else if (aciertoBola == true) {
            alert("Muy bien " + name + "!! Tienes el numero " + numeroRandomBola + " Uno menos!\n" + "Línea 1:      " + bingoCard[0].number + "        " + bingoCard[1].number + "        " + bingoCard[2].number + "        " + bingoCard[3].number + "        " + bingoCard[4].number + "\n" +
                "Línea 2:      " + bingoCard[5].number + "        " + bingoCard[6].number + "        " + bingoCard[7].number + "        " + bingoCard[8].number + "        " + bingoCard[9].number + "\n" +
                "Línea 3:      " + bingoCard[10].number + "        " + bingoCard[11].number + "        " + bingoCard[12].number + "        " + bingoCard[13].number + "        " + bingoCard[14].number + "\n");
            aciertoBola = false;
        } else {
            alert("Oooooooh el numero " + numeroRandomBola + " no esta en tu carton, sigue!\n" + "Línea 1:      " + bingoCard[0].number + "        " + bingoCard[1].number + "        " + bingoCard[2].number + "        " + bingoCard[3].number + "        " + bingoCard[4].number + "\n" +
                "Línea 2:      " + bingoCard[5].number + "        " + bingoCard[6].number + "        " + bingoCard[7].number + "        " + bingoCard[8].number + "        " + bingoCard[9].number + "\n" +
                "Línea 3:      " + bingoCard[10].number + "        " + bingoCard[11].number + "        " + bingoCard[12].number + "        " + bingoCard[13].number + "        " + bingoCard[14].number + "\n");
        }
    }

    //Controla si hay linia

    function comprobarLinia() {
        if (bingoCard[0].matched == true && bingoCard[1].matched == true && bingoCard[2].matched == true && bingoCard[3].matched == true && bingoCard[4].matched == true && soloUnaLinea == false) {
            linia = true;
            soloUnaLinea = true;
        } else if (bingoCard[5].matched == true && bingoCard[6].matched == true && bingoCard[7].matched == true && bingoCard[8].matched == true && bingoCard[9].matched == true && soloUnaLinea == false) {
            linia = true;
            soloUnaLinea = true;
        } else if (bingoCard[10].matched == true && bingoCard[11].matched == true && bingoCard[12].matched == true && bingoCard[13].matched == true && bingoCard[14].matched == true && soloUnaLinea == false) {
            linia = true;
            soloUnaLinea = true;
        }
    }

    //controla si hay bingo


    function comprobarBingo() {
        if (bingoCard[0].matched == true && bingoCard[1].matched == true && bingoCard[2].matched == true && bingoCard[3].matched == true && bingoCard[4].matched == true &&
            bingoCard[5].matched == true && bingoCard[6].matched == true && bingoCard[7].matched == true && bingoCard[8].matched == true && bingoCard[9].matched == true &&
            bingoCard[10].matched == true && bingoCard[11].matched == true && bingoCard[12].matched == true && bingoCard[13].matched == true && bingoCard[14].matched == true) {
            bingoWin = true;
            exit = false;
        }
    }

    //genera un carton random

    function generarCarton() {
        for (var i = 0; i < bingoCard.length; i++) {
            bingoCard[i].number = generarNumero();
        }
    }

    //comprueba si hay numeros repetidos en el carton

    function comprobarCarton() {
        var comprobar;
        for (var i = 0; i < bingoCard.length; i++) {
            for (var x = 14; x > 0; x--) {
                if (bingoCard[i].number == bingoCard[x].number && i != x) {
                    comprobar = true;
                    return comprobar;
                } else {
                    comprobar = false;
                }
            }
        }
        return comprobar;
    }

    //mostrar carton

    function ensenarCarton() {
        var carton = confirm("Hola " + name + "! Quieres este carton?  Pulse cancelar para coger otro carton\n" + "Línea 1:      " + bingoCard[0].number + "        " + bingoCard[1].number + "        " + bingoCard[2].number + "        " + bingoCard[3].number + "        " + bingoCard[4].number + "\n" +
            "Línea 2:      " + bingoCard[5].number + "        " + bingoCard[6].number + "        " + bingoCard[7].number + "        " + bingoCard[8].number + "        " + bingoCard[9].number + "\n" +
            "Línea 3:      " + bingoCard[10].number + "        " + bingoCard[11].number + "        " + bingoCard[12].number + "        " + bingoCard[13].number + "        " + bingoCard[14].number + "\n");
        return carton;
    }

    //mientras no aceptes el carton que quieres se repite la accion

    while (aceptarCarton == false) {
        do {
            //genera un carton pero mientras comprobar carton devuelva true vuelve a generar otro hasta que se ha generado uno sin numeros repetidos
            generarCarton();
            var comprobar2 = comprobarCarton();
        } while (comprobar2 == true);
        aceptarCarton = ensenarCarton();
    }
    aceptarCarton = false;
    while (exit == true && bingoWin == false) {
        if (turnos == 1) {
            comprobarNumero();
            cartonDespuesBola();
        } else {
            comprobarNumero();
            comprobarLinia();
            comprobarBingo();
            cartonDespuesBola();
        }
        if (bingoWin != true) {
            exit = confirm(name + "! Quieres continuar con la partida?")
            turnos++;
        }
    }
    bingoWin = false;
    soloUnaLinea = false;
}

//console.log(name);
while (exit == true) {
    alert("                                                    BINGO\n" + "*IMPORTANTE*\n" + "Sistema de puntos para la clasificación final: \n" + "1-Las linieas se puntuaran multiplicando los 5 numeros acertados por la cifra de turnos que queden por salir\n" +
        "2-El bingo se puntuara multiplicando los 15 numeros acertados por la cifra de turnos que queden por salir\n\n" +
        "Ejemplo: Linea turno 55 y bingo turno 80. (35 * 5) + (15 * 10) = 325 pts");
    name = prompt("Indica cual es tu nombre: ");
    if (name == "null") {
        exit = false;
        alert("Hasta otra!");
    }
    if (exit == true) {
        bingo();
        exit = confirm("Quieres hacer otra partida??");
        bingoCard = [
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false },
            { number: 0, matched: false }
        ];
        if (saleClasificacion == true) {
            participants.push({ name, turnos, punts });
            participants.sort(function (a, b) {
                return (b.punts - a.punts)
            });
        }
        numerosYaSalidos = [];
        turnos = 1;
        punts = 0;
        if (saleClasificacion === true) {
            for (var i = 0; i < participants.length; i++) {
                clasificacion = clasificacion + (i + 1) + "-" + participants[i].name + " con un total de " + participants[i].turnos + " turnos" + " i " + participants[i].punts + " punts\n"
            }
            alert(clasificacion);
            clasificacion = "CLASIFICACION\n";
        }
        saleClasificacion = false;
    }
}