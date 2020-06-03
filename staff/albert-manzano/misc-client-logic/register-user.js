require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { Email, call } } = require('misc-commons')
require('misc-commons/polyfills/url')

debugger
module.exports = (name, surname, email, password) => {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)
    let error
    
    return call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status,response }) => {debugger
            if (status !== 201) throw console.error('user already exist' )
            // .then(body)
            return response
        })
        // .catch(error => console.error("network error"))

}