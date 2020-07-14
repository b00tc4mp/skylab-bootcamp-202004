const context = require("./context")
const { API_URL } = context
require("gluttony-commons/polyfills/string")
const { errors: { AuthenticationError } } = require("gluttony-commons")

/**
 * @param  {string} text
 * @param  {Date} creationDate
 * @param  {string} storeId
 * @returns Promise
 */
module.exports = async function(text, storeId) {
    let token

    try {
        token = await this.storage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new AuthenticationError("User is not authenticated")
    }

    return await this.httpClient.post(`${API_URL}/comments`, {
            text, 
            creationDate: Date.now(), 
            storeId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {
            if (status === 201) return
            throw new Error(data.error)
        })
        .catch(() => {throw new Error("Comment is not valid")})
}.bind(context)