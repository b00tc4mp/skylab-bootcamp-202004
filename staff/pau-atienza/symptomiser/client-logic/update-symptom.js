require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = async function(comments = "none"){

    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    const {modifiers = [], term: {symptomId: id}} = symptomToModify

    String.validate(id)

    String.validate(comments)

    JSON.validate(modifiers)

    modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
        String.validate.notVoid(HPO_id)

        String.validate.notVoid(name)
        String.validate.notVoid(confidenceLevel)
        String.validate.isISODate(date)
    })
     

    const {status, body} = await call('POST', `${this.API_URL}/symptoms/update`, JSON.stringify({id, modifiers, comments}), {"Content-type": "application/json"})
    if (status !== 200) {
        throw new Error("There was a server error")
    }
    
    symptomToModify.comments = comments
    symptomToModify.modifiers = modifiers

    this.storage.symptomToModify = JSON.stringify(symptomToModify)

    const submittedSymptoms = JSON.parse(this.storage.submittedSymptoms)

    const symptomIndex = submittedSymptoms.findIndex(item=>item.term.name===symptomToModify.term.name)
    
    submittedSymptoms[symptomIndex] = symptomToModify

    this.storage.submittedSymptoms = JSON.stringify(submittedSymptoms)
   
}.bind(context)