require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/date')
const {  models: {SymptomList}, cleanSymptomList  } = require('data')

module.exports = (symptomList) => {
    JSON.validateNotArray(symptomList)
    
    const {symptomList: symptoms, date} = symptomList

    symptoms.forEach(symptom=>String.validate(symptom))
    Date.validate(date)

    return SymptomList.create(symptomList)
        .then(({id})=>SymptomList.findById(id).populate('symptomList').lean())
        .then(symptomList=>cleanSymptomList(symptomList))
}