require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { models: { User, Future, Option } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { round } = Math

module.exports = (userId, productId, side, quantity) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    String.validate.notVoid(side)
    Number.validate.integer(quantity)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} is not exist`)

        const { card: { number, holder, expirationDate, cvv } } = user

        if (!number && !holder && !expirationDate && !cvv) throw new UnexistenceError('user does not have a card added')

        let { balance = {}, products } = user

        let { guarantee = 0, profitAndLoss = 0 } = balance

        const index = products.findIndex(item => item.product.toString() === productId)

        let quantitySold = 0, quantityPurchased = 0

        if (index !== -1) {
            quantitySold = products[index].quantitySold
            quantityPurchased = products[index].quantityPurchased
        }

        const future = await Future.findById(productId)
        const option = await Option.findById(productId)

        if (!future && !option) throw new UnexistenceError(`product with id ${productId} is not exist`)

        if (future) {
            const { contractSize, prices } = future

            const [{ price }] = prices

            guarantee += round(quantity * price * contractSize * 0.1 * 100) / 100

            if (side === 'buy') quantityPurchased += quantity
            else quantitySold += quantity
        }

        if (option) {
            const { contractSize: _contractSize, strike: _strike, prices: _prices } = option

            guarantee += round(_contractSize * _strike * quantity * 0.1 * 100) / 100

            const [{ price: _price }] = _prices

            if (side === 'buy') {
                profitAndLoss -= round(quantity * _contractSize * _price * 100) / 100
                quantityPurchased += quantity
            } else {
                profitAndLoss += round(quantity * _contractSize * _price * 100) / 100
                quantitySold += quantity
            }
        }

        balance = { guarantee, profitAndLoss }

        if (side === 'buy') {
            const purchasedProduct = { product: productId, quantitySold, quantityPurchased: quantity }
            if (index === -1) {
                await User.updateOne({ _id: userId }, { $push: { products: purchasedProduct } })
            } else {
                await User.updateOne({ _id: userId }, { $set: { products: purchasedProduct, $position: index } })
            }
            await User.updateOne({ _id: userId }, { $set: { balance } })
        }

        if (side === 'sell') {
            const soldProduct = { product: productId, quantitySold, quantityPurchased }
            if (index === -1) {
                await User.updateOne({ _id: userId }, { $push: { products: soldProduct } })
            } else {
                await User.updateOne({ _id: userId }, { $set: { products: soldProduct, $position: index } })
            }
            await User.updateOne({ _id: userId }, { $set: { balance } })
        }
    })()
}