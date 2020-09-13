require('plates-commons/polyfills/string')
const { mongoose, models: { Restaurant, Dish}} = require('plates-data')
const { errors: { DuplicityError, UnexistenceError, VoidError}} = require('plates-commons')

module.exports = (dishId) =>{
    String.validate.notVoid(dishId)

    return( async() =>{

        let dish = await Dish.findById(dishId)
        if(!dish) throw new UnexistenceError(`dish with id: ${dishId} does not exist`)

        if(dish.available === false) throw new VoidError(`dish with id: ${dishId} is already unavailable`)

        dish = await Dish.findByIdAndUpdate(dishId, {$set: { available: false}})
        
        return dish
    }) ()
}