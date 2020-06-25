const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const axios = require("axios")
const { AsyncStorage } = require("react-native")
/**
 * @returns Promise
 */
module.exports = async storeId => {
    let token

    try {
        token = await AsyncStorage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new Error("Error retrieving data")
    }

    return await axios.delete(`${API_URL}/favourites`, {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { storeId }
        })
        .then(({ status, data }) => {
            if (status === 204) return
            throw new Error(data.error)
        })
        .catch(error => error)
}