require('qrmenu-commons/polyfills/string')
const { models: {Establishment}, mongoose: {ObjectId} } = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')

/**
 * 
 * @param {string} establishmentId id of the establishment
 * @param {string} workerId id of the worker
 */

module.exports = (establishmentId, workerId) => {
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(workerId)
    
    return (async() => {
        
        const establishment = await Establishment.findById(establishmentId)
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        
        const {staff} = establishment
        
        const worker = staff.find(user => user.id === workerId)
        
        if(!worker) throw new UnexistenceError(`Worker with id ${workerId} does not exist`)
        
        const {email, role} = worker
        
        return {email, role}
    })()
}