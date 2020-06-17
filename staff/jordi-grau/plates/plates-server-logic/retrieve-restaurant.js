require('plates-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Restaurant } } = require('plates-data')
const restaurant = require('plates-data/models/schemas/restaurant')

module.exports = restaurantId => {
    String.validate.notVoid(restaurantId)

    return Restaurant.findOne({ _id: ObjectId(restaurantId) }).lean()
        .then(restaurant => {
            if (!restaurant) throw new Error(`restaurant with id ${restaurantId} does not exist`)

            restaurant.id = restaurant._id.toString()

            delete restaurant._id
           

            return restaurant
        })
}