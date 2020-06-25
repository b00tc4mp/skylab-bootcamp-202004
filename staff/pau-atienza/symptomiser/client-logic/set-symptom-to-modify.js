require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')

module.exports = function(name){
    String.validate.notVoid(name)

    const symptom = JSON.parse(this.storage.submittedSymptoms).find(({term:{name:_name}})=>_name===name)

    if(!symptom) throw new Error("Oops! Some information was lost. Please delete this symptom and add it to the list again")

    this.storage.symptomToModify = JSON.stringify(symptom)
}.bind(context)