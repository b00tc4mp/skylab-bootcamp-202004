window.onload = function () {
    let screenNumber = "";
    let hasSeparator = false;
    let result = "";
    //Inicia la calculadora con el número cero en pantalla
    let screen = document.getElementById("screen-number");
    screen.innerHTML = "0";

    let zero = document.getElementById("zero");
    let one = document.getElementById("one");
    let two = document.getElementById("two");
    let three = document.getElementById("three");
    let four = document.getElementById("four");
    let five = document.getElementById("five");
    let six = document.getElementById("six");
    let seven = document.getElementById("seven");
    let eight = document.getElementById("eight");
    let nine = document.getElementById("nine");

    let operators = [zero, one, two, three, four, five, six, seven, eight, nine];

    let separator = document.getElementById("separator");
    let ac = document.getElementById("ac");
    let del = document.getElementById("remove");

    let division = document.getElementById("division");
    let multiplication = document.getElementById("multiplication");
    let extraction = document.getElementById("extraction");
    let sum = document.getElementById("sum");
    let equal = document.getElementById("equal");

    let operationsArray = [division, multiplication, extraction, sum];

    let operations = {
        "/": function (x, y) { return (x / 1) / (y / 1); },
        "x": function (x, y) { return (x / 1) * (y / 1); },
        "-": function (x, y) { return (x / 1) - (y / 1); },
        "+": function (x, y) { return (x / 1) + (y / 1); },
    }

    let operation;
    //if last click was on "=" the value is true, else false
    let lastOperationEqual = false;

    //append to the screen every number or separator clicked
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", function () {
            if (lastOperationEqual) {
                result = "";
                lastOperationEqual = false;
            }
            if (screenNumber.length < 15) {
                screenNumber += operators[i].firstChild.innerHTML;
                screen.innerHTML = screenNumber;
            }
        });
    }

    //allow only one separator in the screenNumber
    separator.addEventListener("click", function () {
        if (hasSeparator == false) {
            screenNumber += separator.firstChild.innerHTML;
            hasSeparator = true;
        }
        screen.innerHTML = screenNumber;
    });

    //restart the operations
    ac.addEventListener("click", function () {
        screenNumber = "";
        hasSeparator = false;
        screen.innerHTML = "0";
        result = "";
    });

    //delete the last character introduced
    del.addEventListener("click", function () {
        if (!lastOperationEqual) {
            if (screenNumber[screenNumber.length - 1] == ".") {
                hasSeparator = false;
            }
            screen.innerHTML = screenNumber;
            screenNumber = screenNumber.substring(0, screenNumber.length - 1);
            screen.innerHTML = screenNumber;
        }
    });

    //show the accumulate value of the operations done
    for (let i = 0; i < operationsArray.length; i++) {
        operationsArray[i].addEventListener("click", function () {
            lastOperationEqual = false;

            if (result == "") {
                result = screenNumber;
                screenNumber = "";
            } else {
                if (screenNumber != "") {
                    result = operations[operation](result, screenNumber);
                    screenNumber = "";
                    screen.innerHTML = result;
                }
            }
            hasSeparator = false;
            operation = operationsArray[i].firstChild.innerHTML;
        });
    }

    //show the current value of the result
    equal.addEventListener("click", function () {
        if (result == "") {
            result = screenNumber;
            screenNumber = "";
        } else {
            if (screenNumber != "") {
                result = operations[operation](result, screenNumber);
                screenNumber = "";
            }
        }
        screen.innerHTML = result;
        hasSeparator = false;
        lastOperationEqual = true;
    });

}