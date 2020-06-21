const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const axios = require("axios")

module.exports = (token) => {
    String.validate.notVoid(token)

    return axios.get(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(data)

                throw new Error(error)
            }
        })
        .catch(console.log)
}