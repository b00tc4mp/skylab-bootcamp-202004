/**
 * @param {string} name user's input of his name, should be string.
 * @param {string} surname user's input of his surname, should be string.
 * @param {string} password user's input of his personal password, should be string.
 * @param {string} _password user's input of repeating his personal password, should be string.
 * @param {email} email user's input of his personal username, should be perform Regex provided. 
 * @param {number} phone user's input of his CP, should be number.
 * @param {string} role input to define the rol of the user.
 * @throws {TypeError} if users input are/is not matching the type needed.
 * @throws {Error} if users email does not attend the regex provided/or password matching
 */

require('aquaponics-commons/polyfills/string')
const { utils: { Email, call, Password } } = require('aquaponics-commons')
const context = require('./context')
require('aquaponics-commons/polyfills/number')

module.exports = async function (name, surname, email, password, _password, phone) {
    debugger
    String.validate(name)
    String.validate.notVoid(name)
    String.validate(surname)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    if (password !== _password) throw new Error('password and confirmation do not match')
    Password.validate(password)
    
    Number(phone)
    Number.validate(phone)
    const role = "user"
    const {status,body} = await call(
        'POST',
        `${this.API_URL}/users`,
        { name, surname, email, password, role, phone },
        { 'Content-type': 'application/json' })
        
    if (status === 201) return 

    const { error } = JSON.parse(body)
    
    throw new Error(error)

}.bind(context)

/**
 * @promise returns :
 * @return {Error} if password and _password introduced by user are not matching.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return empty if every succeded.
 *
 */