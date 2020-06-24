require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const retrieveDishes = require('./retrieve-dishes')

mongoose.connect(MONGODB_URL)
    .then(() => {
        
        return retrieveDishes("5ee250262efaee3a31235a02")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

