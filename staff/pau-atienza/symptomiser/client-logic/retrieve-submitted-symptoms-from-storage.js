/**
 * Retrieves list of submitted symptoms from the context storage, if they exist
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

const context = require('./context')
require('commons/polyfills/string')
require('commons/polyfills/json')

module.exports = function(){
    const { submittedSymptoms } = this.storage

    if(submittedSymptoms) {
        String.validate.notVoid(submittedSymptoms)

        return JSON.parse(submittedSymptoms)
    }
    return null
}.bind(context)