const { mongo } = require('misc-data')
require('misc-commons/polyfills/string')

module.exports = (userId => {

    String.validate.notVoid(userId)


    return mongo.connect()
        .then(connection => {
            debugger
            const cart = connection.db().collection('cart')
            return cart.find({ userId })
        })
        .then(items => {
            items = items.toArray()

            return items
        })
        .then(items => {
            let total = 0
            items.forEach(item => {
               const [price] = item.price.split('€')
                total = total + parseInt(price)
            })
            items[items.length] = {total, userId}

            return items
        })
})


