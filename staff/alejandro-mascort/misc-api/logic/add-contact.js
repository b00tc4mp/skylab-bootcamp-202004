require('../utils/polyfills/string')
const Email = require('../utils/email')
require('../utils/polyfills/json')
const { find, create } = require('../data')

const { UnexistenceError } = require('../errors')

module.exports = (userId, contact) => {
    const { name, surname, email, phone, birthdate, country } = contact

    String.validate.notVoid(userId)

    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    
    if(!((name || surname) && (email || phone))) throw new Error('should have name or surname and email or phone')

    if (name) String.validate.notVoid(name)

    if (surname) String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone) String.validate.notVoid(phone)

    if (birthdate) {
        String.validate.notVoid(birthdate)
        // _Date.validate(birthdate) // format - 30/12/2020
    }

    if (country) String.validate.notVoid(country)


    return find({ id: userId }, 'users')
        .then(users => { 
            if (!users.length) throw new UnexistenceError(`user with id ${userId} not found`)

            contact.user = userId

            return create(contact,'contacts')
            
        })
    
}