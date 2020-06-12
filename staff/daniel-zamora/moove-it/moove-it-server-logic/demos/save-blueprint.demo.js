require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const createBluePrint = require('../save-blueprint')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return createBluePrint('5ee2550b9ccc676b30b4bd4c', undefined, 'room', 12, 15)
                .then((id) => console.log(`Blueprint created! ${id}`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })