function reduce(array, expression, initialValue) {
    var result = 0
    if (array.length !== 0) {
        if (initialValue === undefined) {
            initialValue = 0
        }
        for (var i = 0; i < array.length; i++) {
            var acumulator = result
            result = expression(acumulator, array[i])

        }

        result = initialValue + result
        return result
    }
    return "Error: Reduce of empty array with no initial value"
}