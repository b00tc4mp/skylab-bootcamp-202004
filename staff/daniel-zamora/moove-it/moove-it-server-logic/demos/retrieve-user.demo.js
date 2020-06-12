require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const retrieveUser = require('../retrieve-user')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return retrieveUser('5edfbc9cd4292d5036cd25e2')
                .then(({ name, surname, email }) => console.log(name, surname, email))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })