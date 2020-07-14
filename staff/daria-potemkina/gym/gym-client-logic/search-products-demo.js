global.XMLHttpRequest = require('xhr2')

const searchProducts = require('./search-products')

searchProducts('option')
    .then(results => console.log(results))
    .catch(error => console.log(error))