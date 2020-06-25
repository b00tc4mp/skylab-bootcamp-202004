require('takemytask-commons/polyfills/string')

const { utils: { Email, call }} = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api and updates the worker information and returns the updated worker
 *
 * @param {string} name worker name
 * @param {string} surname worker surname 
 * @param {string} email worker email
 * @param {string} password worker password
 * @param {string} adress worker adress
 * @param {string} bankAcount worker bankacoutn
 * @param {string} description worker description 
 * @param {string} presentation worker presentation 
 * @param {string} pricingHour worker pricing
 * @param {string} jobArray worker job categories
 * @param {string} workingDistance worker working distance
 * 
 * @returns {undefined}
 *
 * @throws {Error} if server throws errror
 */

module.exports = function (name, surname, email, adress, bankAcount, description, presentation, pricingHour, workingDistance) {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(adress)
    String.validate.notVoid(bankAcount)
    String.validate.notVoid(description)
    Number.validate.integer(pricingHour)
    Number.validate.integer(workingDistance)

    const { token } = context.storage

    return call(
    'POST', 
    `${this.API_URL}/update`, 
    `{"name":"${name}", 
    "surname":"${surname}", 
    "email":"${email}", 
    "adress":"${adress}", 
    "bankAcount":"${bankAcount}", 
    "presentation":"${presentation}",
    "description":"${description}", 
    "pricingHour":${pricingHour}, 
    "workingDistance":${workingDistance}}`,
        {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`}) 
        .then( ({status, body}) => {

            if (status === 201) return 
            
            const { error } = JSON.parse(body)

            throw new Error (error)
        })
        
}.bind(context)