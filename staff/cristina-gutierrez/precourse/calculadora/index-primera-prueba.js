function calculator(num1, num2) {
    if (typeof num1 === "number" && num2 === undefined) {
        return Math.sqrt(num1)
    }
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return "error NaN"
    }
    if (typeof num1 === "number" && typeof num2 === "number") {
        results = [];
        results.push(" num1 + num2 = " + Math.round((num1 + num2) * 1000) / 1000);
        results.push(" num1 - num2 = " + Math.round((num1 - num2) * 1000) / 1000);
        results.push(" num1 * num2 = " + Math.round((num1 * num2) * 1000) / 1000);
        results.push(" num1 / num2 = " + Math.round((num1 / num2) * 1000) / 1000);
        return "Results = " + results;
    }
}
calculator();