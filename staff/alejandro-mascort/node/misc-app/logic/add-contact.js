const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')
require('../utils/date')
const { find } = require('../data')

module.exports = (userId, contact, callback) => {
    const { name, surname, email, phone, birthdate, country } = contact

    String.validate.notVoid(userId)

    if (typeof contact !== 'object') throw new TypeError(`${contact} is not an object`)
    
    if(!((name || surname) && (email || phone))) return callback(new Error('should have name or surname and email or phone'))

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



    find({id:userId}, 'users', (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with ${userId} does not exist`))
    
        contact.user = userId
        contact.contactId = uid()

        const file = `${contact.contactId}.json`
        
    
        fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
            if (error) return callback(error)
    
            callback(null, contact.contactId)
        })
    
    }) 
}