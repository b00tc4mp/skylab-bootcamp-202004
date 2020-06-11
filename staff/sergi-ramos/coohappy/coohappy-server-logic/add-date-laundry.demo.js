require('dotenv').config()
const addDateLaundry = require('./add-date-laundry')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        await addDateLaundry('12', '18', '5ee27bed750f21051dd6b9b7' )
        
    } catch (error) {
        console.error('KO sync', error.message)
    }
})()

