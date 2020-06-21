require('gym-commons/polyfills/string')
const { models: { User, Contract } } = require('gym-data')

const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    const GUARANTEE = 0.1

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const contracts = await Contract.find({ user: userId, isValid: true }).populate('product')

        let nominal = 0

        if (!contracts.length) return nominal

        for (let item in contracts) {
            nominal += contracts[item].trades.reduce((accum, trade) => accum + trade.quantity, 0) * contracts[item].product.contractSize
        }
        return (nominal * GUARANTEE).toFixed(2) * 1
    })()
}
