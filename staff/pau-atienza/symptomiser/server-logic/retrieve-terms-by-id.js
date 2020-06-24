require('commons/polyfills/string')
const { models: { Term }, cleanTerm } = require('data')
const { errors: { UnexistenceError } } = require('commons')

module.exports = HPO_id => {
    String.validate.notVoid(HPO_id)

    let result = {lower: [], higher: []}
    let higher

    return (async ()=>{
        
        const term = await Term.findOne({HPO_id}).lean()
        if(!term) throw new UnexistenceError(`Term with HPO id ${HPO_id} does not exist`)
        result.term = cleanTerm(term)

        const lower = await Term.find({is_a: HPO_id}).lean()
        lower && lower.forEach(term =>result.lower.push(cleanTerm(term)))

        debugger

        if(result.term.is_a.length) {
            higher = await Term.find({HPO_id: result.term.is_a}).lean()
        }
        higher && higher.forEach(term =>result.higher.push(cleanTerm(term)))

        return result
    })()
}