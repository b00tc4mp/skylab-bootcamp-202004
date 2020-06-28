const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const context = require("./context")

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
        throw new Error("Error retrieving data")
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
        .catch(error => error)
}.bind(context)