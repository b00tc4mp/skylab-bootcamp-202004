/**
 * checks if user is logged
 */

const __context__ = require('./context')

module.exports = function () {
    return this.storage.getItem('id').then(id => !!this.id)
}.bind(__context__)