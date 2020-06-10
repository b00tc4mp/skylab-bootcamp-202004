
Date.validate = function (date) {
    if (!this.isDate(date)) throw new TypeError(`${date} is not a date`)
}

Date.isDate = function (date) {
    return date.__proto__.constructor.name === "Date"
}.bind(this)


