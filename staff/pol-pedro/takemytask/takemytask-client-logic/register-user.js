require('misc-commons/polyfills/string')

const { utils: { Email, call }} = require('takemytask-commons')

module.exports = (name, surname, email, password) =>{
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

       return call('POST', 'http://localhost:8080/users', 
            `{"name":"${name}", "surname":"${surname}", "email":"${email}", "password":"${password}"}`,
            {'Content-Type':'application/json'}) 
            .then/( ({status, body}) => {
                const {status, body}  = respons
                if (status === 201) return 
               
                const { error } = JSON.parse(body)
                throw new Error (error)
            })
}