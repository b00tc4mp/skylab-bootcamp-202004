global.XMLHttpRequest = require('xhr2')
require('misc-commons/polyfills/string')
const registerUser = require('./register-user')

registerUser ("Cristina", "Potemkina", "Crpot10@gmail.com", "123123123") 
    .then(()=>{
        console.log("success")
    })    
    .catch(error => console.log(error)) 