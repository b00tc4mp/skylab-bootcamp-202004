/**
 * Calculate Distance Book.
 * 
 * @param {string} actualUserId take by token.  
 * @param {string} newUserId new actualUserId.  
 * @param {string} bookId bookId.  
 *
 * @throws {UnexistenceError} if don`t find userId or the latitude/longitude in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return  no return nothing if success.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User, Book } } = require('books-data')

module.exports = (userId, secondUserId, bookId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(secondUserId)
    String.validate.notVoid(bookId)

    if(userId === secondUserId) throw new Error('you can`t calculate the distance with yourself')
    
    return (async() => {
        const [user, secondUser, book] = await Promise.all([
            User.findById(userId),
            User.findById(secondUserId),
            Book.findById(bookId)
        ])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        if (!secondUser) throw new UnexistenceError(`user with id ${secondUserId} does not exist`);
        if (!book) throw new UnexistenceError(`book with id ${bookId} does not exist`);

        const { latitude: lat1, longitude: lon1 } = user.gpsCoordinates
        const { latitude: lat2, longitude: lon2 } = secondUser.gpsCoordinates

        if (!lat1 || !lon1) throw new UnexistenceError(`user with id ${userId} does have gps coordinates`);
        if (!lat2 || !lon2) throw new UnexistenceError(`user with id ${secondUserId} does have gps coordinates`);

        const R = 6371e3; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const travelKm = ((R * c) / 1000).toFixed(1) //in Km
     
        await  Book.findByIdAndUpdate(bookId, { $inc: { travelKm } }) 
    
    })()
}
