require('commons/polyfills/json')
require('commons/polyfills/string')
const { models: { Symptom } } = require('data')

module.exports = (id, symptom) => {
    String.validate(id)

    JSON.validateNotArray(symptom)

    let {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}} = symptom
    
    let {submittedTerm: {HPO_id, name, confidenceLevel, date: date3}} = symptom
    
    prediction.forEach(({predictionCode, predictionName})=>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    clicks.forEach(({HPO_id, date}, i, clicks)=>{
        String.validate.notVoid(HPO_id)
        Date.validate(new Date(date))
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

    const {modifiers, comments} = symptom

    comments && String.validate(comments)
    modifiers && modifiers.forEach(({HPO_id, name, confidenceLevel, date}, i, modifiers)=>{
        String.validate(HPO_id)
        String.validate(name)
        String.validate(confidenceLevel)
        String.validate.isISODate(date)
        modifiers[i].date = new Date(date)
    })

    date = new Date(date)
    date2 = new Date(date2)
    date3 = new Date(date3)

    if (modifiers || comments){
        return Symptom.findByIdAndUpdate(id, {$set: {modifiers, comments}})
            .then(({id})=>id)
    }
}