require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: userId }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        
        if(!user.card) throw new UnexistenceError('user does not have a card added')

        delete user._id
        delete user.name
        delete user.surname
        delete user.email
        delete user.password
        delete user.products
        delete user.guarantee
        delete user.__v

        return user.card

    })()
}