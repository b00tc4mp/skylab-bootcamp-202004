require('commons/polyfills/string')
require('commons/polyfills/json')

module.exports = symptom => {
    JSON.validate(symptom)
    let symptomString = ''
    const keys = Object.keys(symptom)

    keys.forEach(key =>{
        switch(key){
            case 'term':
                const {HPO_id, name} = symptom[key]

                String.validate.notVoid(HPO_id)
                String.validate.notVoid(name)

                symptomString += `Term: \n${HPO_id}: ${name}`
                break
            case 'modifiers':
                symptomString += ', \n\nModifiers:'

                symptom[key].forEach(({HPO_id, name}) => {
                    String.validate.notVoid(HPO_id)

                    String.validate.notVoid(name)
                    symptomString += ` \n${HPO_id}: ${name}`
                } )
                break
            case 'comments':
                const comments = symptom[key]

                String.validate(comments)
                symptomString += `, \n\nComments: \n${comments?comments:"none"}`
                break
            }
    })
    return symptomString
}