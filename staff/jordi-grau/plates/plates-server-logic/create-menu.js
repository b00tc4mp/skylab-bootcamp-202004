require('plates-commons/polyfills/string')
const {utils: {Email}, errors: {UnexistenceError, DuplicityError}} = require('plates-commons')
const {mongoose, models:{User, Restaurant, Menu, Dish}} = require('plates-data')
module.exports = (userId, restaurantId, dishesIds) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(restaurantId)
    // dishesIds.forEach(element => String.validate.notVoid(element))

    return (async ()=>{
        
        const user = await User.findById(userId)
            if(!user) throw new UnexistenceError(`user with id ${userId} doesn't exist`)

        const restaurant = await Restaurant.findById(restaurantId)
            if(!restaurant) throw new UnexistenceError(`restaurant with id ${restaurantId} doesn't exist`)
        
       //const _dishes = //await Dish.find().where('_id').in(dishesIds).exec();
        const _dishes = await Dish.findById(dishesIds)
            if(!_dishes) throw new UnexistenceError(`dish with id ${_dishes} doesn't exist`)

        const newMenu = await  Restaurant.findByIdAndUpdate(restaurantId, {$push: {dishes: dishesIds} }) //Menu.create({dishes})

            //restaurant.dishes = newMenu
    
           // await restaurant.save()
            
            return 
}) ()
}

