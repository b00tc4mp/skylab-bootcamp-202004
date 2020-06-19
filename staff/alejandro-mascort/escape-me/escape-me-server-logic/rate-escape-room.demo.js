require('dotenv').config()

const { mongoose } = require('escape-me-data')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const rateEscapeRoom = require('./rate-escape-room')

mongoose.connect(MONGODB_URL)
    .then(async () => {
        await rateEscapeRoom('5eeb9050112c740c32266336', '5eec9c460a18a274de33bde5', 4)

        mongoose.disconnect()
    })