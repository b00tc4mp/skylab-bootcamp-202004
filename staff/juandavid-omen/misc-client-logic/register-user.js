require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (name, surname, email, password, callback) => {
    String.validate.alphabetic(name)

    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 6)

    Function.validate(callback)


    return call('POST', 'http://localhost:8080/users',
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
    .then(({ body, status }) =>  {
        
        body 
            if (error) return callback(error)
    
            if (status === 201)
                callback()
    
            else {
                const { error } = JSON.parse(body)
                
                callback(new Error(error))
            }

    })

}