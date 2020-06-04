require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (name, surname, email, password) => {
    String.validate.alphabetic(name)

    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 6)

    return call(
        'POST', 
        'http://localhost:8080/users',
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ body, status }) =>  {            
            if (status === 201) return
            
                const { error } = JSON.parse(body)

                throw new Error(error)        
        })

}