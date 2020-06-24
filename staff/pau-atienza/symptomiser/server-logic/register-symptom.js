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