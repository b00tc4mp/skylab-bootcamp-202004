require('qrmenu-commons/polyfills/string')
const { models: {Establishment}, mongoose: {ObjectId} } = require('qrmenu-data')
const {errors: {UnexistenceError}} = require('qrmenu-commons')
module.exports = workerId => {
    //TODO review retrieve establishmentId, workerId(owner) i do really need retrieve establishment??
    String.validate.notVoid(workerId)

    return (async() => {
        debugger
        const user = await Establishment.findById(workerId, {__v: 0, dishes: 0, orders: 0, password: 0, staff: 0}).lean()
        if(!user) throw new UnexistenceError(`user with id ${workerId} does not exist`)

        user.id = user._id.toString()

        delete user._id

        return user
    })()
}