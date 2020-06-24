require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/number')
const { errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')

/**
 * 
 * @param {string} establishmentId id of establishment 
 * @param {string} workerId id of the worker
 * @param {number} numTables number of tables to set
 */

module.exports = (establishmentId, workerId, numTables) => {
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(workerId)
    Number.validate.positive(numTables)
    
    return (async() => {
        const establishment = await Establishment.findById(establishmentId)
        
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        
        const {staff, tables} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(worker.role !== "owner") throw new CredentialsError(`You can not add tables with your working role`)

        if(tables.length) tables = []

        for(let table = 1; table <= numTables; table++){
            tables.push({table})
        }


        await Establishment.findByIdAndUpdate(establishmentId, {$set: {tables}})

        return
    })()
}