require('dotenv').config()
const addFood = require('./add-food')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        await addFood('sindria', '5ee1e25681a5420d17ddabdf' )
        

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()

