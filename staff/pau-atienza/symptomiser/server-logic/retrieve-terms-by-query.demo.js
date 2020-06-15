require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongoose } = require('data')

const retrieveTermsByQuery = require('./retrieve-terms-by-query')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        return retrieveTermsByQuery("sore throat")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)