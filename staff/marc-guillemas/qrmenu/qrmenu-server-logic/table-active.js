const {models: {Establishment}} = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')

module.exports = (establishmentId, workerId, table) => {


    return (async() => {
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {staff, tables} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(!worker) throw new UnexistenceError(`Worker with id ${workerId} does not exist`)

        const match = tables.find(_table => _table.table === table)

        if(!match) throw new UnexistenceError(`Table with number ${table} does not exist`)

        match.active = true

        tables.push(match)

        await Establishment.findByIdAndUpdate(establishmentId, {$set: {tables}})
        
        return 
    })()
}