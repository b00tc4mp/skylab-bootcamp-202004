require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')
const addToCart = require('./add-to-cart')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return addToCart('5ed0f11b5322491a5a887b2d', '5ed2405381bcf6b01d9e38aa')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })