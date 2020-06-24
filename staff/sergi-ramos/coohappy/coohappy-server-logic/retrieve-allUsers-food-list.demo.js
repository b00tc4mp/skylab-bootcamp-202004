require('dotenv').config()
const retrieveAllUsersFoodList = require('./retrieve-allUsers-food-list')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const messages = await retrieveAllUsersFoodList('5ee20f8f16e2e8439c96c3e1')

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()
