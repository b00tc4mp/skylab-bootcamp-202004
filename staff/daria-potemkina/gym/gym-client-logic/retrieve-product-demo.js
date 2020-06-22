global.XMLHttpRequest = require('xhr2')

const retrieveProduct = require('./retrieve-product')

retrieveProduct('5eee3cf9042e2ae59798b6d3')
    .then(product => console.log(product))
    .catch(error => console.log(error))