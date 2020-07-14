/**
 * Retrieves the symptom to modify from the context storage, if it exists
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

const context = require('./context')
require('commons/polyfills/string')

module.exports = function(){
    const { symptomToModify } = this.storage

    if(symptomToModify) {
        String.validate.notVoid(symptomToModify)

        return JSON.parse(symptomToModify)
    }
    return null
}.bind(context)