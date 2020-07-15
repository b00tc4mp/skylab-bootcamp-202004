function squareRoot(a) {
    return Math.sqrt(a);
}

function add(numbers) {
    let result = 0;
    for (num in numbers) {
    result += numbers[num];
    }
    return result;
}

function subtract(numbers) {
    let result = numbers[0];
    for (let num = 1; num < numbers.length; num++) {
        result -= numbers[num];
    }
    return result; 
}

function multiply(numbers) {
    let result = numbers[0];
    for (let num = 1; num < numbers.length; num++) {
        result *= numbers[num];
    }
    return result; 
}

function divide(numbers) {
    let result = numbers[0];
    for (let num = 1; num < numbers.length; num++) {
        result /= numbers[num];
    }
    return result; 
}

function decimals(number) {
    if (Number.isInteger(number)) {
        return number;
    }
    return number.toFixed(3);
}

function getNumbers () {
    var numbers = [];
    
    var moreNumbers;
    do {
        let userImput = prompt('Type a number')
        if (userImput === null) {
            break;
        }

        let userNumber = parseFloat(userImput);

        if (isNaN(userNumber)) {
            alert('this is not a number');
            moreNumbers = true; 
        } else {
            numbers.push(userNumber);
            moreNumbers = confirm('Do you want to enter more numbers?');
        }
      } while (moreNumbers);
      return numbers;
}

function operations() { 
    
    let numbers = getNumbers();

    if (numbers.length === 1) { 
        alert(`sqrt(${numbers[0]}) = ` + decimals(squareRoot(numbers[0])));

    } else if (numbers.length > 1) { 
        alert(`The result sum is = ${decimals(add(numbers))}\n` 
             + `The result subtract is = ${decimals(subtract(numbers))}\n`
             + `The result multiply is = ${decimals(multiply(numbers))}\n` 
             + `The result divide is = ${decimals(divide(numbers))}`); 
    }
}

function calculator() {
    let moreOperations;
    do {
        operations();
        moreOperations = confirm('more operations?');
        
    } while (moreOperations);
    
    alert('bye!');
}
calculator();