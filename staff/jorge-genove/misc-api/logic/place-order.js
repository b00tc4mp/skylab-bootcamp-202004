const { mongo } = require("../data");
const { ObjectId } = mongo;
require("../utils/polyfills/string");

module.exports = (userId) => {
  
  return mongo
    .connect()
    .then((connection) => {
      users = connection.db().collection("users");
      

      return users.findOne({ _id: ObjectId(userId) });
    })
    .then(user => {
        const {cart , orders = []} = user 
        
        if(!cart) throw Error

        cart.forEach(product => {
            orders.push(product)
        }); 

        users.updateOne({ _id: ObjectId(userId) }, {$unset: {cart: ""}})
        return users.updateOne({ _id: ObjectId(userId) }, { $set: {orders} }, {$unset: {cart: ""}})
        
       
    })
    
}