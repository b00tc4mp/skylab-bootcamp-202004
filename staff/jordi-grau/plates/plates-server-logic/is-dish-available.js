require('plates-commons/polyfills/string')
const { mongoose, models: { Dish }} = require('plates-data')
const { errors: { DuplicityError, UnexistenceError, VoidError}} = require('plates-commons')

module.exports = (dishId) =>{
    String.validate.notVoid(dishId)

    return( async() =>{
        const dish = await Dish.findById(dishId)
        if(!dish) throw new UnexistenceError(`dish with id: ${dishId} does not exist`)

        return dish.available
    }) ()
}