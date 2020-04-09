function calculator(num1, num2) {
    do {
        num1 = prompt("Enter the first number");
    } while (isNaN(num1) || num1 === "");
    num1 = parseFloat(num1);

    let confirmationNum1 = confirm("Do you want to enter a second number?")
   
    if (confirmationNum1 === false) {
        squareRootNum1 = Math.sqrt(num1)
        return squareRootNum1.toFixed(3)
    }
    
    do {
        num2 = prompt("Enter the second number");
    } while (isNaN(num2) || num2 === "");
    num2 = parseFloat(num2);
    
    results = [];
    results.push(" num1 + num2 = " + Math.round((num1 + num2) * 1000) / 1000);
    results.push(" num1 - num2 = " + Math.round((num1 - num2) * 1000) / 1000);
    results.push(" num1 * num2 = " + Math.round((num1 * num2) * 1000) / 1000);
    results.push(" num1 / num2 = " + Math.round((num1 / num2) * 1000) / 1000);
    
    return "Results = " + results;
}

calculator();