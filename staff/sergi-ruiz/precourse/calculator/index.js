function calculator() {



    var arg1Correct = false;
    var arg2Correct = false;
    while (arg1Correct == false) {
        var arg1 = prompt("Please Insert a number");
        if (isNaN(arg1)) {
            console.log("This is not a number, please insert a number");
        } else {
            arg1Correct = true;
            arg1 = parseFloat(arg1);

            while (arg2Correct == false) {
                var arg2 = prompt("Insert another number to calculate or enter to Square root");

                if (arg2 === "") {
                    arg2Correct = true;
                    arg1 = Math.sqrt(arg1);
                    if (arg1 % 1 != 0) {
                        arg1 = arg1.toFixed(3);
                    }
                    console.log(arg1);
                } else {
                if (isNaN(arg2) == false) {
                    arg2Correct = true;
                    arg2 = parseFloat(arg2);
                    sum = arg1 + arg2;
                    if (sum % 1 != 0) {
                        sum = sum.toFixed(3);
                    }
                    substract = arg1 - arg2;
                    if (substract % 1 != 0) {
                        substract = substract.toFixed(3);
                    }
                    multiply = arg1 * arg2;
                    if (multiply % 1 != 0) {
                        multiply = multiply.toFixed(3);
                    }
                    divide = arg1 / arg2;
                    if (divide % 1 != 0) {
                        divide = divide.toFixed(3);
                    }
                    console.log(`${arg1} + ${arg2} = ${sum}, ${arg1} - ${arg2} = ${substract}, ${arg1} * ${arg2} = ${multiply}, ${arg1} / ${arg2} = ${divide} `);
                }
                if (isNaN(arg2)) {
                    console.log("Not a number or blank")
                }
            }
        }
    }
}

}
calculator();