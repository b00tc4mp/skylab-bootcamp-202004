/**
 * Saves the query submitted by the user in the context storage.
 * 
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * 
 * @param {string} query Te initial query introduced by the user.
 * @param {string} limit Te limit set in the number of results provided by the predictor API.
 * @param {string} date date of the query in ISOString.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

require('commons/polyfills/string')
const context = require('./context')

module.exports = function(query){
    String.validate.notVoid(query)
    
    predictorInput = {content: query, date: new Date().toISOString(), limit: "5"}

    this.storage.navigation = JSON.stringify({predictorInput})

}.bind(context)