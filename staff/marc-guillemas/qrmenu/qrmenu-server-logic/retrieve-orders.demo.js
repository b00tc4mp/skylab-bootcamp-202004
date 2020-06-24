require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const retrieveOrders = require('./retrieve-orders')

mongoose.connect(MONGODB_URL)
    .then(() => {
        
        return retrieveOrders("5ee0c36131134f2af580ce7e", "5ee0c4dd871d182e8c81d3a6")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

