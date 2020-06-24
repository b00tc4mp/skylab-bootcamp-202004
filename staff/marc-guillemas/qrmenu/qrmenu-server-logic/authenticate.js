require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/json')
const { utils: {Email, NIF}, errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
/**
 * 
 * @param {string} nif nif of the establishment  
 * @param {string} email email of the worker
 * @param {string} password password of the worker
 */
module.exports = (nif, email, password) => {
    
    String.validate.notVoid(nif)
    NIF.validate(nif)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    
    return (async() => {
        const establishment = await Establishment.findOne({ nif })
        
        if(!establishment) throw new UnexistenceError(`Establishment with nif ${nif} does not exist`)
        
        const {staff} = establishment
        
        const user = staff.find(_user => _user.email === email)
        
        if(!user) throw new UnexistenceError(`User with e-mail ${email} does not exist`)
        
        const match = await bcrypt.compare(password, user.password)
        
        if(!match) throw new CredentialsError('wrong password')
        
        const token = {establishmentId: establishment._id, workerId: user._id}
        return token
    })()
}