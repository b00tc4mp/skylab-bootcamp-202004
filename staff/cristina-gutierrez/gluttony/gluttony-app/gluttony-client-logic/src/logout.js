const context = require("./context")

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