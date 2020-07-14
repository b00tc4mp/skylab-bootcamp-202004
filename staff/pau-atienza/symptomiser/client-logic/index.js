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
    deleteSymptom: require('./delete-symptom'),
    addModifierToSymptom: require('./add-modifier-to-symptom'),
    deleteModifierFromSymptom: require('./delete-modifier-from-symptom'),
    deleteCommentsFromSymptom: require('./delete-comments-from-symptom'),
    sendSymptomlistByEmail: require('./send-symptomlist-by-email'),
    retrieveResultsFromStorage: require('./retrieve-results-from-storage'),
    retrieveSymptomToModifyFromStorage: require('./retrieve-symptom-to-modify-from-storage'),
    retrieveSubmittedSymptomsFromStorage: require('./retrieve-submitted-symptoms-from-storage')
}