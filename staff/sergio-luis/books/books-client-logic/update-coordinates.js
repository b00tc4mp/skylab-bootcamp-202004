/**
 * Update Coordinates.
 * 
 * @param {number} latitude latitude coordinate.  
 * @param {number} longitude longitude coordinate.  

 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return No return nothig if successfully request.
 *
 */

require('books-commons/polyfills/number')
const { utils: {call} } = require('books-commons')
const context = require('./context');

module.exports = function (latitude,longitude){
    Number.validate(latitude)
    Number.validate(longitude)
    
    return (async() => {
        const token = await this.storage.getItem('token')
        const resp = await call(
            'PATCH',
            `${this.API_URL}/users/coordinates`,
            `{"latitude": "${latitude}", "longitude": "${longitude}"}`,
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
    
        const {status,body} = resp

        if(status===200) return 
        else{
            const { error } = JSON.parse(body)

            throw new Error(error)
        }

    })()
}.bind(context)