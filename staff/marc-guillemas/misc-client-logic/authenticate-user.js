require("../misc-commons/polyfills/string");
const { Email } = require("../misc-commons/utils");
const {utils: { call }} = require("misc-commons");

module.exports = (email, password) => {
    String.validate.notVoid(password)
    Email.validate(email)
    
    return call('POST', 'http://localhost:8080/users/auth', `{"email": "${email}", "password": "${password}"}`, 
    {'Content-type': 'application/json'})
        .then(({body, status}) => {
         
            console.log(status)
            if (status !== 200 ) throw new Error('something has happened')
            const { token } = JSON.parse(body)
            
            return token
        })
        .catch(error => {
            console.error(error)
            throw Error
        })
}