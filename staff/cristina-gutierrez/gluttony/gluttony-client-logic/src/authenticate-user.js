const context = require("./context")
const { API_URL } = context
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")

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
        .then(async ({ data }) => {
            await this.storage.setItem(
                "token",
                data.token
            );
        })
        .catch(() => {throw new Error("Email or password is not valid")})
}.bind(context)