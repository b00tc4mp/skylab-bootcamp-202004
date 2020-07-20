const context = require("./context")
const { API_URL } = context
require("gluttony-commons/polyfills/string")
const { errors: { AuthenticationError } } = require("gluttony-commons")

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

    return await this.httpClient.get(`${API_URL}/favourites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ data }) => {            
            return data.favouriteStores
        })
}.bind(context)