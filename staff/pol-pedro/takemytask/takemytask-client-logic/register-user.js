require('takemytask-commons/polyfills/string')

const { utils: { Email, call }} = require('takemytask-commons')
const context = require('./context')

/**
 * calls  the api to register a user with the given name surname ...
 *
 * @param {string} name users name
 * @param {string} surname users surname 
 * @param {string} email users email
 * @param {string} password users password
 * @param {string} adress users adress
 * 
 * @returns {undefined}
 *
 * @throws {Error} if server throws errror
 */


module.exports = function (name, surname, email, password, adress) {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

       return call(
        'POST', 
        `${this.API_URL}/users`, 
        `{"name":"${name}", "surname":"${surname}", "email":"${email}", "password":"${password}", "adress":"${adress}"}`,
            {'Content-Type':'application/json'}) 
            .then( ({status, body}) => {
    
                if (status === 201) return 
               
                const { error } = JSON.parse(body)

                throw new Error (error)
            })
}.bind(context)