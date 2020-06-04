require('misc-commons/polyfills/string')
const {  errors: { UnexistenceError }} = require('misc-commons')
const {model: {User, Order,Product}, mongoose} = require('misc-data')

module.exports = (userId) => {
  // String.validate(userId)
  debugger
  return User.findById(userId)
    .then(user => {
      debugger
        const {cart , orders = []} = user 
        
        if(!cart) throw UnexistenceError('Dont have products on your cart yet 🤡')

        cart.forEach(product => {
            orders.push(product)
        }); 

        //orders []
        //cart==> orders
        //orders []1,p2
        //Orden (orders) => orderId

        const {id: orderId} = Order.create({ orders });        
        return User.findByIdAndUpdate(userId, {$set: {cart: []},  $addToSet: {orderId} })
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
