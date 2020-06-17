const context = require('./context')

module.exports = function () {
    return this.storage.getItem('id').then(id => !!this.id)
}.bind(context)