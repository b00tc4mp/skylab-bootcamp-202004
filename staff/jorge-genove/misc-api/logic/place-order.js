const { mongo } = require('../data')
const { ObjectId } = mongo
require('../utils/polyfills/string')



module.exports = (userId) => {
    let users;products,product,quantity 

    return mongo.connect()
        .then(connection => {
            users = connection.db().collection('users')
            products = connection.db().collection('products')

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(({ cart }) => {
            product = cart.forEach(item => {
                item._id
                item.quantity
                { item: { _id, quantity } }
                return products.findOne({ _id })
                    .then(product => {
                        delete product.description
                        delete product.url
                        product.push(quantity)
                        return product
                    })

            })
        })        
}