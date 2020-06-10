require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const addDish = require('./add-dish')

mongoose.connect(MONGODB_URL)
    .then(() => {
        debugger
        return addDish("5ee0c36131134f2af580ce7e", "5ee0c4dd871d182e8c81d3a6", "ensalada mixta", "deliciosa ensalada mixta, muy refrescante", 5, ['healthy', 'fit','fresh'])
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

