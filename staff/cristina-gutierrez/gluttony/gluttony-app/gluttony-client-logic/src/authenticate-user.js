const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const context = require("./context")

/**
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
module.exports = async function(email, password) {
    Email.validate(email)
    try {
        String.validate.notVoid(password)
    } catch(error) {
        throw new Error("Password is empty")
    }

    return await this.httpClient.post(`${API_URL}/users/auth`, {
            email,
            password
        })
        .then(async ({ status, data }) => {
            if (status === 200) {
                await this.storage.setItem(
                    "token",
                    data.token
                );

                return data.token
            } else {
                throw new Error(data.error)
            }
        })
        .catch(() => {throw new Error("Email or password is not valid")})
}.bind(context)