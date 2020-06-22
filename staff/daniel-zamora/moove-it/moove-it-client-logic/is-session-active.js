const context = require('./context')

module.exports = function () {
    const { token } = this.storage

    return !!token
}.bind(context)