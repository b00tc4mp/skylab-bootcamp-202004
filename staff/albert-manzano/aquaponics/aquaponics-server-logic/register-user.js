/**
 * @param {string} name user's input of his name, should be string.
 * @param {string} surname user's input of his surname, should be string.
 * @param {string} password user's input of his personal password, should be string.
 * @param {string} _password user's input of repeating his personal password, should be string.
 * @param {email} email user's input of his personal username, should be perform Regex provided. 
 * @param {number} phone user's input of his CP, should be number.
 * @param {string} role input to define the rol of the user.
 * @throws {TypeError} if users input are/is not matching the type needed.
 * @throws {Error} if users email does not attend the regex provided.
 */

require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/json')
require('aquaponics-commons/polyfills/number')

const { utils: { Email }, errors: { DuplicityError } } = require('aquaponics-commons')
const { models: {User} } = require('aquaponics-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')

module.exports = (name, surname, email, password, role, phone) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    Number.validate(phone)
    String.validate(role)
    const confirmed = false
    const status = 'enable'
    
    return User.findOne({ email })
        .then(user => {
           
            if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(hash => User.create({ name, surname, email, password: hash , phone, role, confirmed, status}))
        .then(() => {})
        
}

/**
 * @promise returns :
 * @return {Error} if password and _password introduced by user are not matching.
 * @return {DuplicityError} if email introduced matches one in data base.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return empty if every succeded.
 * 
 */