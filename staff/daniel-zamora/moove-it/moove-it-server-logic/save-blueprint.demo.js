require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const saveBluePrint = require('./save-blueprint')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return saveBluePrint('5ee4f5a60e3879ed001f931d', undefined, 'room', 12, 15)
                .then((id) => console.log(`Blueprint created! ${id}`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })