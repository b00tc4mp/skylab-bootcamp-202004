const { AsyncStorage } = require("react-native")
/**
 * @returns Promise
 */
module.exports = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        throw new Error("Error removing token")
    }
}