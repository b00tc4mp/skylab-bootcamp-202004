require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const { users: { find } } = require('../data')

module.exports = (userId, contact, callback) => {
    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)

    const { name, surname, email, phone, birthdate, country } = contact

    String.validate.notVoid(userId)

    Function.validate(callback)

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

    if (birthdate) {
        String.validate.notVoid(birthdate)
    }

    if (country)
        String.validate.notVoid(country)

    find({id:userId}, (error, [user])=> {
        debugger
        if(error) return callback (error)
        if(!user) return callback(new Error('something wrong happen'))

        const idContact = uid()
    
        const file = `${idContact}.json`
    
        contact.idContact = idContact
    
        contact.userId = userId
       
        fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
            if (error) return callback(error)
    
            callback(null, idContact)
        })
    })
}