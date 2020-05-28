require("../utils/polyfills/string");
require("../utils/polyfills/function");
const { find } = require("../data/users");

module.exports = (id, callback) => {
  String.validate(id);
  Function.validate(callback);

  find({ id }, (error, [user]) => {
    if (error) return callback(error);
    if(!user) return callback (new Error('user dosent exist'))
    
    
    
    delete user.id
    delete user.password
    return callback(null, user);

  });
};
