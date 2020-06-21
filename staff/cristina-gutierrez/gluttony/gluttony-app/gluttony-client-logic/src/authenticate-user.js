const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const axios = require("axios")

module.exports = (email, password) => {
    Email.validate(email)

    String.validate.notVoid(password)

    return axios.get(`${API_URL}/users/auth`, {
            params: {
                email,
                password
            }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                const { token } = JSON.parse(data)

                return token
            } else {
                const { error } = JSON.parse(data)

                throw new Error(error)
            }
        })
        .catch(console.log)
}