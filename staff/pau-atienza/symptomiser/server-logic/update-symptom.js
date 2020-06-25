/**
 * Updates the modifiers and comments of a symptom in the database
 * 
 * @param {string} id the id of the symptom that will be modified
 * @param {Array} modifiers an array containing the modifiers submitted by the user.
 * @param {string} comments the comments submitted by the patient.

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
const { models: { Symptom } } = require('data')

module.exports = (id, modifiers = [], comments = "none") => {
    
    String.validate(id)

    String.validate(comments)

    JSON.validate(modifiers)

    modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate.notVoid(HPO_id)
        
        String.validate.notVoid(name)
        String.validate.notVoid(confidenceLevel)
        String.validate.isISODate(date)
    })
   
    return Symptom.findByIdAndUpdate(id, {$set: {modifiers, comments}}).then(({id})=>id)
}