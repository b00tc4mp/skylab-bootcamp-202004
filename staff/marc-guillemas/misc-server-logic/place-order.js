require("misc-commons/polyfills/string");
const { errors: { UnexistenceError } } = require("misc-commons");
const {  model : { User, Order } } = require("misc-data");

module.exports = (userId) => {
  String.validate(userId)

  return (async () => {
    const user = await User.findById(userId).populate('cart.product');
    debugger
    const { cart = [], orders = [] } = user;
    
    if (!cart.length) throw new UnexistenceError("Dont have products on your cart yet ");

    const amount = user.cart.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0)

    orders.push(new Order( {products: user.cart, amount, date: new Date}))

    await User.findByIdAndUpdate(userId, { $set: { cart: [], orders} });
    
  })();
};

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
