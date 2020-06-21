const context = require('./context')

module.exports = function () {
    delete this.storage.token
}.bind(context)