 'use strict'
Arroz.prototype.reduce = function reduce(expression, initialValue) {
    var result = 0
    if (this.length !== 0) {
        if (initialValue === undefined) {
            initialValue = 0
        }
        for (var i = 0; i < this.length; i++) {
            var acumulator = result
            result = expression(acumulator, this[i])

        }

        result = initialValue + result
        return result
    }
    return "Error: Reduce of empty array with no initial value"
}