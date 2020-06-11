require('dotenv').config()
const subsFood = require('./subs-food')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        await subsFood('poma', '5ee1e08c8af0fe0b0076cbf7' )
        

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()

