/**
 * Profit and loss calculation
 * 
 * @param {string} userId the user id
 * 
 * @returns {Promise} if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user, contract, or balance do not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */

require('gym-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User, Contract, Price, AccountBalance, Product } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { round } = Math
const { addGuarantee } = require('./helpers')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const contracts = await Contract.find({ user: ObjectId(userId), isValid: true })

        if (!contracts.length) throw new UnexistenceError(`user with id ${userId} have no current contracts`)

        const balances = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

        if (!balances.length) throw new UnexistenceError(`there are no account balance created for user with id ${userId}`)

        const [balance] = balances

        let { guarantee = 0, profitAndLoss = 0 } = balance

        let dateToday = new Date().toString().split(' ').slice(1, 4).join(' ')

        let isAtLeastOneFuture = false

        for (let i in contracts) {
            const { product, trades } = contracts[i]

            const _product = await Product.findById(product)

            const { settlementDate, productType, contractSize } = _product

            if (settlementDate !== dateToday) {

                const prices = await Price.find({ product: ObjectId(product) }).sort({ date: -1 })

                const [_price, __price] = prices

                if (productType === 'future') {
                    isAtLeastOneFuture = true

                    for (let j in trades) {
                        if (trades[j].type === "Sell")
                            profitAndLoss += round((__price.price - _price.price) * contractSize * trades[j].quantity * 100 * (-1)) / 100

                        else
                            profitAndLoss += round((__price.price - _price.price) * contractSize * trades[j].quantity * 100) / 100

                    }

                }
            }
        }

        if (isAtLeastOneFuture) {
            const _contracts = await Contract.find({ user: userId, isValid: true }).populate('product')

            guarantee = addGuarantee(_contracts)

            await AccountBalance.create({ user: userId, date: new Date(), guarantee, profitAndLoss })
        }
    })()
}