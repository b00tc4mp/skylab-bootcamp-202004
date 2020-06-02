
const { utils: { email, call } } = require('misc-commons') 
require('misc-commons/polyfills/string')



function register(name, surname, email, password) {
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)


    return new Promise((resolve, reject) => {

        call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return reject(error)
    
                if (status === 201)
                    resolve()
                else {
                    const { error } = JSON.parse(body)
    
                    reject(new Error(error))
                }
            })
    })
}