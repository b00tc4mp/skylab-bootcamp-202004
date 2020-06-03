require("../misc-commons/polyfills/string");
const { Email } = require("../misc-commons/utils");
const {utils: { call }} = require("misc-commons");
const {errors: { handleError }} = require('misc-commons')

module.exports = (name, surname, email, password) => {
  String.validate.notVoid(name);
  String.validate.notVoid(surname);
  
  Email.validate(email);
  Email.isEmail(email);
  
  String.validate.notVoid(password);
  String.validate.lengthGreaterEqualThan(password, 8);
  
  // fetch('http://localhost:8080/users', { method: 'POST', mode: 'no-cors', headers: { 'Accept': 'application/json' ,'Content-Type': 'application/json' },
  //   body: JSON.stringify({name, surname, email, password }) })
  //   .then((response) => response.json())
  //   .then(data => (console.log(data)))
  //   .catch(error => {console.log(error)})
  
  /* 
  fetch('https://api.github.com/gists', {
  method: 'post',
  body: JSON.stringify(opts)
}). */

  return call('POST', 'http://localhost:8080/users',`{"name": "${name}" , "surname": "${surname}", "email" : "${email}" ,"password": "${password}"}`,
  {'Content-type' : 'Application/json'})
    .then(({status}) => {
      // console.log(status)
      if(status !== 201) throw Error('panteras wrong')
      return 
    })
    .catch(error => {
      throw error
    })
}
