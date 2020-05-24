const fs = require('fs')
const path = require('path')
require('../utils/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/json')
require('../utils/function')
const { find } = require('../data/users')

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
        //Date.validate(birthdate) // TODO create this polyfill
    }

    if (country)
        String.validate.notVoid(country)

    find({userId}, (error, [user])=> {
        
        if(error) return callback(error)
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