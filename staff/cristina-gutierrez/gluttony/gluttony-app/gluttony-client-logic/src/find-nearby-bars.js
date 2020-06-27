const { API_URL } = require("../../config")
const axios = require("axios")

/**
 * @param  {float} latitude
 * @param  {float} longitude
 * @returns Promise
 */
module.exports = (latitude, longitude) => {
    return axios.get(`${API_URL}/bars`, {
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
        .catch(console.log)
}