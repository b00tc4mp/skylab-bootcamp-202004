require('dotenv').config()

const { mongoose } = require('escape-me-data')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveEscapeRooms = require('./retrieve-escape-rooms')

mongoose.connect(MONGODB_URL)
    .then(async () => {
        const user = await retrieveEscapeRooms('5ee335f37309b71b1ecd65a2', 'favorites')

        console.log(user)
    })