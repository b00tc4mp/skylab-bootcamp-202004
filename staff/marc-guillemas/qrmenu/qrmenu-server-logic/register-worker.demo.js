require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const registerWorker = require('./register-worker')

mongoose.connect(MONGODB_URL)
    .then(() => {
        
        return registerWorker("5ee363867b8f175f20e2029d", "5ee363867b8f175f20e2029e", "sergigramos@mail.com", "waiter", "pantera123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

