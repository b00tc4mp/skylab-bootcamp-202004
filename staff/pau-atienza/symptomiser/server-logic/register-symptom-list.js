/**
 * Saves the submitted symptom list in the MongoDB database
 * 
 * @param {Object} symptomList a JSON object containing the list of symptoms and the date of submission.
 * @param {Array} symptoms an array containing the mongoDB ids of the symptoms in the list.
 * @param {string} date date of the query in ISOString.
 * @param {Object} symptom the mongoDB id of a symptom in the list.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/date')
const {  models: {SymptomList}, cleanSymptomList  } = require('data')

module.exports = (symptomList) => {
    JSON.validateNotArray(symptomList)
    
    let {symptomList: symptoms, date} = symptomList

    symptoms.forEach(symptom=>String.validate.notVoid(symptom))
    String.validate.isISODate(date)

    date = new Date(date)

    return SymptomList.create(symptomList)
        .then(({id})=>SymptomList.findById(id).populate('symptomList').lean())
        .then(symptomList=>cleanSymptomList(symptomList))
}