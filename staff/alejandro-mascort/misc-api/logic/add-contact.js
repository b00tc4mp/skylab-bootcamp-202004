const fs = require('fs')
const path = require('path')
require('../utils/polyfills/string')
const Email = require('../utils/email')
const uid = require('../utils/uid')
require('../utils/polyfills/json')
const { find } = require('../data')

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


    return new Promise((resolve, reject) => {
        find({id:userId}, 'users', (error, users) => {
            if (error) return reject(error)
    
            const [ user ] = users

            if (!user) return reject(new UnexistenceError(`user with ${userId} does not exist`))
        
            contact.user = userId
            contact.contactId = uid()
    
            const file = `${contact.contactId}.json`
            
        
            fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
                if (error) return reject(error)
        
                resolve(contact.contactId)
            })
        
        }) 
    })
    
}