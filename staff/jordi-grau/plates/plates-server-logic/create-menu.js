require('plates-commons/polyfills/string')
const {utils: {Email}, errors: {UnexistenceError, DuplicityError}} = require('plates-commons')
const {mongoose, models:{User, Restaurant, Menu, Plate}} = require('plates-data')

module.exports = (userId, restaurantId, plateIds) =>{
    String.validate.notVoid(userId)
    String.validate.notVoid(restaurantId)
    plateIds.forEach(element => String.validate.notVoid(element))

    return (async ()=>{
        
        const user = await User.findById(userId)
            if(!user) throw new UnexistenceError(`user with id ${userId} doesn't exist`)

        const restaurant = await Restaurant.findById(restaurantId)
            if(!restaurant) throw new UnexistenceError(`restaurant with id ${restaurantId} doesn't exist`)
        
        const plates = await Plate.find().where('_id').in(plateIds).exec();
            if(!plateIds.length) throw new UnexistenceError(`plate with id ${plateId} doesn't exist`)

        const newMenu = await Menu.create({plates})

            restaurant.menu = newMenu
    
            await restaurant.save()
            
            return 
}) ()
}

