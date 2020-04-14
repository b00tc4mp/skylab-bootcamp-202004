function reduce(array, callback, valorInicial) {
    debugger
    var sum = 0;
    var checkValorInicial = true
    for (var i = 0; i < array.length; i++) {

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





