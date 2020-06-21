require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')

module.exports = function(HPO_id, name, confidenceLevel, symptomId){
    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)
    String.validate.notVoid(confidenceLevel)
    String.validate.notVoid(symptomId)

    if(!this.storage.submittedSymptoms) this.storage.submittedSymptoms = JSON.stringify([])

    let newSymptomList = JSON.parse(this.storage.submittedSymptoms)
    
    newSymptomList.push({term: {HPO_id, name, confidenceLevel, symptomId}})

    this.storage.submittedSymptoms = JSON.stringify(newSymptomList)

}.bind(context)