require('dotenv').config()
const retrieveUserFoodList = require('./retrieve-user-food-list')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const messages = await retrieveUserFoodList('5ee208347bfa213ac9609a89')
        console.log(messages)

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()
