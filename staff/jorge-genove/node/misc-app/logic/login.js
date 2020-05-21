const path = require("path");
const fs = require("fs");
const Email = require("../utils/email");
require("../utils/string");

function login(user, callback) {
  const { email, password } = user;

  let matched = false;
  Email.validate(email);
  String.validate.notVoid(password);

  fs.readdir(path.join(__dirname, "..", "data", "users"), (error, files) => {
    if (error) throw error;

    files.forEach((file) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "users", file),
        (error, data) => {
          if (error) throw error;

          data = JSON.parse(data);

          if (data.email === email && password === data.password) {
            matched = true;
            callback(null, matched);
          } else matched = false;
          callback(null, matched);
        }
      );
    });
  });
}
module.exports = login;
