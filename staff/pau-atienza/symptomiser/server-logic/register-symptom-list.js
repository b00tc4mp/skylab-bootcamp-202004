require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/date')
const {  models: {SymptomList}, cleanSymptomList  } = require('data')

module.exports = (symptomList) => {
    JSON.validateNotArray(symptomList)
    
    let {symptomList: symptoms, date} = symptomList

    symptoms.forEach(symptom=>String.validate.notVoid(symptom))
    String.validate.isISODate(date)

    date = new Date(date)

    return SymptomList.create(symptomList)
        .then(({id})=>SymptomList.findById(id).populate('symptomList').lean())
        .then(symptomList=>cleanSymptomList(symptomList))
}