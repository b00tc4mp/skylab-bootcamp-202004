require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/number')
require('qrmenu-commons/polyfills/array')
const { errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')

module.exports = (establishmentId, workerId, name, description, price, tags) => {
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(workerId)
    String.validate.notVoid(name)
    String.validate.notVoid(description)
    Number.validate.positive(price)
    Array.validate(tags)
    Array.validate.notVoid(tags)
    debugger
    return (async() => {
        const establishment = await Establishment.findById(establishmentId)
        
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        debugger
        const {staff, dishes} = establishment

        const worker = staff.find(_worker => _worker._id.toString() === workerId)

        if(worker.role !== "chef" && worker.role !== "owner") throw new CredentialsError(`can not add dishes to the menu with your working role`)

        dishes.push({name, description, price, tags})

        await Establishment.findByIdAndUpdate(establishmentId, {$set: {dishes}})

        return
    })()
}