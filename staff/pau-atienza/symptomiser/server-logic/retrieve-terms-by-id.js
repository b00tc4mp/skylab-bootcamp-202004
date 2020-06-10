require('commons/polyfills/string')
const { models: {Term}, cleanTerm } = require('data')
const { errors: { UnexistenceError } } = require('commons')

module.exports = HPO_id => {
    String.validate.notVoid(HPO_id)

    let result = {lower: [], higher: []}
    return Term.findOne({HPO_id}).lean()
        .then(term => {
            if(!term) throw new UnexistenceError(`Term with HPO id ${HPO_id} does not exist`)

            result.term = cleanTerm(term)
            return 
        })
        .then(()=>{
            return Term.find({is_a: HPO_id}).lean()
        })
        .then(terms =>{
            terms && terms.forEach(term =>{
                result.lower.push(cleanTerm(term))
            })
            return
        })
        .then(() =>{
            if(!result.term.is_a) return

            return Term.find({HPO_id: result.term.is_a}).lean()
        })
        .then(terms=>{
            terms && terms.forEach(term =>{
                result.higher.push(cleanTerm(term))
            })

            return result
        })
}