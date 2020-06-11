require('gym-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User, Contract, Price, AccountBalance, Product } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { round } = Math

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const contracts = await Contract.find({ user: ObjectId(userId) }).populate('trades.price')

        if (!contracts) throw new UnexistenceError('user have no current contracts')

        const balances = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 })

        if (!balances.length) throw new UnexistenceError(`there are no account balance created for user with id ${userId}`)

        const [balance] = balances

        let { guarantee = 0, profitAndLoss = 0 } = balance

        const dateToday = new Date().toString().split(' ').slice(1, 4).join(' ')

        for (let i in contracts) {
            const { product, trades, _id } = contracts[i]

            const _product = await Product.findById(product)

            const { settlementDate } = _product

            if (settlementDate !== dateToday) {
                throw new Error("should not be executed due to not reaching expiration date")
            }

            const price = await Price.findOne({ product: ObjectId(product), date: dateToday })

            const { price: _price } = price

            const { productType, contractSize } = _product

            if (productType === 'future') {
                for (let j in trades) {
                    if (trades[j].type === "Sell")
                        profitAndLoss += round((trades[j].price.price - _price) * contractSize * trades[j].quantity * 100) / 100

                    else
                        profitAndLoss += round((_price - trades[j].price.price) * contractSize * trades[j].quantity * 100) / 100

                }
            } else if (productType === 'option') {
                for (let j in trades) {
                    const { type: { side, strike } } = product
                    if (side === 'call' && trades[j].type === 'Buy') {
                        if (_price > strike)
                            profitAndLoss += round((_price - strike) * contractSize * trades[j].quantity * 100) / 100

                    } else if (side === 'call' && trades[j].type === 'Sell') {
                        if (_price > strike)
                            profitAndLoss -= round((_price - strike) * contractSize * trades[j].quantity * 100) / 100
                    } else if (side === 'put' && trades[j].type === 'Buy') {
                        if (strike > _price)
                            profitAndLoss += round((strike - _price) * contractSize * trades[j].quantity * 100) / 100
                    } else if (side === 'put' && trades[j].type === 'Sell') {
                        if (strike > _price)
                            profitAndLoss -= round((strike - _price) * contractSize * trades[j].quantity * 100) / 100
                    }
                }
            }

            await Contract.findByIdAndDelete(_id)
        }
        await AccountBalance.create({ user: userId, date: dateToday, guarantee, profitAndLoss })
    })()
}