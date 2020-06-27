const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const axios = require("axios")
const { AsyncStorage } = require("react-native")

/**
 * @param  {string} text
 * @param  {Date} creationDate
 * @param  {string} storeId
 */
module.exports = async (text, storeId) => {
    let token

    try {
        token = await AsyncStorage.getItem("token");
        String.validate.notVoid(token);
    } catch (error) {
        throw new Error("Error retrieving data")
    }

    return await axios.post(`${API_URL}/comments`, {
            text, 
            creationDate: Date.now(), 
            storeId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(({ status, data }) => {
            if (status === 201) return
            throw new Error(data.error)
        })
        .catch(error => error)
}