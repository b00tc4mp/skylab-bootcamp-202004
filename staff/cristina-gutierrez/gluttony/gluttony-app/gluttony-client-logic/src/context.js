const axios = require("axios")
const { AsyncStorage } = require("react-native")

module.exports = {
    httpClient: axios,
    storage: AsyncStorage
}