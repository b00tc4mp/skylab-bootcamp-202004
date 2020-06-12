require('dotenv').config()
const retrieveLaundry = require('./retrieve-laundry')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        const laundry = await retrieveLaundry('5ee27bed750f21051dd6b9b7')
        console.log(laundry)

    } catch (error) {
        console.error('KO sync', error.message)
    }
})()