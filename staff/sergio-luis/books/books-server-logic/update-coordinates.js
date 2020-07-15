/**
 * Update Coordinates.
 * 
 * @param {string} userId take by token.  
 * @param {number} latitude latitude coordinate.  
 * @param {number} longitude longitude coordinate.  

 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return No return nothig if successfully request.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/number')

const { errors: { UnexistenceError} } = require('books-commons')
const { models: { User } } = require('books-data')

module.exports = (userId,latitude,longitude) => {

    String.validate.notVoid(userId)
    Number.validate(latitude)
    Number.validate(longitude)
    
    return (async() => {
     
        const user = await User.findById(userId) 

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        gpsCoordinates ={latitude,longitude}

        await User.findByIdAndUpdate(userId, { $set: { gpsCoordinates } })
    })()
}