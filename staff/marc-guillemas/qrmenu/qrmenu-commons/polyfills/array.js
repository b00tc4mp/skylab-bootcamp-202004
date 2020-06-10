const { VoidError } = require('../errors')

Array.isVoid = function (array) {
    this.validate(array)

    return !array.length
}

Array.isArray = function (array) {
    return Object.prototype.toString.call(array) === '[object Array]'
}

Array.validate = function (array) {
    if (!this.isArray(array)) throw new TypeError(`${array} is not an array`)
}

Array.validate.notVoid = function (array) {
    if (this.isVoid(array)) throw new VoidError('array is empty or blank')
}.bind(Array)