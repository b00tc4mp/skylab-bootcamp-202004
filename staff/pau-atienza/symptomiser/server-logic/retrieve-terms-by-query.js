require('dotenv').config()
const { env: { PREDICTOR_URL } } = process
require('commons/polyfills/string')
const { models: {Term}, cleanTerm } = require('data')
const { errors: { UnexistenceError } } = require('commons')

module.exports = query => {
    String.validate.notVoid(query)

    let result = {lower: [], higher: []}
    (async ()=>{
        const { status, body } = await call('GET', `${PREDICTOR_URL}`,`{ "content": "${query}", "limit": 1 }`,{ 'Content-type': 'application/json' })
        if (status !== 200){
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
        const [{ "prediction-code": HPO_id }] = JSON.parse(body)

        const term = await Term.findOne({HPO_id}).lean()
        if(!term) throw new UnexistenceError(`Term with HPO id ${HPO_id} does not exist`)
        result.term = cleanTerm(term)

        const lower = await Term.find({is_a: HPO_id}).lean()
        lower && lower.forEach(term =>result.lower.push(cleanTerm(term)))

        if(result.term.is_a) const higher = await Term.find({HPO_id: result.term.is_a}).lean()
        higher && higher.forEach(term =>result.higher.push(cleanTerm(term)))

        return result
    })()
}