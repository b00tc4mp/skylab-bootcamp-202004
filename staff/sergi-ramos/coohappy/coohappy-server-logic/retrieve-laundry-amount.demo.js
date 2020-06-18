require('dotenv').config()
const retrieveLaundryAmount = require('./retrieve-laundry-amount')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const laundry = await retrieveLaundryAmount('5ee8d0663cb59109852e7894','18')
        

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()