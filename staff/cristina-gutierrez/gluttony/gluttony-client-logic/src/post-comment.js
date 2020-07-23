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
    try {
        String.validate.notVoid(text)
    } catch(error) {
        throw new Error("Comment is empty")
    }
    try {
        String.validate.notVoid(storeId)
    } catch(error) {
        throw new Error("Store is not valid")
    } 

    return await this.httpClient.post(`${API_URL}/comments`, {
            text, 
            creationDate: Date.now(), 
            storeId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {})
}.bind(context)