/**
 * Calls the API to submit the symptom in the database
 * 
 * @param {string} HPO_id the id of the submitted term in the HPO database.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * 
 * @param {Object} navigation a JSON object with all the navigation information.
 * @param {Object} predictorInput a JSON object including the initial query by the user, the limit requested and its date.
 * @param {string} content Te initial query introduced by the user.
 * @param {string} limit Te limit set in the number of results provided by the predictor API.
 * @param {string} date date of the query in ISOString.
 * @param {Object} predictorOutput a JSON object including the predictions returned by the predictor API and the date of the answer.
 * @param {string} prediction An array including the names and HPO_ids of the predicted terms.
 * @param {string} date2 date of the predictor response in ISOString.
 * @param {Array} clicks array with the navigation of the user (objects containing the clicked term and date)
 * @param {Object} submittedTerm a JSON object containing the term that was finally submitted by the user.
 * @param {string} date3 date of term submission in ISOString.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

 require('commons/polyfills/string')
require('commons/polyfills/number')
require('commons/polyfills/date')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(HPO_id, name, confidenceLevel){

    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)
    String.validate.notVoid(confidenceLevel)

    const navigation = JSON.parse(this.storage.navigation)

    let {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks} = navigation
    
    prediction.forEach(({predictionCode, predictionName})=>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    clicks.forEach(({HPO_id, date})=>{
        String.validate.notVoid(HPO_id)
        String.validate.isISODate(date)
    })

    Number.validate.greaterEqualThan(limit, 1)

    String.validate.notVoid(content)
    String.validate.isISODate(date)
    String.validate.isISODate(date2)

    
    const date3 = new Date().toISOString()

    const symptom = {navigation, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}}
    
    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptoms/`, JSON.stringify(symptom), {"Content-type": "application/json"})
        if (status !== 200) {
            throw new Error("Internal server error")
        }
        return JSON.parse(body)
    })()

}.bind(context)
