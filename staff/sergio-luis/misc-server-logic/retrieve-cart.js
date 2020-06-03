require('misc-commons/polyfills/string')

const{errors:{UnexistenceError}}= require("misc-commons")

const { mongo } = require('misc-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    const cartProducts = {}
    let price = 0

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({_id: mongo.ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`this ${userId} does not exist`)
                    const{cart}=user
                    
                    if (!cart) throw new UnexistenceError(`cart does not exist`)                    
                    return cart
                    
                    }) 
        })
  
}