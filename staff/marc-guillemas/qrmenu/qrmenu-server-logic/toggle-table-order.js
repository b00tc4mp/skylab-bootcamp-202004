const {models: {Establishment, Order}} = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')
require('qrmenu-commons/polyfills/string')


module.exports = (establishmentId, workerId, tableId) => {

    String.validate(establishmentId)
    String.validate(workerId)
    String.validate(tableId)

    return (async() => {
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {staff, tables, orders} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(!worker) throw new UnexistenceError(`Worker with id ${workerId} does not exist`)

        const match = tables.find(_table => _table.id === tableId)

        if(!match) throw new UnexistenceError(`Table with number ${tableId} does not exist`)

        if(!match.active) {
            match.active = true
            debugger
            orders.push(new Order({table: tableId}))
        }else{
            match.active = false
            debugger
            const order = orders.find(_order => _order.table === tableId && _order.payed === false)
            
            if(!order) throw new UnexistenceError(`Order assigned at the table with id ${tableId} does not exist`)
            
            order.payed = true
        }

        await establishment.save()
        
    })()
}