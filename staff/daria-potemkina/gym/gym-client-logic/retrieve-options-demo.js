global.XMLHttpRequest = require('xhr2')

const retrieveOptions = require('./retrieve-options')

retrieveOptions()
    .then(results => console.log(results))
    .catch(error => console.log(error))