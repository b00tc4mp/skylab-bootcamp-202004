
Object.validate = function (object) {
    if( typeof object != 'object' ) throw new TypeError(`${object} is not an object`)
}.bind(Object)
