require('dotenv').config()
const deleteDateLaundry = require('./delete-date-laundry')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)

return (async () => {

    try {
        await deleteDateLaundry('5ee27bed750f21051dd6b9b7')
        
    } catch (error) {
        console.error('KO sync', error.message)
    }
})()
