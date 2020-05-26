require('../utils/polyfills/function')
const Email = require("../utils/email");
require("../utils/polyfills/string");
const { find } = require('../data/users')

module.exports = (email, password, callback) => {
  String.validate.notVoid(email)
  Email.validate(email);
  String.validate.notVoid(password);
  Function.validate(callback)

 find({email}, (error,[user]) =>{
   if (error) return callback(error)

   if (!user) return callback (new Error(`user wihdsasda`))

   if (user.password !== password) return callback(new Error('wrong credentials'))
 
   callback(null, user.id)
 
  })
}  
