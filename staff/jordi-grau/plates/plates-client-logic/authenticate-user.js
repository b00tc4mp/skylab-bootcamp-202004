require('plates-commons/polyfills/string')
const { utils: { Email,call } } = require('plates-commons')
const context  = require('./context')


module.exports = function (email, password){
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
 
    return call(
        'POST',
        `${this.API_URL}/users/auth`,
        `{"email": "${email}", "password": "${password}" }`,
        {'Content-type': 'application/json'}
    )
        
    .then(({status, body}) => {
        if(status === 200) {
            const {token} = JSON.parse(body)

            this.storage.token = token;

            return 
        }

        const { error } = JSON.parse(body)
        throw new Error(error)
    })
    }.bind(context)
