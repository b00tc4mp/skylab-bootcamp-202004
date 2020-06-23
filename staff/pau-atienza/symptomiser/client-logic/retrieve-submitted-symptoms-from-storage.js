const context = require('./context')
require('commons/polyfills/string')
require('commons/polyfills/json')

module.exports = function(){
    const { submittedSymptoms } = this.storage

    if(submittedSymptoms) {
        String.validate.notVoid(submittedSymptoms)

        return JSON.parse(submittedSymptoms)
    }
    return null
}.bind(context)