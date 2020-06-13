require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const axios = require("axios")

module.exports = function (name, surname, email, password) {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    axios.post(`${process.env.API_URL}/users`, {
        name: "name",
        surname: "surname",
        email: "email",
        password: "password"
    })
    .then(({ status, body }) => {
        if (status === 201) return

            const { error } = JSON.parse(body)

            throw new Error(error)
    })
}