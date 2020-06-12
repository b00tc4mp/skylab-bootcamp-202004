require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const authenticate = require('./authenticate')

mongoose.connect(MONGODB_URL)
    .then(() => {
        return authenticate("13726747F", "wok12@mail.com", "123123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

