/**
 * Retrieve coordinates.
 * 
 * @param {string} UserId take by token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base and if dont have latitude or longitude.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {object} return a object with latitude and longitude parametres of userId.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User} } = require('books-data')



module.exports = (userId) => {
    String.validate.notVoid(userId)
    
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        
        
        const {latitude,longitude} = user.gpsCoordinates
        if(!latitude || !longitude)throw new UnexistenceError("the user don`t have gps coordinates");
        
        delete user.gpsCoordinates.__v

         return user.gpsCoordinates
    })()
}