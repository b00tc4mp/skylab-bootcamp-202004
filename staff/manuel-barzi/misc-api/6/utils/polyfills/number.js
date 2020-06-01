const { ValueError } = require('../../errors')

    ; (() => {
        Number.isNumber = function (number) {
            return !isNaN(number)
        }

        Number.validate = function (number) {
            if (!this.isNumber(number)) throw new TypeError(`${number} is not a number`)
        }

        Number.validate.positive = function (number) {
            this.validate(number)

            if (number < 0) throw new ValueError(`${number} is not positive`)
        }.bind(Number)
    })()