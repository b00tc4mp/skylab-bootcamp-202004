const { API_URL } = require("../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const axios = require("axios")

module.exports = function (email, password) {
    Email.validate(email)

    String.validate.notVoid(password)
    alert(email, password)

    axios.post(`${API_URL}/users/auth`, {
        email: "email",
        password: "password"
    })
    .then(({ status, body }) => {
        if (status === 200) {
            const { token } = JSON.parse(body)

            return token
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })
}