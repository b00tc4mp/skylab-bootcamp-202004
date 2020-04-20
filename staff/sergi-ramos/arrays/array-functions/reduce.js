function reduce(array, callback, valorInicial) {
    debugger
    var sum;
    var notInitialValue = 0;
    if (valorInicial === undefined) {
        notInitialValue = 1
        sum = array[0]
    }
    var checkValorInicial = true
    for (var i = notInitialValue; i < array.length; i++) {

        if (valorInicial === undefined && checkValorInicial === true) {
            sum = callback(sum, array[i], i, array)
        } else {
            valorInicial = callback(valorInicial, array[i], i, array)

            checkValorInicial = false
        }
    }
    if (!checkValorInicial) {
        return valorInicial
    }
    else {
        return sum;
    }
}





