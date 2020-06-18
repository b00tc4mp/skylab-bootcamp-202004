require('plates-commons/polyfills/string')
const { models: { User}} = require('plates-data')
const { utils: { Email,call } } = require('plates-commons')
const brcypt = require('bcrypt')
const context  = require('./context')


module.exports = function(email, password){
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
debugger
    return call(
        'POST',
        `${this.API_URL}/users/auth`,
        `{"email": "${email}", "password": "${password}" }`,
        {'Content-type': 'application/json'}
    )
        
    .then(({status, body}) => {
        if(status === 200) return
    
        const { error } = JSON.parse(body)
    
        throw new Error(error)
    })

        
    }.bind(context)
