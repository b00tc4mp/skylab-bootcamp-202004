require("gluttony-commons/polyfills/string")
const axios = require("axios")

module.exports = function (token) {
    String.validate.notVoid(token)

    axios.get(`${process.env.API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}