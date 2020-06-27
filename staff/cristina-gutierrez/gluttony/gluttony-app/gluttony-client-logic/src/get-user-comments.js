const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const axios = require("axios")
const { AsyncStorage } = require("react-native")

/**
 * @returns Promise
 */
module.exports = async () => {
    let token

    try {
        token = await AsyncStorage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new Error("Error retrieving data")
    }

    return await axios.get(`${API_URL}/comments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {
            if (status === 200) {
                return data.comments
            } else {
                throw new Error(data.error)
            }
        })
        .catch(error => error)
}