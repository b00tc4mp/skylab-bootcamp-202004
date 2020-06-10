require('../qrmenu-commons/polyfills/string')
const {models: {Establishment}} = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')
module.exports = (establishmentId, workerId) => {
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(workerId)
    
    return (async() => {
        const establishment = await Establishment.findById(establishmentId) 
        
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {staff, orders} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(!worker) throw new UnexistenceError(`worker with id ${workerId} does not exist`)

        if(!orders.length) throw new UnexistenceError('there are no orders yet')

        return orders
    })()
}