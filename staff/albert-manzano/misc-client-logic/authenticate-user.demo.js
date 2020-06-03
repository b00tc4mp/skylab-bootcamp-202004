global.XMLHttpRequest = require('xhr2')
require('misc-commons/polyfills/string')
const authenticateUser = require('./authenticate-user')

authenticateUser( "Crpot@gmail.com", "123123123") 
    .then(token => console.log(token))    
    .catch(error => console.log(error))