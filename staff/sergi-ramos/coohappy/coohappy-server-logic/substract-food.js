require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { models: { User, Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')

/**
 * Substract food from food list.
 * 
 * @param {string} foodItem Food name. 
 * @param {string} userId id from current user. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = (foodItem, userId) => {

    String.validate.notVoid(foodItem)
    String.validate.notVoid(userId)

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) })
        if (!cohousing) throw new UnexistenceError(`There is no cohousing with a user with an id ${userId}`)

        const checkFruit = fruit => fruit.name === foodItem
        
        if(user.foodList.some(checkFruit)){ 

            for (index in user.foodList) {
    
                if (foodItem === user.foodList[index].name) {
                    if(user.foodList[index].weight === 0.5) {
                        user.foodList.splice(index,1)
                    }
                    else user.foodList[index].weight = user.foodList[index].weight - 0.5
                }
            }
         }else throw new UnexistenceError(`you can not substract ${foodItem}, you still don't have it on the list`)

         if(cohousing.foodList.some(checkFruit)){ 

            for (index in cohousing.foodList) {
    
                if (foodItem === cohousing.foodList[index].name) {
                    if(cohousing.foodList[index].weight === 0.5) {
                        cohousing.foodList.splice(index,1)
                    }
                    else cohousing.foodList[index].weight = cohousing.foodList[index].weight - 0.5
                }
            }
         }else throw new UnexistenceError(`you can not substract ${foodItem}, you still don't have it on the list`)
             
        await user.save()
        await cohousing.save()

    })()
}