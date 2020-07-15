(() => {
    Function.isFunction = function (fxn) {
        return typeof fxn === 'function'
    }

    Function.validate = function (fxn) {
        if (!this.isFunction(fxn)) throw new TypeError(`${fxn} is not a function`)
    }
})()