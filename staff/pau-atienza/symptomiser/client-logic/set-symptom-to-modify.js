require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')

module.exports = function(name){
    String.validate.notVoid(name)

    const symptom = JSON.parse(this.storage.submittedSymptoms).find(item=>item.term.name===name)

    this.storage.symptomToModify = JSON.stringify(symptom)
}.bind(context)