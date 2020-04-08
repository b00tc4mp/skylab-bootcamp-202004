var numbers = [];

function sum(numbers) {
    var acc = 0;
        for (var i =0; i<numbers.length; i++) {
            var num = parseInt(numbers[i])
            acc += num
        }
        console.log(acc)
}

function minus(numbers) {
    var acc = numbers[0];
        for (var i =0; i<numbers.length; i++) {
            var num = parseInt(numbers[i])
            acc -= num
        }
        console.log(acc)
}

function getNumber() {
    var currentNumber = prompt('type a number');
    if (isNaN(currentNumber) || currentNumber === "") {
        alert('only fu***** numbers!!')
        getNumber()
    }
    numbers.push(currentNumber);
    var next = confirm('do you want input a new number?');
    if (next) {
        getNumber();
    } else {
        // console.log(numbers)
        sum(numbers)
        minus(numbers)
        }
}
    
function calculatorPro () {
    getNumber();
        
}




