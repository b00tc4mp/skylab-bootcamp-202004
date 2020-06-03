require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')
debugger
module.exports = (name, surname, email, password) =>{
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return new Promise((resolve,reject)=> {
        return call('POST',
        'http://localhost:8080/users',
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({status,body})=>{
            if (status === 201) return resolve()
            else {
                const { error } = JSON.parse(body)
                return reject(new Error(error))
            }
        })
    })
}  
