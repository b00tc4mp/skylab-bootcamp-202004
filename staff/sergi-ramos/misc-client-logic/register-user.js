require('../misc-commons/polyfills/string')
const { Email } = require('../misc-commons/utils')

module.exports = (name, surname, email, password) => {

    String.validate.notVoid(name)
    String.validate.notVoid(surname)

    Email.validate(email)
    Email.isEmail(email)

    String.validate.notVoid(password)
    String.validate.lengthGreaterEqualThan(password, 8)
}