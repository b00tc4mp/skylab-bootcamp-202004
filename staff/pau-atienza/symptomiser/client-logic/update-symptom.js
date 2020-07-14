/**
 * Callse the API to update the modifiers and comments of a symptom in the database. It also updates the context storage with that information.
 * 
 * @param {string} comments the comments submitted by the patient.
 * @param {string} id the id of the symptom that will be modified
 * @param {Array} modifiers an array containing the modifiers submitted by the user.
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * @param {string} date date of term submission in ISOString.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the e-mail does not fit the format..
 */

require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = async function(comments = "none"){

    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    const {modifiers = [], term: {symptomId: id}} = symptomToModify

    String.validate(id)

    String.validate(comments)

    JSON.validate(modifiers)

    modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate.notVoid(HPO_id)

        String.validate.notVoid(name)
        String.validate.notVoid(confidenceLevel)
        String.validate.isISODate(date)
    })

    const {status, body} = await call('POST', `${this.API_URL}/symptoms/update`, JSON.stringify({id, modifiers, comments}), {"Content-type": "application/json"})
    if (status !== 200) {
        throw new Error("There was a server error")
    }
    
    symptomToModify.comments = comments
    symptomToModify.modifiers = modifiers

    this.storage.symptomToModify = JSON.stringify(symptomToModify)

    const submittedSymptoms = JSON.parse(this.storage.submittedSymptoms)

    const symptomIndex = submittedSymptoms.findIndex(item=>item.term.name===symptomToModify.term.name)
    
    submittedSymptoms[symptomIndex] = symptomToModify

    this.storage.submittedSymptoms = JSON.stringify(submittedSymptoms)
   
}.bind(context)