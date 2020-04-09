// DOM DISPLAY

var display = document.getElementById('display')

// DOM OPERATORS

var ac = document.getElementById('ac')
var negative = document.getElementById('negative')
var percent = document.getElementById('percent')
var divide = document.getElementById('divide')
var multiply = document.getElementById('multiply')
var minus = document.getElementById('minus')
var plus = document.getElementById('plus')
var point = document.getElementById('point')
var equal = document.getElementById('equal')

// DOM NUMBERS

var numbers = document.querySelectorAll('.num')

// EVENTLISTENER FOR NUMS AND ADD TO DISPLAY VAR

var preNumber = ''
var operator = false;
var postNumber = ''
var result = 0;


for (var i = 0; i < numbers.length; i++){

    numbers[i].addEventListener('click', function(e){
        if (operator){
            if (preNumber.length < 8)
            postNumber += e.target.innerText;
            showOnDisplay();
        } else {
            if (preNumber.length < 8)
            preNumber += e.target.innerText;
            showOnDisplay();
        }
    })
}


// EVENTLISTENERS FOR OPERATORS

ac.addEventListener('click', function(){
    preNumber = '';
    postNumber = '';
    operator = false;
    showOnDisplay();
})
negative.addEventListener('click', function(){
    var r = Number(preNumber);
    r *= -1;
    preNumber = r.toString()
    showOnDisplay();
})
percent.addEventListener('click', function(){
    operator = 'percent';

})
divide.addEventListener('click', function(){
    operator = 'divide';
})
multiply.addEventListener('click', function(){
    operator = 'multiply';
})
minus.addEventListener('click', function(){
    operator = 'minus';
})
plus.addEventListener('click', function(){
    operator = 'plus';
})
point.addEventListener('click', function(){
    if (operator){
        if (!postNumber.includes('.')){
            postNumber += '.';
            showOnDisplay();
        }
    } else {
        if (!preNumber.includes('.')){
            preNumber += '.';
            showOnDisplay();
        }
    };
})
equal.addEventListener('click', function(){
    if (operator){
        switch (operator){
            case 'divide': 
                total = Number(preNumber) / Number(postNumber);
                break;
            case 'multiply':
                total = Number(preNumber) * Number(postNumber);
                break;
            case 'plus':
                total = Number(preNumber) + Number(postNumber);
                break;
            case 'minus':
                total = Number(preNumber) - Number(postNumber);
                break;
            case 'percent':
                total = (Number(preNumber) * Number(postNumber)) / 100
                break;
        }
    }
    total = parseFloat(total.toFixed(4))
    preNumber = total.toString();
    postNumber = '';
    showOnDisplay();
    operator = false;
})

// FUNCTIONS

// FUNCTION FOR ADDING NUMS TO DISPLAY

function showOnDisplay(){
    if (postNumber){
        display.textContent = postNumber;
    } else if(preNumber){
        display.textContent = preNumber;
    } else {
        display.textContent = 0;
    } 
}




