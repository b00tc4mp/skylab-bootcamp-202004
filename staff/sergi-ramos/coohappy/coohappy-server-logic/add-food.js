require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { models: { User, Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')


module.exports = (foodItem, userId) => {

    String.validate.notVoid(foodItem)
    String.validate.notVoid(userId)

    return (async () => {


        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) })
        if (!cohousing) throw new UnexistenceError(`There is no cohousing with a user with an id ${userId}`)

        const checkFruit = fruit => fruit.name === foodItem

        if (!user.foodList.some(checkFruit)) { user.foodList.push({ name: foodItem, weight: 0.5 }) }
        else {

            for (index in user.foodList) {

                if (foodItem === user.foodList[index].name) {
                    user.foodList[index].weight = user.foodList[index].weight + 0.5
                }
            }
        }

        if (!cohousing.foodList.some(checkFruit)) { cohousing.foodList.push({ name: foodItem, weight: 0.5 }) }
        else {

            for (index in cohousing.foodList) {

                if (foodItem === cohousing.foodList[index].name) {
                    cohousing.foodList[index].weight = cohousing.foodList[index].weight + 0.5
                }
            }
        }

        await user.save()
        await cohousing.save()


    })()
}