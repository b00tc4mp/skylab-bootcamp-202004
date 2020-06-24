const { models: { Symptom }, cleanSymptomList } = require('data')

module.exports = ()=>{
    return Symptom.find({}).lean().then(symptomList=>cleanSymptomList(symptomList))
}