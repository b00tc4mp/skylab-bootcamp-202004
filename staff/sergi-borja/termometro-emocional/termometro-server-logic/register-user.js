require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { errors: {DuplicityError}, utils: {Email}} = require('termometro-commons')
const { models: { User } } = require('termometro-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, age, sexo, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async() => {
        const user = await User.findOne({email})

        if(user) throw new DuplicityError('An user with this email has already been registered')

        const hash = await bcrypt.hash(password, 10)

        await User.create({name, surname, age, sexo, email, password: hash})
    })()
}