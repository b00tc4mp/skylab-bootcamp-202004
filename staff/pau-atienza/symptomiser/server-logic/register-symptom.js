/**
 * Saves the submitted symptom in the MongoDB database
 * 
 * @param {Object} symptom a JSON object with all the symptom information.
 * @param {Object} predictorInput a JSON object including the initial query by the user, the limit requested and its date.
 * @param {string} content Te initial query introduced by the user.
 * @param {string} limit Te limit set in the number of results provided by the predictor API.
 * @param {string} date date of the query in ISOString.
 * @param {Object} predictorOutput a JSON object including the predictions returned by the predictor API and the date of the answer.
 * @param {string} prediction An array including the names and HPO_ids of the predicted terms.
 * @param {string} date2 date of the predictor response in ISOString.
 * @param {Array} clicks array with the navigation of the user (objects containing the clicked term and date)
 * @param {Object} submittedTerm a JSON object containing the term that was finally submitted by the user.
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * @param {string} date3 date of term submission in ISOString.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 */

require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
require('commons/polyfills/date')
const { models: { Symptom } } = require('data')

module.exports = (symptom) => {
    
    JSON.validateNotArray(symptom)

    let {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}} = symptom
    
    let {submittedTerm: {HPO_id, name, confidenceLevel, date: date3}} = symptom
    
    prediction.forEach(({predictionCode, predictionName})=>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    clicks.forEach(({HPO_id, date}, i, clicks)=>{
        String.validate.notVoid(HPO_id)
        String.validate.isISODate(date)
        clicks[i].date = new Date(date)
    })

    Number.validate.greaterEqualThan(limit, 1)

    String.validate.notVoid(content)
    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)
    String.validate.notVoid(confidenceLevel)
    String.validate.isISODate(date)
    String.validate.isISODate(date2)
    String.validate.isISODate(date3)

    date = new Date(date)
    date2 = new Date(date2)
    date3 = new Date(date3)

    symptom.navigation.serverResponseTime = date2 - date

    symptom.navigation.userNavigationTime = clicks[clicks.length-1].date - date2
    
    return Symptom.create(symptom)
        .then(({id})=>id)
}