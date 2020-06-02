require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('../data')

const updateUser = require('./update-user')

mongo.connect(MONGODB_URL)
.then(() => {
    try {
        
        return updateUser("5ed35f24ce6f08582524de08",{name:"manu"})
            .then(() => console.log('OK'))
            .catch(error => console.error('KO async', error))
    } catch (error) {
        console.error('KO sync', error)
    }
})

