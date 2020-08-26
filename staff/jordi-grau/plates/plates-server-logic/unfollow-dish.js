require('plates-commons/polyfills/string')
const {errors: { UnexistenceError }} = require('plates-commons')
const {mongoose, models: { User, Dish }} = require('plates-data')

module.exports =  (dishId, userId)=>{
    String.validate.notVoid(dishId)
    String.validate.notVoid(userId)

    return( async() => {

        const verifiedDishId = await Dish.findById(dishId)
        if(!verifiedDishId) throw new UnexistenceError(`dish with id: ${dishId} does not exist`)

        const verifiedUserId = await User.findById(userId)
        if(!verifiedUserId) throw new UnexistenceError(`user with id: ${userId} does not exist`)

        const followedDish = await Dish.find({_id: dishId, followers: userId})
        if(followedDish.length === 0) throw new UnexistenceError(`user with id: ${userId} does not follow dish with id: ${dishId}`)

        const data = await Dish.findOne({_id: dishId, followers: userId})
        const index = data.followers.indexOf(userId)
        const newFollowers = data.followers.splice(index, 1)

        await Dish.findByIdAndUpdate( dishId, {$addToSet: { followers: newFollowers }})

        return 
    }) ()
}