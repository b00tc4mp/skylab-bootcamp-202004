const { API_URL } = require("../../config")
const axios = require("axios")

module.exports = (latitude, longitude) => {
    axios.get(`${API_URL}/restaurants`, {
            params: {
                latitude,
                longitude
            }
        })
        .then(({ status, body }) => {
            if (status === 200) {
                const { coordinates } = JSON.parse(body)

                return coordinates
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
        .catch(console.log)
}