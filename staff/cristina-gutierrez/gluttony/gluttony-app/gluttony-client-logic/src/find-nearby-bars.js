const { API_URL } = require("../../config")
const axios = require("axios")

module.exports = (latitude, longitude) => {
    return axios.get(`${API_URL}/bars`, {
            params: {
                latitude,
                longitude
            }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return data.coordinates
            } else {
                const { error } = JSON.parse(data)

                throw new Error(error)
            }
        })
        .catch(console.log)
}