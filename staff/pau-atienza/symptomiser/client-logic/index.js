module.exports = {
    retrieveTermsById: require('./retrieve-terms-by-id'),
    retrieveTermsByQuery: require('./retrieve-terms-by-query'),
    context: require('./context'),
    registerSymptom: require('./register-symptom'),
    updateSymptom: require('./update-symptom'),
    registerSymptomList: require('./register-symptom-list'),
    savePredictorInput: require('./save-predictor-input'),
    savePredictorOutput: require('./save-predictor-output'),
    saveNavigationClick: require('./save-navigation-click'),
    saveSymptom: require('./save-symptom'),
    setSymptomToModify: require('./set-symptom-to-modify'),
    deleteSymptom: require('./delete-symptom')
}