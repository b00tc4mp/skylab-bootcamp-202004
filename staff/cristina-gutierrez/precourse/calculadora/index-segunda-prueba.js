function calculator(num1, num2) {
    num1 = prompt("Enter the first number");
    if (isNaN(num1)) {
        alert("Error Nan")
        num1 = prompt("Enter the first number")
    }
    let confirmationNum1 = confirm("Do you want to enter a second number?")
    if (!confirmationNum1) {
        squareRootNum1 = Math.sqrt(num1)
        return squareRootNum1.toFixed(3)
    }
    num2 = prompt("Enter the second number");
    if (isNaN(num2)) {
        alert("Error Nan")
        num2 = prompt("Enter the second number")
    }
        results = [];
        results.push(" num1 + num2 = " + Math.round((parseFloat(num1) + parseFloat(num2)) * 1000) / 1000);
        results.push(" num1 - num2 = " + Math.round((num1 - num2) * 1000) / 1000);
        results.push(" num1 * num2 = " + Math.round((num1 * num2) * 1000) / 1000);
        results.push(" num1 / num2 = " + Math.round((num1 / num2) * 1000) / 1000);
        return "Results = " + results;
}
calculator();