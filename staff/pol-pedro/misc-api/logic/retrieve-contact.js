require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { contacts: { find } } = require('../data')

module.exports = (contactId, callback) => {
    String.validate.notVoid(contactId)
    Function.validate(callback)

    find({ id: contactId }, (error, [contact]) => {
        if (error) return callback(error)

        if (!contact) return callback(new Error(`contact with id ${contactId} does not exist`))

        delete contact.id
        delete contact.password

        callback(null, contact)
    })
}