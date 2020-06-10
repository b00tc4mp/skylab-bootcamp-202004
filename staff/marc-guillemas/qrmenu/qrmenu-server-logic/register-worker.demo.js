require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const registerWorker = require('./register-worker')

mongoose.connect(MONGODB_URL)
    .then(() => {
        debugger
        return registerWorker("5ee0c36131134f2af580ce7e", "sergi", "ramos", "waiter", "pantera123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

