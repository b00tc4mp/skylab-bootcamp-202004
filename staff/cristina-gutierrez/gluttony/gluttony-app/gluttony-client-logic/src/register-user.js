const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const axios = require("axios")

module.exports = (name, surname, email, password) => {
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return axios.post(`${API_URL}/users`, {
            name,
            surname,
            email,
            password
        })
        .then(({ status, data }) => {
            if (status === 201) return

                const { error } = JSON.parse(data)

                throw new Error(error)
        })
        .catch(console.log)
}