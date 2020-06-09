require('dotenv').config()
const updateCohousing = require('./update-cohousing')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateCohousing('5edfbc5ba3e7709f288730bd', {name:'hello', address: { street: 'c/lala', number:'', city: 'barcelona'}})

        } catch (error) {
            console.error('KO sync', error.message)
        }


    })
