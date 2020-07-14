/**
 * Calls the translator API and provides it with the query introduced by the user.
 * 
 * @param {string} query the query submitted by the user
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

require('commons/polyfills/string')
const {  utils: { call }  } = require('commons')
global.fetch = require('node-fetch')
const context = require('./context')

module.exports = function(query){
    String.validate.notVoid(query)

    return (async ()=>{
        const { status, body } = await call('GET', `${this.PREDICTOR_URL}?content=${query}&limit=${this.LIMIT}`,null, null)
        if (status !== 200){

            throw new Error("Server error")
        }

        parsedPrediction = JSON.parse(body)

        parsedPrediction.prediction.forEach(({"prediction-code": predictionCode, "prediction-name": predictionName}, i, prediction) =>{
            prediction[i] = {predictionCode, predictionName}
        })

        return parsedPrediction
    })()
}.bind(context)