require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = (userId, number, holder, expirationDate, cvv) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(number)
    String.validate.notVoid(holder)
    if(expirationDate instanceof Date === false) throw new TypeError(`${expirationDate} is not a date`)
    String.validate.notVoid(cvv)

    return (async () => {
        const user = await User.findOne({ _id: userId })

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        
        const card = { number, holder, expirationDate, cvv }

        await User.updateOne({ _id: userId }, { $set: { card } })

    })()
}