function calculatorPro(arr) {

    let finalResult = [];

    function calculation(arr) {
        let result = [];
        function sum(arr) {
            let result = arr[0];
            for (let n = 1; n < arr.length; n++) {
                result += arr[n];
                result = Number(result.toFixed(3));
            }
            return result;
        }

        function subs(arr) {
            let result = arr[0];
            for (let n = 1; n < arr.length; n++) {
                result -= arr[n];
                result = Number(result.toFixed(3));
            }
            return result;
        }

        function mult(arr) {
            let result = arr[0];
            for (let n = 1; n < arr.length; n++) {
                result *= arr[n];
                result = Number(result.toFixed(3));
            }
            return result;
        }

        function div(arr) {
            let result = arr[0];
            for (let n = 1; n < arr.length; n++) {
                result /= arr[n];
                result = Number(result.toFixed(3));
            }
            return result;
        }

        result.push(sum(arr), subs(arr), mult(arr), div(arr));
        return result;
    }

    let execute = true;
    let question = "";

    while (execute) {
        question = prompt('Insert numbers? y/n');
        if (question === 'y') {
            let newNumbers = prompt('Insert new numbers separated by comma.');
    let num = newNumbers.split(',').map(Number);
    let index = num.includes(NaN);

if (index === true) {
    let adviseNonNumValue = confirm('There are non-numerical values. The calculation will be carried out eliminating these values.');
    if (adviseNonNumValue === true) {
        for (let i = 0; i < num.length; i++) {
            if (isNaN(num[i])) {
                num.splice(i, 1);
            }
        }
        if (num.length === 1) {
            finalResult = Number((Math.sqrt(num[0])).toFixed(3));
        } else {
            finalResult = calculation(num);
        }
        console.log(finalResult);
    } else {
        alert('The values ​​have not been incorporated in the calculation.');
    }
} else {
    if (num.length === 1) {
        finalResult = Number((Math.sqrt(num[0])).toFixed(3));
    } else {
        finalResult = calculation(num);
    }
    console.log(finalResult);
}
        } else if (question === 'n') {
            alert('Bye!');
            execute = false;
        } else {
            alert('You have to insert y/n. Try again!');
        }
    }
}

calculatorPro();

