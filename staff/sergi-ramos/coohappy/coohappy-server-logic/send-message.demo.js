require('dotenv').config()
const sendMessage = require('./send-message')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            sendMessage('5ee08b75cc96d806420ab128', 'hola como estas?', new Date)

        } catch (error) {
            console.error('KO sync', error.message)
        }


    })
