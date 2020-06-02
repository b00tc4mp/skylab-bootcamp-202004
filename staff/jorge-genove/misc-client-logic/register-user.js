require("../misc-commons/polyfills/string");
const { Email } = require("../misc-commons/utils");
const {utils: { call }} = require("misc-commons");
global.XMLHttpRequest = require('xhr2')

// const {errors: { handleError }} = require('misc-commons')

module.exports = (name, surname, email, password) => {
  String.validate.notVoid(name);
  String.validate.notVoid(surname);

  Email.validate(email);
  Email.isEmail(email);

  String.validate.notVoid(password);
  String.validate.lengthGreaterEqualThan(password, 8);

 return call('POST','http://localhost:8080/users',  `{"name" : "${name}", "surname" : "${surname}", "email" : "${email}", "password" : "${password}" }`,  {'Content-Type': 'application/json' }
   )
    .then(({status, body}) => console.log(status))
}