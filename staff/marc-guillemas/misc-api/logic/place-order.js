const { mongo } = require("../data");
const { ObjectId } = mongo;
require('misc-commons/polyfills/string')
const {  errors: { UnexistenceError }} = require('misc-commons')

module.exports = (userId) => {
  
  return mongo
    .connect()
    .then((connection) => {
      users = connection.db().collection("users");
      

      return users.findOne({ _id: ObjectId(userId) });
    })
    .then(user => {
        const {cart , orders = []} = user 
        
        if(!cart) throw UnexistenceError('Dont have products on your cart yet')

        cart.forEach(product => {
            orders.push(product)
        }); 

        users.updateOne({ _id: ObjectId(userId) }, {$unset: {cart: ""}})
        return users.updateOne({ _id: ObjectId(userId) }, { $set: {orders} }, {$unset: {cart: ""}})
        
       
    })
    

    // PAAAL RECUEERDOO PANTERAS

    // .then(({ cart }) => {
    //   const promises = cart.map((item) => {
    //     const { product, quantity } = item;

    //     return products
    //       .findOne({ product: product._id })

    //       .then((product) => {
    //         debugger;

    //         delete product.description;
    //         delete product.url;
    //         product.quantity = quantity;

            
    //       });
    //   });
    //   debugger
    //   return promises;
    // })
    // .then((promises) =>{debugger
    //   Promise.all(promises)}).then(results => results);
};
