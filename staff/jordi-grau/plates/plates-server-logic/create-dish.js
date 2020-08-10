require('plates-commons/polyfills/string')
const { UnexistenceError, DuplicityError } = require('plates-commons/errors')
const { models: { Restaurant, Dish } } = require('plates-data')


module.exports = ( restaurantId, name, position, tags, price )=> {
    String.validate.notVoid(restaurantId)
    String.validate.notVoid(name)
    String.validate.notVoid(position)

    return ( async() => {
        const restaurant = Restaurant.findById(restaurantId)
        if(!restaurant) throw new UnexistenceError(`Restaurant with id ${restaurantId} does not exist`)

        const dish = await Dish.findOne({restaurantId, name, position})
        if(dish) throw new DuplicityError(`Dish with name ${name}, and position ${position} in restaurant with id ${restaurantId} already exists`)

        const newDish = await Dish.create({restaurantId, name, position, tags, price})

        const dishesId = newDish._id

        await Restaurant.findByIdAndUpdate(restaurantId, {$addToSet: {dishes: dishesId}})
       
        return
    })()
}