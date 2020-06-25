require('commons/polyfills/string')
require('commons/polyfills/json')
require('commons/polyfills/array')
const context = require('./context')

module.exports = function(confidenceLevel, modifier){
    
    String.validate.notVoid(confidenceLevel)    
    
    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    JSON.validateNotArray(symptomToModify)

    const { modifiers = [] } = symptomToModify

    Array.validate(modifiers)

    const { term: { HPO_id, name} } = modifier

    String.validate.notVoid(HPO_id)
    String.validate.notVoid(name)

    const index = modifiers.findIndex(({HPO_id: id})=>id===HPO_id)

    if (index === -1){
        const date = new Date().toISOString()

        modifiers.push({HPO_id, name, confidenceLevel, date})

        symptomToModify.modifiers = modifiers

        this.storage.symptomToModify = JSON.stringify(symptomToModify)
    }

    const { term } = symptomToModify

    return {term, modifiers}
    
}.bind(context)