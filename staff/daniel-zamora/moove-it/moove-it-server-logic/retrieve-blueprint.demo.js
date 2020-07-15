require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const retrieveBluePrint = require('./retrieve-blueprint')

mongoose.connect(TEST_MONGODB_URL)
    .then(() => {
        try {

            return retrieveBluePrint('5eecb49fda28df3b49350f41', '5eecb4afda28df3b49350f42')
                .then((id) => console.log(`Blueprint with id ${id} created!`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })