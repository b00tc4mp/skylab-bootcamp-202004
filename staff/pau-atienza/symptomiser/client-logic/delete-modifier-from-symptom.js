/**
 * Deletes a modifier from the symptom to modify in the context storage, if present.
 * 
 * @param {string} modifierName the name of the modifier that needs to be deleted.
 * @param {Object} modifiers an array containing JSON objects with the modifier information.
 * 
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * @param {string} name the name of the submitted term in the HPO database.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the modifier is not present in the symptom to modify, or if there are no modifiers.
 */


require('commons/polyfills/string')
require('commons/polyfills/json')
require('commons/polyfills/array')
const context = require('./context')

module.exports = function(modifierName){
    
    String.validate.notVoid(modifierName)    
    
    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    JSON.validateNotArray(symptomToModify)

    const { modifiers, term } =symptomToModify
 
    if (!modifiers || !modifiers.length) throw new Error("There are no modifiers to delete")

    Array.validate(modifiers)
    JSON.validateNotArray(term)

    const {HPO_id, name} = term

    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)

    const index = modifiers.findIndex(({name})=>name===modifierName)

    if (index !== -1){
        modifiers.splice(index, 1)

        if(!modifiers.length) delete symptomToModify.modifiers

        this.storage.symptomToModify = JSON.stringify(symptomToModify)
    } else throw new Error("This modifier does not exist")

    return symptomToModify
    
}.bind(context)