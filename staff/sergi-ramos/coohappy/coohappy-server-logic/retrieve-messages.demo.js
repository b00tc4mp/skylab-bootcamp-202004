require('dotenv').config()
const retrieveMessages = require('./retrieve-messages')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const messages = await retrieveMessages('5ee08b75cc96d806420ab128')
        console.log(messages)

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()



