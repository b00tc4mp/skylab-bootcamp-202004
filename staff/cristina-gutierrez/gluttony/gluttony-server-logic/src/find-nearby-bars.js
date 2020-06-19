const { models: { Stores } } = require("gluttony-data")
const axios = require("axios")

module.exports = function (latitude, longitude) {
    axios.get("maps.googleapis.com/maps/api/place/nearbysearch/json", {
            params: {
                key: process.env.PLACES_API_KEY,
                location: `${latitude},${longitude}`,
                radius: 1000,
                type: "bar"
            }
        })
        .then(({ status, results }) => {
            JSON.parse(results)

            if (status === 200 && results.length) {
                return results[0]
            } else {
                throw new Error('Nothing found')
            }
        })
        .then(result => {
            return {
                id: result.id,
                name: result.name,
                type: "bar",
                location: result.place_id,
                coordinates: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                },
                thumbnail: result.icon
            }
        })
        .then(store => {
            Stores.create(store)

            return store.coordinates
        })
        .catch(console.log)
}