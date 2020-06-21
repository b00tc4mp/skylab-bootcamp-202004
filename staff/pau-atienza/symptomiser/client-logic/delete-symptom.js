const context = require('./context')
require('commons/polyfills/string')

module.exports =  function(name){
    String.validate.notVoid(name)

    const symptomList = JSON.parse(this.storage.submittedSymptoms)

    const index = symptomList.findIndex(item=>item.term.name===name)

    symptomList.splice(index, 1)

    this.storage.submittedSymptoms = JSON.stringify(symptomList)
}.bind(context)