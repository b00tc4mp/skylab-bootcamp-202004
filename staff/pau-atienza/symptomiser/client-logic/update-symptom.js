require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = function(id, symptom){
    String.validate(id)

    JSON.validateNotArray(symptom)

    let {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}} = symptom
    
    let {submittedTerm: {HPO_id, name, confidenceLevel, date: date3}} = symptom
    
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
    String.validate.isISODate(date3)

    const {modifiers, comments} = symptom

    comments && String.validate(comments)
    modifiers && modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate(HPO_id)
        String.validate(name)
        String.validate(confidenceLevel)
        String.validate.isISODate(date)
    })

    date = new Date(date)
    date2 = new Date(date2)
    date3 = new Date(date3)

    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptoms/update`, JSON.stringify({id, symptom}), {"Content-type": "application/json"})
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()
}.bind(context)