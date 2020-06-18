require('plates-commons/polyfills/string')
const {models:{User, Restaurant}} = require('plates-data')
const { utils: { Email, call }} = require('plates-commons')
const bcrypt = require('bcrypt')
const context = require('./context')

module.exports = function(userId) {
    String.validate.notVoid(userId)

    return call('GET',`${API_URL}/users`,undefined, {'Authorization': `Bearer ${token}`})
        .then(({status, body}) =>{
            if(status === 200) { 
                return JSON.parse(body)
            }else{
                const {error} = JSON.parse(body)
                throw new Error(error)
                }
        })
    
}