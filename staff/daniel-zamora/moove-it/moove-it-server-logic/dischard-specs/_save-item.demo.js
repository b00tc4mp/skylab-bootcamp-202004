require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const saveItem = require('./save-item')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return saveItem(undefined, '5ee4f5a60e3879ed001f931d', '5ee511671978ee0cf5cf014c', 'mesita', 22, 12, 0, 180, 10, 9)
                .then((id) => console.log(`Item created! ${id}`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })