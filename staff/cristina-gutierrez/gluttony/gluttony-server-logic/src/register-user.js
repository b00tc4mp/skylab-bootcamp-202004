require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")

module.exports = function (name, surname, email, password) {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)
}