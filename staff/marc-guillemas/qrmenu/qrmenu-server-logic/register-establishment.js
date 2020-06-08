require('qrmenu-commons/pollyfills/string')
require('qrmenu-commons/pollyfills/json')
const { utils: { Email, NIF }, errors: { DuplicityError }} = require('qrmenu-commons')
const { models: {Establishment} } = require('qrmenu-data')
const { bcrypt } = require('bcryptjs')

module.exports = (name, nif, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(nif)
    NIF.validate(nif)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        const user = Establishment.findOne({ nif })
        
        if(user) throw new DuplicityError(`user with nif ${nif} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Establishment.create({ name, nif, email, password: hash })
    })()
}