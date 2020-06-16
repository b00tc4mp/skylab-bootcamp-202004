require('dotenv').config()
const { env: { API_URL } } = process
const context = require('./context')
context.API_URL = API_URL

const retrieveTermsById = require('./retrieve-terms-by-id')


return retrieveTermsById("HP:0000010")
    .then(console.log)
    .catch(console.error)
