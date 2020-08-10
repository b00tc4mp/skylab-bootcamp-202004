require('plates-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Restaurant } } = require('plates-data')
const restaurant = require('plates-data/models/schemas/restaurant')
const {errors: {UnexistenceError}} = require('plates-commons')


/**
 * functions sends restaurantId and returns restaurant as an object.
 * @param {string} restaurantId data required to find correct document in db.
 * 
 * @throws error if restaurantId does not exist in db
 */
module.exports = restaurantId => {
    String.validate.notVoid(restaurantId)
    
    return Restaurant.findOne({ _id: ObjectId(restaurantId) })
        .populate('dishes', 'name tags')
        .lean()
        .then(restaurant => {
            
            if (!restaurant) throw new UnexistenceError(`restaurant with id ${restaurantId} does not exist`)

            restaurant.id = restaurant._id.toString()

            delete restaurant._id
           
            return restaurant
        })
}