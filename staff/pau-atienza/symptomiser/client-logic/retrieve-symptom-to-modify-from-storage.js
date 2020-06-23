const context = require('./context')
require('commons/polyfills/string')

module.exports = function(){
    const { symptomToModify } = this.storage

    if(symptomToModify) {
        String.validate.notVoid(symptomToModify)

        return JSON.parse(symptomToModify)
    }
    return null
}.bind(context)