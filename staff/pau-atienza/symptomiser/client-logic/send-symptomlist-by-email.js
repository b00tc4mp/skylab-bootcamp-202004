require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(email){
    String.validate.notVoid(email)

    const symptomList = JSON.parse(this.storage.submittedSymptoms)

    JSON.validate(symptomList)

    let text = 'Your symptom list:\n\n'

    let html = "<h2>Your symptom list:</h2>"

    symptomList.forEach(({term, modifiers, comments})=>{
        JSON.validate(term)
        const {HPO_id, name, confidenceLevel} = term

        String.validate.notVoid(HPO_id)
        String.validate.notVoid(name)
        String.validate.notVoid(confidenceLevel)

        text += `\nSymptom: \n${HPO_id}: ${name} (Confidence: ${confidenceLevel})\n`
        
        html += `<h3>Symptom:</h3><p>${HPO_id}: ${name} (Confidence: ${confidenceLevel})<p>`

        if(modifiers && modifiers.length){
            JSON.validate(modifiers)

            text +="\nModifiers:\n"

            html +="<h4>Modifiers:</h4>"

            modifiers.forEach(({HPO_id, name, confidenceLevel})=>{
                String.validate.notVoid(HPO_id)
                String.validate.notVoid(name)
                String.validate.notVoid(confidenceLevel)
        
                text += `${HPO_id}: ${name} (Confidence: ${confidenceLevel})\n`
                html += `<p>${HPO_id}: ${name} (Confidence: ${confidenceLevel})</p>`
            })
        }
        if(comments){
            String.validate.notVoid(comments)

            text += `\nComments:\n${comments}\n`
            html += `<h4>Comments:</h4><p>${comments}<p>`
        }

    })

    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptomlists/email`, JSON.stringify({email, text, html}), {"Content-type": "application/json"})
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }

        // JSON.parse(body)

        return 
    })()

}.bind(context)