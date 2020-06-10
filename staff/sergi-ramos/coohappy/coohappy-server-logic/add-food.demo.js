require('dotenv').config()
const addFood = require('./add-food')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const messages = await addFood('apple', '5ee0e319c860e368f8e1257b' )
        console.log(messages)

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()
