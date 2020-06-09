require('dotenv').config()
const updateUser = require('./update-user')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateUser('5edf8d6b66df7a68a94565f7', {name:'jorge', surname: 'ramos', email:'jordi19@mail.com', oldPassword: '123123123', newPassword: '123123'})

        } catch (error) {
            console.error('KO sync', error.message)
        }


    })
