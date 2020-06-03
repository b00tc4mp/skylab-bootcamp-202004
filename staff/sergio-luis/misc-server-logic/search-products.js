require('misc-commons/polyfills/string')

const{errors:{UnexistenceError}}= require("misc-commons")

const { mongo } = require('misc-data')

module.exports = (userId, query) => {
    String.validate.notVoid(userId)
   
    return mongo.connect() 
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({_id: mongo.ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`this ${userId} does not exist`)

                    const products = connection.db().collection('products')
                   
                    return products.find().toArray()
                        .then(_products => {
                           
                            if (query) _products = _products.filter(product =>product.name.includes(query.toLowerCase()))
                
                            return _products
                        })                 
                })  
            
        })
    }