
const { utils: { Email, call } } = require('misc-commons') 
require('misc-commons/polyfills/string')
const fetch = require('fetch')

module.exports = (name, surname, email, password) => { debugger
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)


    return call('POST', 'http://localhost:8080/users',
    `{"name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}"}`,
    { 'Content-type': 'application/json'})
        .then(({status, body}) => {
            if (status === 201) return ('User crated')
            
            else throw new Error('an error has ocurred')
        }) 
}
//     const URL = 'http://localhost:8080/users'
//     const data= { name: name, surname: surname, email: email, password: password}

//     return fetch( URL, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}, mode: 'no-cors'})
//         .then((response) => {
//             console.log(response)
//             if (response.ok) return response.status
            
//             else throw new Error('an error has ocurred')
//         }) 
// }

