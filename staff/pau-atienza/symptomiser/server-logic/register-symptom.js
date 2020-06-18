require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
require('commons/polyfills/date')
const { models: { Symptom } } = require('data')

module.exports = (symptom) => {
    JSON.validateNotArray(symptom)

    const {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}} = symptom

    const {submittedTerm: {HPO_id, name, confidenceLevel, date: date3}} = symptom
    
    prediction.forEach(({predictionCode, predictionName})=>{
        String.validate(predictionCode)
        String.validate(predictionName)
    })

    clicks.forEach(({HPO_id, date})=>{
        String.validate(HPO_id)
        Date.validate(date)
    })

    Number.validate.greaterEqualThan(limit, 1)

    String.validate(content)
    String.validate(HPO_id)
    String.validate(name)
    String.validate(confidenceLevel)

    Date.validate(date)
    Date.validate(date2)
    Date.validate(date3)

    return Symptom.create(symptom)
        .then(({id})=>id)
}