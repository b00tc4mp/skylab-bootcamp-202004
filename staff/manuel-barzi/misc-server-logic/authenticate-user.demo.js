require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')

const authenticateUser = require('./authenticate-user')

mongo.connect(MONGODB_URL)
    .then(() =>
        authenticateUser('pepigri@mail.com', '123')
            .then(console.log)
    )
    .catch(console.error)