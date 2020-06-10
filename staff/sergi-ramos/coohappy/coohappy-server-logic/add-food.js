require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { DuplicityError, UnexistenceError } } = require('coohappy-commons')
const { models: { User, Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')


module.exports = (foodItem, userId) => {

    String.validate.notVoid(foodItem)

    return (async () => {
        

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)
       user.foodList.push({name: foodItem, weight: 0.5})
       for(index in user.foodList){
           for(key in user.foodList[index]){
               if(foodItem === foodList[index][key]){
                   foodList[index].weight =+ 0.5
               }
           }
       }
       user.save()
        const cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) })
        if (!cohousing) throw new UnexistenceError(`There is no cohousing with a user with an id ${userId}`)
       
    })()
}