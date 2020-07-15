function calculator(num1, num2) {
    //We first check that num1 is a number
    if (typeof num1 !== 'number') {
        console.log('Variable 1 is nor numerical');
        return;
    }
    //If so and num2 is undefined, we do the square root only
    else if (typeof num1 == 'number' && typeof num2 == 'undefined') {
        var rootResult = { SquareRoot : Number.isInteger(Math.sqrt(num1)) ? Math.sqrt(num1) : (Math.sqrt(num1)).toFixed(3)}
        console.log(rootResult);
        return;
    }
    //Otherwise, we check if num2 is a number
    else if (typeof num2 !== 'number') {
        console.log('Variable 2 is not numerical');
        return;
    }
    //If so, we proceed to do the normal operations
    else {
        // For each result, we check if it is an Integer, otherwise we show only 3 decimal numbers. 
        // I decided to use an object literal instead of an array so that I could easily 'label' each result in the output to make it more user friendly.
        var results = {Addition: Number.isInteger(num1 + num2) ? num1 + num2 : (num1 + num2).toFixed(3), 
            Subtraction: Number.isInteger(num1 - num2) ? num1 - num2 : (num1 - num2).toFixed(3), 
            Multiplication: Number.isInteger(num1 * num2) ? num1 * num2 : (num1 * num2).toFixed(3), 
            Division: Number.isInteger(num1 / num2) ? num1 / num2 : (num1 / num2).toFixed(3)};
        console.log (results);
        return;
    };
};