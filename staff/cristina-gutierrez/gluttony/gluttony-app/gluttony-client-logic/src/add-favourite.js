const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { errors: { AuthenticationError } } = require("gluttony-commons")
const context = require("./context")

/**
 * @param  {string[]} storeId
 * @returns Promise
 */
module.exports = async function(storeId) {
    let token

    try {
        token = await this.storage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new AuthenticationError("User is not authenticated")
    }

    return await this.httpClient.post(`${API_URL}/favourites`, {
            storeId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {   
            if (status === 201) return
            throw new Error(data.error)
        })
}.bind(context)