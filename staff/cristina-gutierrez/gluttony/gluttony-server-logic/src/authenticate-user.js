require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")

module.exports = (email, password) => {
    Email.validate(email)
    String.validate.notVoid(password)
    console.log(email, password)
}