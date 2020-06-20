require('dotenv').config()
const { env: { MONGODB_URL, API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
const { mongoose } = require('data')

const retrieveQueriedTerms = require('./retrieve-terms-by-query')

return retrieveQueriedTerms("sore throat")
    .then(console.log)
    .catch(console.error)