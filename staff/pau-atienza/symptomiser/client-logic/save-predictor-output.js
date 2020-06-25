/**
 * Saves the prediction of the tranlator API in the context storage.
 * 
 * @param {Object} results a JSON containing the prediction returned by the translator API.
 * 
 * @param {Object} navigation a JSON object with all the navigation information.
 * @param {Object} predictorInput a JSON object including the initial query by the user, the limit requested and its date.
 * @param {string} content Te initial query introduced by the user.
 * @param {string} limit Te limit set in the number of results provided by the predictor API.
 * @param {string} date date of the query in ISOString.
 * @param {Object} predictorOutput a JSON object including the predictions returned by the predictor API and the date of the answer.
 * @param {string} prediction An array including the names and HPO_ids of the predicted terms.
 * @param {string} name the name of the submitted term in the HPO database.
 * @param {string} confidenceLevel the level of confidence introduced by the patiend during submission.
 * @param {string} predictionCode the HPO_id of the predicted term.
 * @param {string} predictionName the name of the predicted term.
 * 
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')


module.exports = function(results){
    JSON.validate(results)

    const { prediction } = results

    JSON.validate(prediction)

    prediction.forEach(({predictionCode, predictionName}) =>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    if(!this.storage.navigation) throw new Error("Oops! Some important information was lost - please restart the search")

    String.validate.notVoid(this.storage.navigation)

    const navigation = JSON.parse(this.storage.navigation)

    if(!navigation.predictorInput) throw new Error("Oops! Some important information was lost - please restart the search")

    JSON.validate(navigation.predictorInput)

    const {content, limit, date} = navigation.predictorInput

    String.validate.notVoid(content)
    String.validate.notVoid(limit)
    String.validate.isISODate(date)

    const predictorOutput = {prediction, date: new Date().toISOString()}

    navigation.predictorOutput = predictorOutput

    this.storage.navigation = JSON.stringify(navigation)

    return predictorOutput

}.bind(context)