/*
El programa arrancará con un panel de 6x7 (7 columnas y 6 filas) vacío, 
informando que es el turno de las piezas rojas. Cuando tire el primer jugador 
(clicando con el ratón en la columna que quiera) se colocará la ficha de su 
color en la columna correspondiente y dará el turno al segundo jugador (piezas azules).
En cualquier momento se podrá reiniciar la partida (clicando al botón "Reiniciar partida") 
o salir (clicando al botón "Salir"). 

El programa controlará que no se tira sobre una columna llena y también comprobará 
tras cada jugada si ha ganado alguno de los jugadores o han quedado empates. 

Cuando algún jugador gane o queden en tablas se informará al usuario y 
se le pedirá si quiere volver a jugar, en ese caso la partida se 
reiniciará (borraremos el tablero y será el turno de las rojas de nuevo). 
En esta versión el usuario tendrá que hacer las tiradas del jugador 1 y del 2 
(como si fueran dos personas jugando desde el mismo ordenador). 

PRO: Se tiene que añadir la opción de jugar contra la máquina. Antes de iniciar la partida se 
le pedirá al jugador si tiene un compañero con quien jugar o quiere jugar contra la máquina.
*/

var panel = [
    [0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 7, 0, 7, 0, 'x'], 
    [0, 0, 7, 7, 7, 'x', 0], 
    [0, 0, 0, 0, 'x', 0, 0], 
    [0, 0, 7, 'x', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0], 
];


let panelElement = document.querySelector('.panel')

let board = `<div class='first-row'>
    <span class='first-row__element' onclick="insertInPosition(0)">1</span>
    <span class='first-row__element' onclick="insertInPosition(1)">2</span>
    <span class='first-row__element' onclick="insertInPosition(2)">3</span>
    <span class='first-row__element' onclick="insertInPosition(3)">4</span>
    <span class='first-row__element' onclick="insertInPosition(4)">5</span>
    <span class='first-row__element' onclick="insertInPosition(5)">6</span>
    <span class='first-row__element' onclick="insertInPosition(6)">7</span>
</div>`; 

function insertInPosition(position, row = 6){
    console.log(`element--${position + 1}`)
    let selectedElement = document.querySelector(`.element--${row}${position + 1}`)

    if (!selectedElement) return

    let rowId = selectedElement.innerText

    if (Number(rowId) !== 0) {
        return insertInPosition(position, row-1)
    }

    selectedElement.classList.add('element--red')

    selectedElement.innerText = 7
   panel[row - 1][position] = 7
    
    checkLines(7)

}

panel.forEach((row, rowPosition) => {
    board += "<div class='row'>"
    row.forEach((element, elementPosition) => {
        board +=`<span class='element element--${rowPosition+1}${elementPosition+1}'>${element}</span>`
    })
    board += "</div>"
})

panelElement.innerHTML = board;


function colorLine(positionsToColor) {


    positionsToColor.forEach(block => {
        let selectedElement = document.querySelector(`.element--${block.join('')}`)
        if (!selectedElement) return
        selectedElement.classList.add('element--line')
    })
}


function checkLines(value){

    panel.forEach((row, rowPosition) =>{

        row.forEach((element, elementPosition) => {

            if (element === value && row[elementPosition+1] === value && row[elementPosition+2] === value && row[elementPosition+3] === value) {
                
                console.log('Línea horizontal')
                console.log(
                    'fila y posicion: ',  
                    [rowPosition+1, elementPosition],
                    [rowPosition+1, elementPosition+1], 
                    [rowPosition+1, elementPosition+2], 
                    [rowPosition+1, elementPosition+3]
                )
            }
            if (element === value && panel[rowPosition+1] && panel[rowPosition+1][elementPosition] === value && panel[rowPosition+2] && panel[rowPosition+2][elementPosition] === value && panel[rowPosition+3] && panel[rowPosition+3][elementPosition] === value) {
                console.log('Línea vertical')

                let positionsToColor = [
                    [rowPosition+1, elementPosition +1],
                    [rowPosition+2, elementPosition +1],
                    [rowPosition+3, elementPosition +1],
                    [rowPosition+4, elementPosition +1],
                ]

                colorLine(positionsToColor)


            }
            /*
            if (element === value && panel[rowPosition+1] && panel[rowPosition+1][elementPosition+1] === value && panel[rowPosition+2][elementPosition+2] === value && panel[rowPosition+3][elementPosition+3] === value) {
                console.log('Diagonal positiva')
                console.log(
                    'fila y posición: ',
                    [rowPosition, elementPosition],
                    [rowPosition+1, elementPosition+1],
                    [rowPosition+2, elementPosition+2],
                    [rowPosition+3, elementPosition+3],
                )
            }

            if (element === value && panel[rowPosition-1][elementPosition-1] === value && panel[rowPosition-2][elementPosition-2] === value && panel[rowPosition-3][elementPosition-3] === value) {
                console.log('Diagonal negativa')
                console.log(
                    'fila y posición: ',
                    [rowPosition, elementPosition],
                    [rowPosition-1, elementPosition-1],
                    [rowPosition-2, elementPosition-2],
                    [rowPosition-3, elementPosition-3],
                )
            }
               */ 
        })

        console.log('-----------------------------')
    })
}

checkLines(7)
checkLines('x')

