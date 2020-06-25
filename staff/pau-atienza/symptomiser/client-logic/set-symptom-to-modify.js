/**
 * Takes a symptom from the submitted symptoms list in the context storage and saves it in the symptom to modify of the context storage.
 * 
 * @param {string} name the name of the symptom that we want to save as symptom to modify.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the symptom of the symptom is not present in the symptom list.
 */

 require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')

module.exports = function(name){
    String.validate.notVoid(name)

    const symptom = JSON.parse(this.storage.submittedSymptoms).find(({term:{name:_name}})=>_name===name)

    if(!symptom) throw new Error("Oops! Some information was lost. Please delete this symptom and add it to the list again")

    this.storage.symptomToModify = JSON.stringify(symptom)
}.bind(context)