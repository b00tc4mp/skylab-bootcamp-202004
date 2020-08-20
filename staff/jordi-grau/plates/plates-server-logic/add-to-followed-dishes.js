require('plates-commons/polyfills/string')
const {errors: { UnexistenceError, DuplicityError, ValueError }} = require('plates-commons')
const { mongoose , models: { User, Dish }} = require('plates-data')


module.exports = (dishId, userId) => {
    String.validate.notVoid(dishId)
    String.validate.notVoid(userId)

    return ( async() => {
    const dish = await Dish.findById(dishId)
    if(!dish) throw new UnexistenceError(`Dish withd id: ${dishId} does not exist`)

    const user = await User.findById(userId)
    if(!user) throw new UnexistenceError(`User with id: ${userId} does not exist`)

    const alreadyFollowed = await Dish.find({_id: dishId ,followers: userId})
    if(alreadyFollowed.length!==0) throw new DuplicityError(`User with id: ${userId} already follows dish with id: ${dishId}`)

    await Dish.findByIdAndUpdate(dishId, {$addToSet: {followers: userId}})
    
    return
    }) ()
}