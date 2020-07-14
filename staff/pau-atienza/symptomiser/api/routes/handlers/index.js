module.exports = {
    retrieveTermsById: require('./retrieve-terms-by-id'),
    retrieveTermsByQuery: require('./retrieve-terms-by-query'),
    registerSymptom: require('./register-symptom'),
    updateSymptom: require('./update-symptom'),
    registerSymptomList: require('./register-symptom-list'),
    sendSymptomlistByEmail: require('./send-symptomlist-by-email'),
    registerAdmin: require('./register-admin'),
    authenticateAdmin: require('./authenticate-admin'),
    retrieveAllSymptoms: require('./retrieve-all-symptoms')
}