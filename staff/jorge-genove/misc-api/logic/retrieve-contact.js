require("../utils/polyfills/string");
require("../utils/polyfills/function");
const { contacts: { find } } = require("../data")

module.exports = (id, callback) => {
  String.validate(id);
  Function.validate(callback);

  find({ id }, (error, [user]) => {
    if (error) return callback(error);
    if(!user) return callback (new Error('contact dosent exist'))
    
    
    
    
    return callback(null, user);

  });
};