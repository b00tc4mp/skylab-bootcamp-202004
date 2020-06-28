const { API_URL } = require("../../config")
const context = require("./context")

/**
 * @param  {float} latitude
 * @param  {float} longitude
 * @returns Promise
 */
module.exports = function(latitude, longitude) {
    return this.httpClient.get(`${API_URL}/bars`, {
            params: {
                latitude,
                longitude
            }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return data.bar
            } else {
                throw new Error(data.error)
            }
        })
        .catch(console.error)
}.bind(context)