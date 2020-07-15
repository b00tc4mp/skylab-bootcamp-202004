/**
 * Add score.
 * 

 * @param {string} recievedPointUserId a userId how recived points.  
 * @param {Number} points points 0-5.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} if you want a share a book and it not yours.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return  no return nothing if success.
 *
 */

require('books-commons/polyfills/number')
require('books-commons/polyfills/string')
const { utils:{call} } = require('books-commons')
const context = require('./context')

module.exports = function (recievedPointUserId, points){
    String.validate.notVoid(recievedPointUserId)
    Number.validate.positive(points)
    
    return (async()=>{
        const token = await this.storage.getItem('token')
        const resp = await call(
            'PATCH',
            `${this.API_URL}/books/score/add`,
            JSON.stringify({recievedPointUserId, points}),
            { 'Content-type': 'application/json' , 'Authorization': `Bearer ${token}` })

            const {status,body} = resp
            if (status === 200) return 
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            } 
    })()
}.bind(context)