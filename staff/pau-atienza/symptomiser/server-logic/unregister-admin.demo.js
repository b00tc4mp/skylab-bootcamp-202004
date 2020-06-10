require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose } = require('data')

const unregisterAdmin = require('./unregister-admin')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        return unregisterAdmin( "5ee1168f2642460e19c27a04", 'pepito@lunarillos.com', '123123123')
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)