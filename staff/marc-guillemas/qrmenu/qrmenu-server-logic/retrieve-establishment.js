require('qrmenu-commons/polyfills/string')
const { models: {Establishment} } = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')

/**
 * 
 * @param {string} establishmentId id of the establishment
 */
module.exports = (establishmentId) => {
    String.validate.notVoid(establishmentId)
    
    return (async() => {
    
        const establishment = await Establishment.findById(establishmentId)
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)        
        
        return establishment.establishment
    })()
}