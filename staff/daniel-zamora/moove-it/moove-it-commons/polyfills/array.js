
    ; (() => {
        Array.validate = function (array) {
            if (!this.isArray(array)) throw new TypeError(`${array} is not a array`)
        }
    })()