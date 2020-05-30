require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
require('../utils/polyfills/json')


module.exports = (userId, contactId, contact, callback) => {
    String.validate.notVoid(userId)
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`) //TODO add object polifill
    Function.validate(callback)

    const { name, surname, email, phone, birthdate, country } = contact

    if (name)
        String.validate.notVoid(name)

    if (surname)
        String.validate.notVoid(surname)

    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (phone)
        String.validate.notVoid(phone)

    if (birthdate)
        String.validate.notVoid(birthdate) //TODO add date validation

    if (country)
        String.validate.notVoid(country)

    users.find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user id ${userId} does not exist`))

        contacts.find({ id: contactId }, (error, [contact]) => {
            if (error) return callback(error)
            if (!contact) return callback(new Error(`contact with id ${contactId} does not exist`))

            const newContact = { name, surname, email, phone, birthdate, country }

            contacts.update(contactId, newContact, (error) => {
                if (error) callback(error)
                callback(null)
            })


        })
    })
}
