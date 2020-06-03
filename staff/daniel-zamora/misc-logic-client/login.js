require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons') 
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    Email.validate(email)
    String.validate.notVoid(password)



    return call('POST', 'http://localhost:8080/users/auth',
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })

        //https://skylabcoders.herokuapp.com/api/v2/users/auth
     
            .then(({status, body}) => {
                if (status === 200) {
                    const { token } = JSON.parse(body)                
                    
                    return token
                
                } else {
                    const { error } = JSON.parse(body)
        
                    if (error) throw new Error(error)
                }
            })   
}