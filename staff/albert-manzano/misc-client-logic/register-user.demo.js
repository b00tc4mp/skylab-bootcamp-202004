global.XMLHttpRequest = require('xhr2')
require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const registerUser = require('./register-user')


registerUser ("Cristina", "Ramos", "Cripotas@gmail.com", "123123123") 
    .then((body)=>{debugger

        console.log("supercalifras")
    })    
    .catch(error => console.log(error))