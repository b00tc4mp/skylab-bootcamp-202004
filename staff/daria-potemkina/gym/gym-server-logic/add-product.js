require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { mongoose, models: { User, Contract, Product, Price, AccountBalance } } = require('gym-data')
const { ObjectId } = mongoose

const { errors: { UnexistenceError } } = require('gym-commons')
const { round } = Math

module.exports = (userId, productId, priceId, side, quantity) => {
    String.validate.notVoid(priceId)
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    String.validate.notVoid(side)
    Number.validate.integer(quantity)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const { card: { number, holder, expirationDate, cvv } } = user

        if (!number && !holder && !expirationDate && !cvv) throw new UnexistenceError('user does not have a card added')

        let guarantee = 0,
            profitAndLoss = 0

        const product = await Product.findById(productId)

        if (!product) throw new UnexistenceError(`product with id ${productId} is not exist`)

        const { price } = await Price.findById(priceId)

        if (product.productType === 'future') {
            const { contractSize } = product

            guarantee = round(quantity * price * contractSize * 0.1 * 100) / 100

            await AccountBalance.create({ user: userId, date: new Date(), guarantee, profitAndLoss })
        }

        if (product.productType === 'option') {
            const { contractSize: _contractSize, type: { strike } } = product

            guarantee = round(_contractSize * strike * quantity * 0.1 * 100) / 100

            if (side === 'Buy') {
                profitAndLoss = round(quantity * _contractSize * price * 100 * (-1)) / 100

            } else {
                profitAndLoss = round(quantity * _contractSize * price * 100) / 100
            }

            await AccountBalance.create({ user: userId, date: new Date(), guarantee, profitAndLoss }) 
        }

        let contract = await Contract.findOne({ product: ObjectId(productId) })

        if (!contract)
            contract = await Contract.create({ user: ObjectId(userId), product: ObjectId(productId) })

        contract.trades.push({ price: ObjectId(priceId), type: side, quantity })

        await contract.save()
    })()
}