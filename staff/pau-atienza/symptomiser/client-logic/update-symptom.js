require('commons/polyfills/json')
require('commons/polyfills/string')
require('commons/polyfills/number')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')

module.exports = async function(comments){

    const symptomToModify = JSON.parse(this.storage.symptomToModify)

    const {modifiers, term: {symptomId: id}} = symptomToModify

    String.validate(id)

    comments && String.validate(comments)
    if(modifiers){ 
        JSON.validate(modifiers)
        modifiers.forEach(({HPO_id, name, confidenceLevel, date})=>{
            String.validate(HPO_id)
            String.validate(name)
            String.validate(confidenceLevel)
            String.validate.isISODate(date)
        })
    }    

    const {status, body} = await call('POST', `${this.API_URL}/symptoms/update`, JSON.stringify({id, modifiers, comments}), {"Content-type": "application/json"})
    if (status !== 200) {
        const {error} = JSON.parse(body)

        throw new Error(error)
    }
    
    // JSON.parse(body)

    symptomToModify.comments = comments

    this.storage.symptomToModify = JSON.stringify(symptomToModify)

    const submittedSymptoms = JSON.parse(this.storage.submittedSymptoms)

    const symptomIndex = submittedSymptoms.findIndex(item=>item.term.name===symptomToModify.term.name)
    
    submittedSymptoms[symptomIndex] = symptomToModify

    this.storage.submittedSymptoms = JSON.stringify(submittedSymptoms)
   
}.bind(context)