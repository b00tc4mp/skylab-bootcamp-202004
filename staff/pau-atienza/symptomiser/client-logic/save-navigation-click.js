/**
 * Saves a navigation input (user click) in the context storage
 * 
 * @param {string} HPO_id the id of the submitted term in the HPO database.
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
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is missing information in the navigation.
 */

require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')


module.exports = function(HPO_id){
    String.validate.notVoid(HPO_id)

    if(!this.storage.navigation) throw new Error("Oops! Some important information was lost - please restart the search")

    String.validate.notVoid(this.storage.navigation)

    const navigation = JSON.parse(this.storage.navigation)

    const {predictorInput, predictorOutput, clicks = []} = navigation

    if(!predictorInput || !predictorOutput) throw new Error("Oops! Some important information was lost - please restart the search")

    JSON.validate(predictorInput)

    const {content, limit, date} = predictorInput

    String.validate.notVoid(content)
    String.validate.notVoid(limit)
    String.validate.isISODate(date)

    JSON.validate(predictorOutput)

    const {prediction, date: _date} = predictorOutput

    String.validate.isISODate(_date)

    JSON.validate(prediction)

    prediction.forEach(({predictionCode, predictionName}) =>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    JSON.validate(clicks)

    if (clicks.length){
        clicks.forEach(({HPO_id, date})=>{
            String.validate.notVoid(HPO_id)

            String.validate.isISODate(date)
        })
    }

    clicks.push({HPO_id, date: new Date().toISOString()})

    navigation.clicks = clicks

    this.storage.navigation = JSON.stringify(navigation)

}.bind(context)