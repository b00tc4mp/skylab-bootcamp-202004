const {models: {Establishment, Dish, DishStatus}} = require('qrmenu-data')
const {errors: {UnexistenceError, CredentialsError}} = require('qrmenu-commons')
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/array')

/**
 * 
 * @param {string} establishmentId id from the establishment
 * @param {string} tableId id from the table
 * @param {array} userDishes array of multiple dishes id's
 */

module.exports = (establishmentId, tableId, userDishes) => {
    String.validate(establishmentId)
    String.validate(tableId)
    Array.validate(userDishes)
    
    return (async() => {
        
     
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {orders, tables, dishes} = establishment

        const table = tables.find(_table => _table.id === tableId)

        if(!table) throw new UnexistenceError(`Table with id ${tableId} does not exist`)

        if(!table.active) throw new CredentialsError("Permission denied" )

        const order = orders.find(_order => _order.tableId === tableId && _order.payed === false)

        if(!order) throw new UnexistenceError(`No order open with this orderId `)

        const {dishStatus} = order

        await Promise.all(userDishes.map(async dish => {
            
            const match = dishes.find(_dish => _dish.id === dish)

            order.total = order.total + match.price

            if (!match) throw new UnexistenceError(`Dish with id ${dish} does not exist`)

            dishStatus.push(new DishStatus({
                dish
            }))
        }));
        

        await establishment.save()
        
    })()
}