/**
 * Adds a modifier to the symptom to modify in the context storage, if that modifier is not already in the symptom.
 * 
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * @param {Object} modifier a JSON object with all the modifier information.
 * 
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} date date of the query in ISOString.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

require('commons/polyfills/string')
require('commons/polyfills/json')
require('commons/polyfills/array')
const context = require('./context')

module.exports = function(confidenceLevel, modifier){
    
    String.validate.notVoid(confidenceLevel)    
    
    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    JSON.validateNotArray(symptomToModify)

    const { modifiers = [] } = symptomToModify

    Array.validate(modifiers)

    const { term: { HPO_id, name} } = modifier

    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)

    const index = modifiers.findIndex(({HPO_id: id})=>id===HPO_id)

    if (index === -1){
        const date = new Date().toISOString()

        modifiers.push({HPO_id, name, confidenceLevel, date})

        symptomToModify.modifiers = modifiers

        this.storage.symptomToModify = JSON.stringify(symptomToModify)
    }

    const { term } = symptomToModify

    return {term, modifiers}
    
}.bind(context)