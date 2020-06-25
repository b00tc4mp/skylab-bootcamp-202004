const context = require('./context')
require('commons/polyfills/string')

module.exports =  function(name){
    String.validate.notVoid(name)

    const symptomList = JSON.parse(this.storage.submittedSymptoms)

    const index = symptomList.findIndex(item=>item.term.name===name)

    index !== -1 && symptomList.splice(index, 1)
    if(index === -1) throw new Error("This symptom does not exist")

    this.storage.submittedSymptoms = JSON.stringify(symptomList)

    return symptomList
}.bind(context)