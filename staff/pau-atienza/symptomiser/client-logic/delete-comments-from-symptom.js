require('commons/polyfills/string')
require('commons/polyfills/json')
require('commons/polyfills/array')
const context = require('./context')

module.exports = function(){   
    
    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    JSON.validateNotArray(symptomToModify)

    delete symptomToModify.comments

    this.storage.symptomToModify = JSON.stringify(symptomToModify)

    return symptomToModify
    
}.bind(context)