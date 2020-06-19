require('plates-commons/polyfills/string')
const { errors: {UnexistenceError}} = require('plates-commons')
const {models:{User, Restaurant, Dish}} = require('plates-data')
/**
 * function creates a menu 
 * @param {string} userId data needed to identificate user
 * @param {string} restaurantId data needed to identificate user's restaurant
 * @param {string} dishesIds data needed to insert inside the menu
 * 
 * @throws {error} UnexistenceError if userId doesn't exist in db
 * @throws {error} UnexistenceError if restaurantId doesn't exist in db
 * @throws {error} UnexistenceError if dishesIds doesn't exist in db
 */
module.exports = (userId, restaurantId, dishesIds) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(restaurantId)
    

    return (async ()=>{
        const user = await User.findById(userId)
        if(!user) throw new UnexistenceError(`user with id ${userId} doesn't exist`)

        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant) throw new UnexistenceError(`restaurant with id ${restaurantId} doesn't exist`)
        
       
        const _dishes = await Dish.findById(dishesIds)
        if(!_dishes) throw new UnexistenceError(`dish with id ${_dishes} doesn't exist`)

        const newMenu = await  Restaurant.findByIdAndUpdate(restaurantId, {$push: {dishes: dishesIds} }) 
            
        return 
    })()
}

