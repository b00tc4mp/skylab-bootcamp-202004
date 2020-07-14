/**
 * Saves the a new symptom in the symptom list of the context storage.
 * 
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} symptomId the id of the submitted term in our database.
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the symptom is already in the symptom list.
 */

require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')

module.exports = function(HPO_id, name, confidenceLevel, symptomId){
    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)
    String.validate.notVoid(confidenceLevel)
    String.validate.notVoid(symptomId)

    if(!this.storage.submittedSymptoms) this.storage.submittedSymptoms = JSON.stringify([])

    let newSymptomList = JSON.parse(this.storage.submittedSymptoms)

    const index = newSymptomList.findIndex(({term: {HPO_id: id}})=>id===HPO_id)

    if (index === -1){
        newSymptomList.push({term: {HPO_id, name, confidenceLevel, symptomId}})

        this.storage.submittedSymptoms = JSON.stringify(newSymptomList)
    } else throw new Error("This symptom has already been submitted")

}.bind(context)