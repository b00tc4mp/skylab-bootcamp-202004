require('plates-commons/polyfills/string')
const {errors: {UnexistenceError}} = require('plates-commons')
const {mongoose, models: {User, Dish}} = require('plates-data')

module.exports = (userId) =>{
    String.validate.notVoid(userId)
    
    return( async() => {  
        const validUser = await User.findById(userId)
        if(!validUser) throw new UnexistenceError(`User with id: ${userId} does not exist`)

        const followedDishes = await Dish.find({followers: userId})
        return followedDishes
    }) ()
}