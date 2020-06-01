require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')
const updateCart = require('./update-cart')

mongo.connect(MONGODB_URL)
    .then( () => {
        try {
            return updateCart("5ed394d4cc9d7a4088b32e0c", "5ad394d4cc9d7a4788b32e0c" ,0)
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })
