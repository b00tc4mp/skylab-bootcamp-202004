const _Date = (() => {
    const DATE_REGEX = /^\d{1,2}\/\d{1,2}\/\d{4}$/

    return {
        isDate(date) {
            return DATE_REGEX.test(date)
        },

        validate(date) {
            if (!this.isDate(date)) throw new Error(`${date} is not an date`)
        }
    }
})()

module.exports = _Date