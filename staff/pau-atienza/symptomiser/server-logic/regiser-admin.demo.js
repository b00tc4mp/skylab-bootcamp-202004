require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose } = require('data')

const registerAdmin = require('./register-admin')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        return registerAdmin( 'pepito', 'pepito@lunarillos.com', '123123123')
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)