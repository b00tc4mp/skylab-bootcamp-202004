require('qrmenu-commons/pollyfills/string')
require('qrmenu-commons/pollyfills/json')
const { utils: {Email}, errors: { UnexistenceError, CredentialsError } } = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        const user = await Establishment.findOne({ email })
        debugger
        if(!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
        
        const match = await bcrypt.compare(password, user.password)
        
        if(!match) throw new CredentialsError('wrong password')
        
        return user.id
    })()
}