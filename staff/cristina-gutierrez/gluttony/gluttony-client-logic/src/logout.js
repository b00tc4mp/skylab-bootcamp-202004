const context = require("./context")
const { API_URL } = context

/**
 * @returns Promise
 */
module.exports = async function() {
    try {
        await this.storage.removeItem("token");
    } catch (error) {
        throw new Error("Error removing token")
    }
}.bind(context)