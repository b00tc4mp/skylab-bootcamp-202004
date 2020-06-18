const {models: {Establishment, Order}} = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')
require('qrmenu-commons/polyfills/string')


module.exports = (establishmentId, workerId) => {

    String.validate(establishmentId)
    String.validate(workerId)

    return (async() => {
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {staff, tables} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(!worker) throw new UnexistenceError(`Worker with id ${workerId} does not exist`)

        if(!tables.length) throw new UnexistenceError('There are no tables yet')

        return tables
        
    })()
}