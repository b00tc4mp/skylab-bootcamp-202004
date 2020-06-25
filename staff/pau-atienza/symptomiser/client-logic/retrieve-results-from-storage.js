/**
 * Retrieves the query results from the context storage, if they exist
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

const context = require('./context')
require('commons/polyfills/string')
require('commons/polyfills/json')

module.exports = function(){
    const { navigation } = this.storage

    if(navigation) {
        String.validate.notVoid(navigation)
        const { predictorOutput } = JSON.parse(navigation)
        
        if (predictorOutput){
            JSON.validateNotArray(predictorOutput)
            return predictorOutput
        }
        
    }

    return null
    
}.bind(context)