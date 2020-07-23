/* istanbul ignore file */

const context = require("./context")
const { API_URL } = context

/**
 * @param  {float} latitude
 * @param  {float} longitude
 * @returns Promise
 */
module.exports = function(latitude, longitude) {
    return this.httpClient.get(`${API_URL}/restaurants`, {
            params: {
                latitude,
                longitude
            }
        })
        .then(({ data }) => {
            return data.restaurants
        })
        .catch(console.error)
}.bind(context)