const {models: {Establishment}} = require('qrmenu-data')
const {errors: {UnexistenceError, CredentialsError}} = require('qrmenu-commons')

/**
 * 
 * @param {string} establishmentId id of the establishment
 * @param {string} tableId id of the table
 */
module.exports = (establishmentId, tableId) => {

    return (async() => {
        
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)

        const {tables, dishes} = establishment

        const table = tables.find(_table => _table.id === tableId)

        if(!table) throw new UnexistenceError(`Table with id ${tableId} does not exist`)

        if(!table.active) throw new CredentialsError("Permission denied" )

        return dishes
        
    })()
}