const { model } = require('mongoose')
const { term, admin, predictorInput, predictorOutput, predictedItem, symptom, submittedTerm, navigationItem, symptomList } = require('./schemas')

module.exports = {
    Term: model('Term', term),
    Admin: model('Admin', admin),
    PredictorInput: model('PredictorInput', predictorInput),
    PredictorOutput: model('PredictorOutput', predictorOutput),
    PredictedItem: model('PredictedItem', predictedItem),
    Symptom: model('Symptom', symptom),
    SymptomList: model('SymptomList', symptomList),
    SubmittedTerm: model('SubmittedTerm', submittedTerm),
    NavigationItem: model('NavigationItem', navigationItem)
}