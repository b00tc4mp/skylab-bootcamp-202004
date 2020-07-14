require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/number')
require('qrmenu-commons/polyfills/array')
const { errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')

/**
 * 
 * @param {string} establishmentId id from establishment
 * @param {string} workerId id from worker
 * @param {string} name name of the dish 
 * @param {string} description description of the dish
 * @param {number} price price of the dish
 * @param {array} tags tags of the dish
 */

module.exports = (establishmentId, workerId, name, description, price, tags) => {
    String.validate(establishmentId)
    String.validate(workerId)
    String.validate(name)
    String.validate(description)
    Number.validate(price)
    Array.validate(tags)
    Array.validate.notVoid(tags)
    
    return (async() => {
        const establishment = await Establishment.findById(establishmentId)
        
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        
        const {staff, dishes} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(worker.role !== "chef" && worker.role !== "owner") throw new CredentialsError(`can not add dishes to the menu with your working role`)

        dishes.push({name, description, price, tags})

        await Establishment.findByIdAndUpdate(establishmentId, {$set: {dishes}})

        return
    })()
}