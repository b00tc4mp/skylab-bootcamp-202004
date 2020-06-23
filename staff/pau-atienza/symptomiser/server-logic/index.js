module.exports = {
    context: require('./context'),
    retrieveTermsById: require('./retrieve-terms-by-id'),
    retrieveTermsByQuery: require('./retrieve-terms-by-query'),
    registerSymptom: require('./register-symptom'),
    registerSymptomList: require('./register-symptom-list'),
    updateSymptom: require('./update-symptom'),
    sendSymptomlistByEmail: require('./send-symptomlist-by-email')
}