const { VoidError } = require('../errors')

const ALPHABETIC_REGEX = /^[a-zA-Z ]+$/

String.isString = function (string) {
    return typeof string === 'string'
}

String.isVoid = function (string) {
    this.validate(string)

    return !string.trim().length
}

String.isAlphabetic = function (string) {
    this.validate(string)

    return ALPHABETIC_REGEX.test(string)
}

String.isLengthGreaterEqualThan = function (string, length) {
    this.validate(string)

    return string.length >= length
}

String.isISOString = function (string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)) return false;
    var d = new Date(string); 
    return d.toISOString()===string;
}

String.validate = function (string) {
    if (!this.isString(string)) throw new TypeError(`${string} is not a string`)
}

String.validate.notVoid = function (string) {
    if (this.isVoid(string)) throw new VoidError(`string is empty or blank`)
}.bind(String)

String.validate.alphabetic = function (string) {
    if (!this.isAlphabetic(string)) throw new Error(`${string} is not alphabetic`)
}.bind(String)

String.validate.lengthGreaterEqualThan = function (string, length) {
    if (!this.isLengthGreaterEqualThan(string, length)) throw new Error(`"${string}" length is not greater or equal than ${length}`)
}.bind(String)

String.validate.isISODate = function (string){
    this.validate.notVoid(string)
    
    if (!String.isISOString(string)) throw new TypeError(`${string} is not a valid ISO Date`)
}.bind(String)
