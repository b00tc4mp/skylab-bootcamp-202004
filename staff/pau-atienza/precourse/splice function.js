//Para miercoles: splice();

function splice(array, number1, number2, input){
    output = [];
    if (number2 < 0) {number2 = 0};
    if (number1 < 0) {number1 = array.length - number1};
    if (number1 < 0) {number1 = 0};
    if (number1 > array.length) {}
    for (i = number1; i <= number1+number2; i++ ) {
        output[output.length] = array[i]
    }
}