require('qrmenu-commons/pollyfills/string')
const { models: {Establishment}, mongoose: {ObjectId} } = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')
module.exports = userId => {
    
    String.validate.notVoid(userId)

    return (async() => {
        debugger
        const user = await Establishment.findOne({_id: ObjectId(userId)}, {__v: 0, dishes: 0, orders: 0, password: 0, staff: 0}).lean()
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        user.id = user._id.toString()

        delete user._id

        return user
    })()
}