const context = require('./context')

module.exports = async function () {
    return await this.storage.removeItem('token')
}.bind(context)