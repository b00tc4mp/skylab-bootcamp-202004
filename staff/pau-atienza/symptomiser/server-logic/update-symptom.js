require('commons/polyfills/json')
require('commons/polyfills/string')
const { models: { Symptom } } = require('data')

module.exports = (id, symptom) => {
    String.validate(id)

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

    const {modifiers, comments} = symptom

    comments && String.validate(comments)
    modifiers && modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate(HPO_id)
        String.validate(name)
        String.validate(confidenceLevel)
        Date.validate(date)
    })

    if (modifiers || comments){
        return Symptom.findByIdAndUpdate(id, {$set: {modifiers, comments}})
    }
}