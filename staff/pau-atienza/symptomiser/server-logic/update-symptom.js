require('commons/polyfills/json')
require('commons/polyfills/string')
const { models: { Symptom } } = require('data')

module.exports = (id, modifiers, comments) => {
    String.validate(id)

    comments && String.validate(comments)
    if(modifiers){ 
        JSON.validate(modifiers)
        modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
            String.validate.notVoid(HPO_id)
            String.validate.notVoid(name)
            String.validate.notVoid(confidenceLevel)
            String.validate.isISODate(date)
        })
    }
    
    if (modifiers || comments){
        return Symptom.findByIdAndUpdate(id, {$set: {modifiers, comments}})
            .then(({id})=>id)
    }
}