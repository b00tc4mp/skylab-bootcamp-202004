const context = require("./context")
const { API_URL } = context

/**
 * @returns Promise
 */
module.exports = async function () {
    return await this.storage.removeItem("token")
}.bind(context)