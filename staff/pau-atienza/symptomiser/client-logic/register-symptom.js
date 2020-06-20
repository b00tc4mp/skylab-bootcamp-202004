require('commons/polyfills/string')
require('commons/polyfills/number')
require('commons/polyfills/date')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(symptom){
    
    JSON.validateNotArray(symptom)

    let {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}} = symptom
    
    let {submittedTerm: {HPO_id, name, confidenceLevel}} = symptom
    
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
    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)
    String.validate.notVoid(confidenceLevel)
    String.validate.isISODate(date)
    String.validate.isISODate(date2)

    symptom.submittedTerm.date = new Date().toISOString()
    
    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptoms/`, JSON.stringify(symptom), {"Content-type": "application/json"})
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()

}.bind(context)
