require("../utils/polyfills/string");
const fs = require("fs");
const path = require("path");
const uid = require("../utils/uid");
const Email = require("../utils/email");
require("../utils/polyfills/function");
require("../utils/polyfills/json");
const { find } = require("../data/users");

module.exports = (name, surname, email, password, callback) => {
  String.validate.notVoid(name);
  String.validate.notVoid(surname);
  String.validate.notVoid(email)
  Email.validate(email);
  String.validate.lengthGreaterEqualThan(password, 8);
 Function.validate(callback); 

  const data = path.join(__dirname, "..", "data");
  debugger
  find({ email }, (error, [user]) => {
    if (error) return callback(error);

    if (user) return callback(new Error(`user with e-mail ${email}, already exist`));

    const id = uid();

    const newUser = { id, name, surname, email, password };

    fs.writeFile(path.join(data, "users", `${id}.json`),
      JSON.prettify(newUser),
      (error) => {
        if (error) return callback(error);

        callback(null, id);
      });
  });
};
