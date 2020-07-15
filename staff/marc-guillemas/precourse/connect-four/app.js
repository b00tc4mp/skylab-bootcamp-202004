var playerOne = "blue";
var playerTwo = "red";

var colorOne = "blue";
var colorTwo = "red";
// var empty = "rgba(255, 0, 0, 0)";


var cells = document.getElementsByClassName('cell');
var colOne = document.getElementsByClassName('col-1');
var colTwo = document.getElementsByClassName('col-2');
var colThree = document.getElementsByClassName('col-3');
var colFour = document.getElementsByClassName('col-4');
var colFive = document.getElementsByClassName('col-5');
var colSix = document.getElementsByClassName('col-6');
var colSeven = document.getElementsByClassName('col-7');

var arrOfColumns = [colOne,colTwo,colThree,colFour,colFive,colSix,colSeven];

var btnGame = document.getElementsByClassName('btn');

function paintBackground() {
    x.style.backgroundColor = "blue";
}



// cells[2].style.backgroundColor = "red";


// btnGame.forEach(button => {
//     btnGame[button].addEventListener('click',throwCoin);
// });

for(var i = 0; i<btnGame.length;i++){
    
    btnGame[i].addEventListener('click',function(){
        throwCoin(i);
    })
}
// btnGame[0].addEventListener('click',throwCoin);

var currentPlayer = -1;
var currentColor;

function throwCoin(col) {
    currentPlayer = currentPlayer * -1;
    
    if(currentPlayer === 1){
        currentColor = colorOne;
    }else{
        currentColor = colorTwo;
    }

    switch (col) {
        case 0:
        
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        
        break;
        case 1:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        break;
        case 2:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        
        break;
        case 3:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        
        break;
        case 4:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        
        break;
        case 5:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        break;
        case 6:
        var row = checkBottom(col);
        arrOfColumns[col][row].style.backgroundColor = currentColor;
        
        break;
    }
    // }
}

function checkBottom(col) {
    for(var row = 5; row > -1; row--){
        // debugger
        if(arrOfColumns[col][row].style.backgroundColor === ""){
            return row;
            
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return(one===two && one===three && one===four && one!=='rgba(255, 0, 0, 0)' && one!==undefined)
}

function returnColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
  