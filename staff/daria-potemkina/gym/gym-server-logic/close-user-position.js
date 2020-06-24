/**
 * Close the user position
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
const { mongoose: { ObjectId }, models: { User, Contract, Price, AccountBalance, Product, Underlying } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { addGuarantee } = require('./helpers')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const contracts = await Contract.find({ user: ObjectId(userId), isValid: true }).populate('trades.price')

        if (!contracts.length) throw new UnexistenceError('user have no current contracts')

        const balances = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

        if (!balances.length) throw new UnexistenceError(`there are no account balance created for user with id ${userId}`)

        const [balance] = balances

        let { guarantee = 0, profitAndLoss = 0 } = balance

        let dateToday = new Date().toString().split(' ').slice(1, 4).join(' ')

        for (let i in contracts) {
            const { product, trades, _id } = contracts[i]

            const _product = await Product.findById(product)

            let { ticker, settlementDate } = _product

            settlementDate = settlementDate.toString().split(' ').slice(1, 4).join(' ')

            if (settlementDate == dateToday) {
                const { productType, contractSize } = _product
                
                dateToday = new Date().toString().split(' ').slice(1, 4)

                dateToday.push('UTC')

                dateToday = dateToday.join(' ')

                if (productType === 'future') {
                    dateToday = new Date().toString().split(' ').slice(1, 4)

                    dateToday.push('UTC')

                    dateToday = dateToday.join(' ')

                    const price = await Price.findOne({ product: ObjectId(product), date: new Date(dateToday) })

                    const { price: _price } = price

                    for (let j in trades) {
                        if (trades[j].type === "Sell")
                            profitAndLoss += ((trades[j].price.price - _price) * contractSize * trades[j].quantity).toFixed(2) * 1

                        else
                            profitAndLoss += ((_price - trades[j].price.price) * contractSize * trades[j].quantity).toFixed(2) * 1
                    }
                } else if (productType === 'option') {
                    const optionUnderlying = await Underlying.findOne({ ticker: ticker })

                    const optionUnderlyingPrice = await Price.findOne({ product: optionUnderlying._id, date: new Date(dateToday) })

                    const { price: __price } = optionUnderlyingPrice

                    for (let j in trades) {
                        const { side, strike } = _product.type
                        if (side === 'call' && trades[j].type === 'Buy') {
                            if (__price > strike)
                                profitAndLoss += ((__price - strike) * contractSize * trades[j].quantity).toFixed(2) * 1

                        } else if (side === 'call' && trades[j].type === 'Sell') {
                            if (__price > strike)
                                profitAndLoss -= ((__price - strike) * contractSize * trades[j].quantity).toFixed(2) * 1
                        } else if (side === 'put' && trades[j].type === 'Buy') {
                            if (strike > __price)
                                profitAndLoss += ((strike - __price) * contractSize * trades[j].quantity).toFixed(2) * 1
                        } else if (side === 'put' && trades[j].type === 'Sell') {
                            if (strike > __price)
                                profitAndLoss -= ((strike - __price) * contractSize * trades[j].quantity).toFixed(2) * 1
                        }
                    }
                }

                await Contract.findByIdAndUpdate(_id, { isValid: false })
            }
        }

        const _contracts = await Contract.find({ user: userId, isValid: true }).populate('product')

        guarantee = addGuarantee(_contracts)

        await AccountBalance.create({ user: userId, date: new Date(), guarantee, profitAndLoss })
    })()
}