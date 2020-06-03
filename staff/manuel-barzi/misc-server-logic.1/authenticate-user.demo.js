require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('misc-data')

const authenticateUser = require('./authenticate-user')

mongo.connect(MONGODB_URL)
    .then(() =>
        authenticateUser('menganito@mail.com', '123')
            .then(console.log)
    )
    .catch(console.error)