function bingo() {

    
    var nombre = prompt('Introduce tu nombre');


    //Crea numero aleatorio.
    function createNum(min, max) {
        return Math.floor((Math.random() * (30 - 1) + 1));
    }


    //Llena array carton con 15 elementos que no se repiten.
    function createCard() {
        cartro.push(createNum());
        for (var x = 0; x < 15; x++) {
            var randomnum = createNum();
            var yepa = cartro.indexOf(randomnum);
            if (yepa == -1) {
                cartro.push(randomnum);
            } else {
                x--;
            }
        }
    }


    //Llena array bombo con 1 numero aleatorio que no se repetirá.
    function createBombo() {
        for (var x = 0; x < 1; x++) {
            var randomnum = createNum();
            var yepa = bombo.indexOf(randomnum);
            if (yepa == -1) {
                bombo.push(randomnum);
            } else {
                x--;
            }
        }
    }


    //Alert del nuevo numero de bombo.
    function anaBombo() {
        alert('Nuevo numero de bombo es ' + bombo[bombo.length - 1])
    }


    //Comprueba si num y elementos carton coinciden, si es asi, elemento carton pasa a ser X y dice si ha habido suerte o no.
    function checkNum() {
        var coincidencia = false;
        for (var i = 0; i < bombo.length; i++) {
            for (var j = 0; j < cartro.length; j++) {
                if (cartro[j] == bombo[i]) {
                    cartro[j] = 'X';
                    alert('SUERTE!\nHa habido una coincidencia!!!');
                    console.log('Ha habido una coincidencia!!!');
                    coincidencia = true;
                }
            }
        }
        if (!coincidencia) {
            alert('Que pena!\nNo ha habido una coincidencia.');
            console.log('No ha habido una coincidencia.');
        }
    }


    //perque no es repeteixi lo de LINEA CREAR VARIABLE true i quan passi aixo fer que passi a ser variable=false i surti del while

    function lineas() {
        if (linea && cartro[0] == 'X' && cartro[1] == 'X' && cartro[2] == 'X' && cartro[3] == 'X' && cartro[4] == 'X' || linea && cartro[5] == 'X' && cartro[6] == 'X' && cartro[7] == 'X' && cartro[8] == 'X' && cartro[9] == 'X' || linea && cartro[10] == 'X' && cartro[11] == 'X' && cartro[12] == 'X' && cartro[13] == 'X' && cartro[14] == 'X') {
            alert('LINEAAA!!');
            linea = false;
        } return linea;
    }


    function bingo() {
        if (cartro[0] == 'X' && cartro[1] == 'X' && cartro[2] == 'X' && cartro[3] == 'X' && cartro[4] == 'X' && cartro[5] == 'X' && cartro[6] == 'X' && cartro[7] == 'X' && cartro[8] == 'X' && cartro[9] == 'X' && cartro[10] == 'X' && cartro[11] == 'X' && cartro[12] == 'X' && cartro[13] == 'X' && cartro[14] == 'X') {
            alert('BINGOO!!!');
            nextturn = false;
        } else if (nextturn) {
            nextturn = confirm('Quieres pasar al siguiente turno?');
            if (nextturn){
                count.push(1);
            }
        } return nextturn;
    }




    //Convierte los elementos de numero a X.
    function expression() {
        createBombo();
        anaBombo();
        checkNum();

        console.log('Línia 1: ' + cartro[0] + ', ' + cartro[1] + ', ' + cartro[2] + ', ' + cartro[3] + ', ' + cartro[4]);
        console.log('Línia 2: ' + cartro[5] + ', ' + cartro[6] + ', ' + cartro[7] + ', ' + cartro[8] + ', ' + cartro[9]);
        console.log('Línia 3: ' + cartro[10] + ', ' + cartro[11] + ', ' + cartro[12] + ', ' + cartro[13] + ', ' + cartro[14]);
        console.log('')
    }


    //Todo el sistema.
    function programa() {
        createCard();

        console.log('')
        console.log('Línia 1: ' + cartro[0] + ', ' + cartro[1] + ', ' + cartro[2] + ', ' + cartro[3] + ', ' + cartro[4]);
        console.log('Línia 2: ' + cartro[5] + ', ' + cartro[6] + ', ' + cartro[7] + ', ' + cartro[8] + ', ' + cartro[9]);
        console.log('Línia 3: ' + cartro[10] + ', ' + cartro[11] + ', ' + cartro[12] + ', ' + cartro[13] + ', ' + cartro[14]);
        console.log('')

        nextturn = confirm('Este es tu cartrón!! ¿Quieres empezar a jugar?');
        if (!nextturn){
            count=[];
        }
        while (nextturn) {
            expression();
            lineas();
            bingo();
        }
    }

    //GENERAL.
    do {
        var count = [1];
        var bombo = [];
        var cartro = [];
        var linea = true;
        var nextturn = true;
        programa();
        console.log('El juego acaba aquí. Has realizado un total de ' + count.length + ' intentos.');
        var again = confirm('Quieres volver a jugar??');
    } while (again);
    alert('ADIOOOS!');
}

bingo();