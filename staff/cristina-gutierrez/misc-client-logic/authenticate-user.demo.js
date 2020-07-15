global.XMLHttpRequest = require('xhr2')
require('misc-commons/polyfills/string')
const authenticateUser = require('./authenticate-user')

authenticateUser( "pepito114@mail.com", "123123123") 
    .then(id => console.log(id))    
    .catch(error => console.log(error)) 