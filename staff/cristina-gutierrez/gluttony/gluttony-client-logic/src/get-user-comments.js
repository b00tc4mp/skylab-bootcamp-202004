const { API_URL } = require("../config")
require("gluttony-commons/polyfills/string")
const { errors: { AuthenticationError } } = require("gluttony-commons")
const context = require("./context")

/**
 * @returns Promise
 */
module.exports = async function() {
    let token

    try {
        token = await this.storage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new AuthenticationError("User is not authenticated")
    }

    return await this.httpClient.get(`${API_URL}/comments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return data.comments
            } else {
                throw new Error(data.error)
            }
        })
}.bind(context)