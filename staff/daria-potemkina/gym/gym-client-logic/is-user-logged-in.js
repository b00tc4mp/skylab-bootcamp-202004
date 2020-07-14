/**
 * Return the user token when exist
 * 
 * @returns {boolean} true if exists, otherwise false
 */

const context = require('./context')

module.exports = function () {
    
    const token = this.storage.token;

    return !!token
}.bind(context)