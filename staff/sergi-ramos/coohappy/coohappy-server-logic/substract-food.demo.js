require('dotenv').config()
const substractFood = require('./substract-food')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        await substractFood('poma', '5ee1e08c8af0fe0b0076cbf7' )
        

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()

