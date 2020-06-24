require('commons/polyfills/json')
require('commons/polyfills/string')
const { models: { Symptom } } = require('data')

module.exports = (id, modifiers = [], comments = "none") => {
    debugger
    String.validate(id)

    String.validate(comments)

    JSON.validate(modifiers)

    modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate.notVoid(HPO_id)
        
        String.validate.notVoid(name)
        String.validate.notVoid(confidenceLevel)
        String.validate.isISODate(date)
    })
   
    return Symptom.findByIdAndUpdate(id, {$set: {modifiers, comments}}).then(({id})=>id)
}