
var win = false;
var bigships = 1;
var mediumShips = 2;
var littleShips = 3;
var miniShips = 4;
var bigshipsTwo = 1;
var mediumShipsTwo = 2;
var littleShipsTwo = 3;
var miniShipsTwo = 4;
var rowIndex = '';
var colIndex = '';
var checkBig = 0;
var checkMedium = 0;
var checkSmall = 0;
var checkMini = 0;
var sameShip = false;
//Barcos: 1 = portaviones(4 casillas), 2 = acorazados(3 casillas), 3 = destructores(2 casillas), 4 = submarinos (1 casilla)
var ships = [
    ['', '1', '', '', '', '', '', '', '', '3'],
    ['', '1', '', '', '', '', '', '', '', '3'],
    ['', '1', '', '', '', '', '', '', '', ''],
    ['', '1', '', '', '', '', '', '', '', '2'],
    ['', '', '', '', '', '', '', '', '', '2'],
    ['', '', '', '4', '', '2', '3', '', '', '2'],
    ['', '', '', '', '', '2', '3', '', '4', ''],
    ['', '', '', '', '', '2', '', '', '', ''],
    ['', '', '', '4', '', '', '3', '', '', ''],
    ['', '', '', '', '', '', '3', '', '4', '']];
var shipsTwo = [
    ['', '1', '', '', '', '', '', '', '3', '3'],
    ['', '1', '', '', '', '', '', '', '', ''],
    ['', '1', '', '', '', '', '', '', '', ''],
    ['', '1', '', '', '', '2', '2', '2', '', '2'],
    ['', '', '', '', '', '', '', '', '', '2'],
    ['', '', '', '4', '', '', '3', '', '', '2'],
    ['', '', '', '', '', '', '3', '', '4', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '4', '', '', '3', '', '', ''],
    ['', '', '', '', '', '', '3', '', '4', '']];
var bombs = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']];
var bombsTwo = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']];
var player = 1;
// solucionar cuando toca mar se para

function checkShipsHorizontal(bombsArray, shipNumber, ships) {

    if (shipNumber == 1) {

        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[i][x] == '🎇') {
                    checkBig += 1;
                    if (checkBig == 4) {
                        if (player == 1) {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            bombsArray[i][x - 2] = '💥💥'; 
                            bombsArray[i][x - 3] = '💥💥'; 
                            bigships--;
                            alert('PORTAVIONES HUNDIDO!!')
                        } else {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            bombsArray[i][x - 2] = '💥💥'; 
                            bombsArray[i][x - 3] = '💥💥'; 
                            bigshipsTwo--;
                            alert('PORTAVIONES HUNDIDO!!')
                        }
                    }
                } else {
                    checkBig = 0;
                }

            }
        }
    } else if (shipNumber == 2) {

        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[i][x] == '🎇' && ships[i][x] == 2) {
                    checkMedium += 1;
                    if (checkMedium == 3) {
                        if (player == 1) {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            bombsArray[i][x - 2] = '💥💥'; 
                            mediumShips--;
                            alert('ACORAZADO HUNDIDO');
                        } else {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            bombsArray[i][x - 2] = '💥💥'; 
                            mediumShipsTwo--;
                            alert('ACORAZADO HUNDIDO');
                        }
                    }
                } else {
                    checkMedium = 0;
                }

            }
        }
    } else if (shipNumber == 3) {

        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[i][x] == '🎇' && ships[i][x] == 3) {
                    checkSmall += 1;
                    if (checkSmall == 2) {
                        if (player == 1) {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            littleShips--;
                            alert('DESTRUCTOR HUNDIDO!!');
                        } else {
                            bombsArray[i][x] = '💥💥';
                            bombsArray[i][x - 1] = '💥💥';
                            littleShipsTwo--;
                            alert('DESTRUCTOR HUNDIDO!!');
                        }
                    }
                } else {
                    checkSmall = 0;
                }

            }
        }
    } else if (shipNumber == 4) {


        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[i][x] == '🎇' && ships[i][x] == 4) {
                    checkMini += 1;
                    if (checkMini == 1) {
                        if (player == 1) {
                            bombsArray[i][x] = '💥💥';
                            miniShips--;
                        } else {
                            bombsArray[i][x] = '💥💥';
                            miniShipsTwo--;
                        }
                    }
                } else {
                    checkMini = 0;
                }

            }
        }
    }
}

function checkShipsVertical(bombsArray, shipNumber, ships) {

    if (shipNumber == 1) {
        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[x][i] == '🎇') {
                    checkBig += 1;
                    if (checkBig == 4) {
                        if (player == 1) {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            bombsArray[x - 2][i] = '💥💥'; 
                            bombsArray[x - 3][i] = '💥💥'; 
                            bigships--;
                            alert('PORTAVIONES HUNDIDO!!');
                        } else {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            bombsArray[x - 2][i] = '💥💥'; 
                            bombsArray[x - 3][i] = '💥💥'; 
                            bigshipsTwo--;
                            alert('PORTAVIONES HUNDIDO!!');
                        }
                    }
                } else {
                    checkBig = 0;
                }
            }
        }
    } else if (shipNumber == 2) {
        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[x][i] == '🎇' && ships[x][i] == 2) {
                    checkMedium += 1;
                    if (checkMedium == 3) {
                        if (player == 1) {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            bombsArray[x - 2][i] = '💥💥'; 
                            mediumShips--;
                            alert('ACORAZADO HUNDIDO!!');
                        } else {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            bombsArray[x - 2][i] = '💥💥'; 
                            mediumShipsTwo--;
                            alert('ACORAZADO HUNDIDO!!');
                        }
                    }
                } else {
                    checkMedium = 0;
                }

            }
        }
    } else if (shipNumber == 3) {
        for (var i = 0; i <= bombsArray.length - 1; i++) {
            for (var x = 0; x <= bombsArray[i].length - 1; x++) {
                if (bombsArray[x][i] == '🎇' && ships[x][i] == 3) {
                    checkSmall += 1;
                    
                    if (checkSmall == 2) {
                        if (player == 1) {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            littleShips--;
                            alert('DESTRUCTOR HUNDIDO!!');
                        } else {
                            bombsArray[x][i] = '💥💥';
                            bombsArray[x - 1][i] = '💥💥';
                            littleShipsTwo--;
                            alert('DESTRUCTOR HUNDIDO!!');
                        }
                    }
                } else {
                    checkSmall = 0;
                }
            }
        }
    }
}

function game(ships, shipsTwo) {
    while (win == false) {
        switch (player) {
            case 1:

                console.table(bombs);
                console.log('Jugador ' + player + ' Quedan: ');
                console.log(bigships + ' Portaviones ( 4 casillas ).');
                console.log(mediumShips + ' Acorazados ( 3 casillas ).');
                console.log(littleShips + ' Destructores ( 2 casillas ).');
                console.log(miniShips + ' Submarinos ( 1 casilla ).');
                alert('Turno del jugador 1');

                while ((rowIndex == '' || isNaN(parseInt(rowIndex)) || rowIndex > 9 || rowIndex < 0) && (win != true)) {

                    rowIndex = prompt('Introduce el indice de filas(del 0 al 9): ');
                    
                    if (rowIndex == null) {
                        win = true
                    }
                    if ((rowIndex == '' || isNaN(parseInt(rowIndex)) || rowIndex > 9 || rowIndex < 0) && (win != true)) {
                        alert('Dato incorreto! Introduzca un numero del 0 al 9!')
                    }

                }
                while ((colIndex == '' || isNaN(parseInt(colIndex)) || colIndex > 9 || colIndex < 0) && (win != true)) {
                    colIndex = prompt('Intruduce el indice de las columnas(del 0 al 9): ');
                    
                    if (colIndex == null) {
                        win = true
                    }
                    if ((colIndex == '' || isNaN(parseInt(colIndex)) || colIndex > 9 || colIndex < 0) && (win != true)) {
                        alert('Dato incorreto! Introduzca un numero del 0 al 9!')
                    }

                }

                if (win == false) {
                    if (bombs[rowIndex][colIndex] == '0') {
                        if (ships[rowIndex][colIndex] == '1') {
                            bombs[rowIndex][colIndex] = '🎇';
                            alert('PORTAVIONES TOCADO!!');
                            checkShipsHorizontal(bombs, 1, ships);
                            checkShipsVertical(bombs, 1, ships);
                        } else if (ships[rowIndex][colIndex] == '2') {
                            bombs[rowIndex][colIndex] = '🎇';
                            
                            alert('ACORAZADO TOCADO!!');
                            checkShipsHorizontal(bombs, 2, ships);
                            checkShipsVertical(bombs, 2, ships);
                        } else if (ships[rowIndex][colIndex] == '3') {
                            bombs[rowIndex][colIndex] = '🎇';
                            
                            alert('DESTRUCTORES TOCADO!!');
                            checkShipsHorizontal(bombs, 3, ships);
                            checkShipsVertical(bombs, 3, ships);
                        } else if (ships[rowIndex][colIndex] == '4') {

                            bombs[rowIndex][colIndex] = '🎇';
                            
                            alert('SUBMARINO TOCADO Y HUNDIDO!!')
                            checkShipsHorizontal(bombs, 4, ships);
                            checkShipsVertical(bombs, 4, ships);
                        }
                        else {
                            bombs[rowIndex][colIndex] = '🌊';
                        }
                    } else {
                        sameShip = true;
                        alert('Ya has disparado en esta casilla');
                    }

                    if (bombs[rowIndex][colIndex] == '🌊' && sameShip == false) {
                        player = 2;
                        
                    } else {
                        if(sameShip == false){
                        player = 1;
                        }
                    }
                    sameShip = false;
                    rowIndex = '';
                    colIndex = '';
                    if (bigships == 0 && mediumShips == 0 && littleShips == 0 && miniShips == 0) {
                        win = true;
                        console.table(bombs);
                        console.log('Jugador ' + player + ' Quedan: ');
                        console.log(bigships + ' Portaviones ( 4 casillas ).');
                        console.log(mediumShips + ' Acorazados ( 3 casillas ).');
                        console.log(littleShips + ' Destructores ( 2 casillas ).');
                        console.log(miniShips + ' Submarinos ( 1 casilla ).');
                        alert('Muy bien jugador 1 has ganado la partida!');
                        console.log('Muy bien juagdor 1 has ganado la partida!');
                    }
                } else {
                    alert('Adios! Hasta la proxima!');
                    console.log('Adios! Hasta la proxima!');
                }

                break;
            case 2:

                console.table(bombsTwo);
                console.log('Jugador ' + player + ' Quedan: ');
                console.log(bigshipsTwo + ' Portaviones ( 4 casillas ).');
                console.log(mediumShipsTwo + ' Acorazados ( 3 casillas ).');
                console.log(littleShipsTwo + ' Destructores ( 2 casillas ).');
                console.log(miniShipsTwo + ' Submarinos ( 1 casilla ).');
                alert('Turno del jugador 2');

                while ((rowIndex == '' || isNaN(parseInt(rowIndex)) || rowIndex > 9 || rowIndex < 0) && (win != true)) {

                    rowIndex = prompt('Introduce el indice de filas(del 0 al 9): ');
                    
                    if (rowIndex == null) {
                        win = true
                    }
                    if ((rowIndex == '' || isNaN(parseInt(rowIndex)) || rowIndex > 9 || rowIndex < 0) && (win != true)) {
                        alert('Dato incorreto! Introduzca un numero del 0 al 9!')
                    }

                }
                while ((colIndex == '' || isNaN(parseInt(colIndex)) || colIndex > 9 || colIndex < 0) && (win != true)) {
                    
                    colIndex = prompt('Intruduce el indice de las columnas(del 0 al 9): ');
                    if (colIndex == null) {
                        win = true
                    }
                    if ((colIndex == '' || isNaN(parseInt(colIndex)) || colIndex > 9 || colIndex < 0) && (win != true)) {
                        alert('Dato incorreto! Introduzca un numero del 0 al 9!')
                    }

                }

                if (win == false) {
                    if (bombsTwo[rowIndex][colIndex] == '0') {
                        if (shipsTwo[rowIndex][colIndex] == '1') {
                            bombsTwo[rowIndex][colIndex] = '🎇';
                            alert('PORTAVIONES TOCADO!!');
                            checkShipsHorizontal(bombsTwo, 1, shipsTwo);
                            checkShipsVertical(bombsTwo, 1, shipsTwo);
                        } else if (shipsTwo[rowIndex][colIndex] == '2') {
                            bombsTwo[rowIndex][colIndex] = '🎇';
                            
                            alert('ACORAZADO TOCADO!!');
                            checkShipsHorizontal(bombsTwo, 2, shipsTwo);
                            checkShipsVertical(bombsTwo, 2, shipsTwo);
                        } else if (shipsTwo[rowIndex][colIndex] == '3') {
                            bombsTwo[rowIndex][colIndex] = '🎇';
                            
                            alert('DESTRUCTORES TOCADO!!');
                            checkShipsHorizontal(bombsTwo, 3, shipsTwo);
                            checkShipsVertical(bombsTwo, 3, shipsTwo);
                        } else if (shipsTwo[rowIndex][colIndex] == '4') {

                            bombsTwo[rowIndex][colIndex] = '🎇';
                           
                            alert('SUBMARINO TOCADO Y HUNDIDO!!')
                            checkShipsHorizontal(bombsTwo, 4, shipsTwo);
                            checkShipsVertical(bombsTwo, 4, shipsTwo);
                        }
                        else {
                            bombsTwo[rowIndex][colIndex] = '🌊';
                        }
                    } else {
                        sameShip = true;
                        alert('Ya has disparado en esta casilla');
                    }
                    if (bombsTwo[rowIndex][colIndex] == '🌊' && sameShip == false) {
                        player = 1;
                    } else {
                        if(sameShip == false){
                        player = 2;
                        }
                    }
                    sameShip = false;
                    rowIndex = '';
                    colIndex = '';
                    if (bigshipsTwo == 0 && mediumShipsTwo == 0 && littleShipsTwo == 0 && miniShipsTwo == 0) {
                        win = true;
                        console.table(bombsTwo);
                        console.log('Jugador ' + player + ' Quedan: ');
                        console.log(bigshipsTwo + ' Portaviones ( 4 casillas ).');
                        console.log(mediumShipsTwo + ' Acorazados ( 3 casillas ).');
                        console.log(littleShipsTwo + ' Destructores ( 2 casillas ).');
                        console.log(miniShipsTwo + ' Submarinos ( 1 casilla ).');
                        alert('Muy bien jugador 2 has ganado la partida!');
                        console.log('Muy bien juagdor 2 has ganado la partida!');
                    }
                } else {
                    alert('Adios! Hasta la proxima!');
                    console.log('Adios! Hasta la proxima!');
                }

                break;


        }


    }

}

game(ships, shipsTwo);