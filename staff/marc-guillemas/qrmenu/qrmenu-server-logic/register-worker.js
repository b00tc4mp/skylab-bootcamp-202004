require('qrmenu-commons/polyfills/string')
const { models: {Establishment}, mongoose: {ObjectId} } = require('qrmenu-data')
const { errors: { UnexistenceError, CredentialsError, DuplicityError } } = require('qrmenu-commons')
const bcrypt = require('bcryptjs')

/**
 * 
 * @param {string} establishmentId id of the establishment
 * @param {string} workerId id of the worker
 * @param {string} email email of the worker
 * @param {string} role role of the worker
 * @param {string} password password of the worker
 */

module.exports = (establishmentId, workerId, email, role, password) => {
    
    String.validate.notVoid(establishmentId)
    String.validate.notVoid(workerId)
    String.validate.notVoid(email)
    String.validate.notVoid(role)
    String.validate.notVoid(password)

    return (async() => {

        
        const establishment = await Establishment.findById(establishmentId)
        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        
        const {staff} = establishment
        
        const allowed = staff.find(user => user.id === workerId && user.role === 'owner')

        if(!allowed) throw new CredentialsError(`User with id ${workerId} is not allowed to perform this operation`)
        
        const match = staff.find(user => user.email === email)

        if(match) throw new DuplicityError(`Worker with email ${email} already exist`)
        
        const hash = await bcrypt.hash(password,10)
        
        const worker = {email, role, password: hash}
        
        staff.push(worker)

        await Establishment.findByIdAndUpdate(establishmentId, {$set: {staff}})

        return 
    })()
}