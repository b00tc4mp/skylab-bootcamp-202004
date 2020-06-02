// require('../utils/polyfills/string')

// const {UnexistenceError, CredentialsError} = require('../errors');

// const { mongo } = require('../data')

// module.exports = (userId, cartId)=>{
//     String.validate.notVoid(userId)
//     String.validate.notVoid(cartId)

//     return mongo.connect()
//         .then(connection => {
//             const users = connection.db().collection('users')

//             return users.findOne({_id: mongo.ObjectId(userId) })
//                 .then(user => {
//                     if (!user) throw new UnexistenceError(`this ${userId} does not exist`)

//                     const carts = connection.db().collection('carts')

//                     return carts.findOne({user: userId})
//                         .then(cart => {
//                             if (!cart) throw new UnexistenceError(`cart does not exist`)

//                             if (cart._id.toString() !== cartId) throw new CredentialsError(`cart with this cart id does not exist`)

//                             delete cart.user
//                             delete cart._id

//                             let date = new Date()
//                             cart.date = date.toISOString()

//                             const orders = connection.db().collection('orders')
//                             // add to histoy
//                             return orders.findOne({user: userId})
//                                 .then(order => {
//                                     if (!order) {
//                                         return orders.insertOne({'history': [cart], 'user' : userId})
//                                     }
//                                     else {
//                                         return orders.updateOne({user: userId},{
//                                             $push : {'history': { $each: [cart] } }
//                                         })
//                                     }
//                                 })

//                                 .then(()=>carts.remove({'user': userId}))
                              
//                         })   
                           
//                 })          
//     })
// }


// const { mongo } = require("../data");
// const { ObjectId } = mongo;
// require("../utils/polyfills/string");

// module.exports = (userId) => {
  
//   return mongo
//     .connect()
//     .then((connection) => {
//       users = connection.db().collection("users");
      

//       return users.findOne({ _id: ObjectId(userId) });
//     })
//     .then(user => {
//         const {cart , orders = []} = user 
        
//         if(!cart) throw Error

//         cart.forEach(product => {
//             orders.push(product)
//         }); 

//         users.updateOne({ _id: ObjectId(userId) }, {$unset: {cart: ""}})
//         return users.updateOne({ _id: ObjectId(userId) }, { $set: {orders} }, {$unset: {cart: ""}})
        
       
//     })


require('misc-commons/polyfills/string')
const { UnexistanceError} = require('../errors')
const {mongo} = require('misc-data')
const { ObjectId } = mongo

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
    .then(connection =>{
        const users = connection.db().collection('users')
        const orders = connection.db().collection('orders')

        return users.findOne({_id: ObjectId(userId)})

        .then(user => {
            if (!user) throw new UnexistanceError(`user with id ${userId} does not exist`)

            const order = {order: user.cart}
            delete user.cart

            return orders.insertOne(order)
        })
        .then(() => {})
    })
}