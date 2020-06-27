const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const axios = require("axios")

/**
 * @param  {string} name
 * @param  {string} surname
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
module.exports = async (name, surname, email, password) => {
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return await axios.post(`${API_URL}/users`, {
            name,
            surname,
            email,
            password
        })
        .then(({ status, data }) => {
            if (status === 201) return
            throw new Error(data.error)
        })
        .catch(error => error)
}