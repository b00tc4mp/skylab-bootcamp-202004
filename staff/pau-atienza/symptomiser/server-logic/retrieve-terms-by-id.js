/**
 * Retrieves a symptom from the HPO database uploaded to mongoDB using the HPO_id. I also retrieves all symptoms above and below it in the relational database.
 * 
 * @param {string} HPO_id the id of the symptom in the HPO database
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {UnexistenceError} If the symptom does not exist in the database.
 * @throws {CredentialsError} If the credentials are wrong.
 */

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

        if(result.term.is_a.length) {
            higher = await Term.find({HPO_id: result.term.is_a}).lean()
        }
        higher && higher.forEach(term =>result.higher.push(cleanTerm(term)))

        return result
    })()
}