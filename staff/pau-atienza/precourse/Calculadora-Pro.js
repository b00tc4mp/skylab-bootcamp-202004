function calculatorPro() {
    //We declare arguments as a variable
    var args = arguments; 
    //We declare the four main operations as function expressions (could also just be functions)
    //Addition
    const addition = function() {
        var add = args[0];
        for ( var i = 1; i < args.length; i++) {
            add += args[i];
        };
        return add;
    };
    //Subtraction
    const subtraction = function() {
        var sub = args[0];
        for ( var i = 1; i < args.length; i++) {
            sub -= args[i];
        };
        return sub;
    };
    //Multiplication
    const multiplication = function() {
        var mul = args[0];
        for ( var i = 1; i < args.length; i++) {
            mul *= args[i];
        };
        return mul;
    };
    //Division
    const division = function() {
        var div = args[0];
        for ( var i = 1; i < args.length; i++) {
            div /= args[i];
        };
        return div;
    };
    do {
        for ( var i = 0; i < args.length; i++) {
            if (args[i]/args[i] !== 1) {
                console.log (`Variable ${i+1} is not numerical`);
                return;
            };
        };
        //If so and the second argument is undefined, we do the square root only 
        if (typeof args[1] == 'undefined') {
            var rootResult = { SquareRoot : Number.isInteger(Math.sqrt(args[0])) ? Math.sqrt(args[0]) : (Math.sqrt(args[0])).toFixed(3)}
            console.log(rootResult);
        }
        // Otherwise, we proceed to do the normal operations and display the results
        // For each result, we check if it is an Integer, otherwise we show only 3 decimal numbers. 
        // I decided to use an object literal instead of an array so that I could easily 'label' each result in the output to make it more user friendly.
        else { var results = {Addition: Number.isInteger(addition(args)) ? addition(args) : addition(args).toFixed(3), 
            Subtraction: Number.isInteger(subtraction(args)) ? subtraction(args) : (subtraction(args)).toFixed(3), 
            Multiplication: Number.isInteger(multiplication(args)) ? multiplication(args) : (multiplication(args)).toFixed(3), 
            Division: Number.isInteger(division(args)) ? division(args) : (division(args)).toFixed(3)};
        console.log (results);
        };
        //After that, we ask if they want more
        var answer = prompt('Would you like to repeat the process using new numbers? yes/no');
        if (answer.toLowerCase() == 'yes') {
            numberString = prompt('Please introduce the new numbers separated by spaces');
            numberArrayOfStrings = numberString.split(' ');
            args = [];
            for (var i = 0; i < numberArrayOfStrings.length; i++ ) {
                args[i] = parseFloat(numberArrayOfStrings[i]);
            };
        };
    } while (answer.toLowerCase() == 'yes');
    console.log('Thank you for choosing Calculator, we look forward to helping you again in the future');
    return;
};