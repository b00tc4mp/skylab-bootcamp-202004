require('takemytask-commons/polyfills/string')
const { utils: { Email, call } } = require('takemytask-commons')
const context = require('./context')

module.exports = function (email, password, callback) {
    Email.validate(email)

    String.validate.notVoid(password)

    return call('POST', `${this.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
            .then(({status, body}) => {
                if (status === 200){

                    const {token} = JSON.parse(body)
                    return token

                }else {

                    const { error } = JSON.parse(body)
                    throw new Error (error)
                }
            })
    
}.bind(context)