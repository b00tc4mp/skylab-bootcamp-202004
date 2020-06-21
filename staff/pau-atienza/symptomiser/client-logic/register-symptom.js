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
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()

}.bind(context)
