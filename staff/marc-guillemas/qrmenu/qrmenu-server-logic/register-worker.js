require('qrmenu-commons/polyfills/string')
const { models: {Establishment, User}, mongoose: {ObjectId} } = require('qrmenu-data')
const { errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const bcrypt = require('bcryptjs')

module.exports = (establishmentId, name, surname, role, password) => {
    debugger
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(password)
    String.validate.notVoid(role)

    return (async() => {

        debugger
        const establishment = await Establishment.findById(establishmentId)
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        debugger
        const {staff} = establishment
    
        const hash = await bcrypt.hash(password,10)
        
        const worker = {name, surname, role, password: hash}
        debugger
        staff.push(worker)

        await Establishment.findByIdAndUpdate(establishmentId, {$set: {staff}})

        return 
    })()
}