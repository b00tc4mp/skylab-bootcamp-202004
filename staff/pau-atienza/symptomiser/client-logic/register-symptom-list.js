/**
 * Calls the API to submit the symptom list in the database.
 * 
 * @param {Object} symptomList a JSON object containing the list of symptoms and the date of submission.
 * @param {string} symptomId a string with the id of a symptom in the database.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If there is a server error.
 */

require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(){
    String.validate.notVoid(this.storage.submittedSymptoms)

    const symptomList = JSON.parse(this.storage.submittedSymptoms).map(({term:{symptomId}})=>{
        String.validate.notVoid(symptomId)
        
        return symptomId
    })

    JSON.validate(symptomList)

    const date = new Date().toISOString()

    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptomlists`, JSON.stringify({symptomList, date}), {"Content-type": "application/json"})
        if (status !== 200) {
            throw new Error("There was a network error")
        }
        return JSON.parse(body)
    })()

}.bind(context)