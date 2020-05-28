require("../utils/string");
require("../utils/function");
const { find } = require("../data/users");
const Email = require("../utils/email");
require("../utils/function");
const fs = require("fs");
const path = require("path");

module.exports = (email, password, callback) => {
  Email.validate(email);
  Function.validate(callback);
  String.validate.notVoid(password)

  find({ email, password }, (error, [user]) => {
    if (error) return callback (error); //TODO

    if (!user) return callback(new Error("user dosent exist"));

    if (user) {debugger
      const { id } = user;
      fs.unlink(path.join(__dirname,'..','data','users', `${id}.json`), error => { 
        if(error) return callback (error)
      });
    }
  });
};
