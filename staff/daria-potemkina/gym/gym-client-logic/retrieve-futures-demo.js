global.XMLHttpRequest = require('xhr2')

const retrieveFutures = require('./retrieve-futures')

retrieveFutures()
    .then(results => console.log(results))
    .catch(error => console.log(error))