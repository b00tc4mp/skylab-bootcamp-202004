require('misc-commons/polyfills/string') 
const {Email, call} = require('misc-commons/utils') 

module.exports = (email, password)=>{
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    
    const body = JSON.stringify({email,password})
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const url = 'http://localhost:8080/users/auth'

    return call(method, url, body, headers)
        .then(({status, body}) => {
            if(status !== 200){
                const { error } = JSON.parse(body)

                throw new Error(JSON.parse(body))
            } 
            const { token } = JSON.parse(body)

            return token
        })
}