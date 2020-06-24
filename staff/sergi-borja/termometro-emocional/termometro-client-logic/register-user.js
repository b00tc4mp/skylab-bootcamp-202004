require('termometro-commons/polyfills/string')
const { utils: { Email, call } } = require('termometro-commons')
const context = require('./context')

/**
 * if token is undefined, creates an admin
 * if token is defined, we send it so the logic of server creates a member
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} age
 * @param {string} sex
 * @param {string} location
 * @param {string} email
 * @param {string} memberId
 * @param {string} token
 *  * 
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

module.exports = function (name, surname, age, sex, location, email, password, token) {
    String.validate(name)
    String.validate(surname)
    String.validate(sex)
    String.validate(location)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    if(token) String.validate.notVoid(token);


    return !token?
    call(
        'POST',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}",  "location": "${location}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
    .then(({ status, body }) => {
        
        if (status === 201) return
        const { error } = JSON.parse(body)

        throw new Error(error)
    })
    :
    call(
        'POST',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}", "location": "${location}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }

    )
        .then(({ status, body }) => {
            
            if (status === 201) return
            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)