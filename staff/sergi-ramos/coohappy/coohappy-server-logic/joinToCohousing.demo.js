require('dotenv').config()
const joinToCohousing = require('./joinToCohousing')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const messages = await joinToCohousing('5ee0e340c860e368f8e1257d','53643thefloc')


    } catch (error) {
        console.error('KO sync', error.message)
    }
})()
