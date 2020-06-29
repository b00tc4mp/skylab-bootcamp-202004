require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const deleteItem = require('./delete-item')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return deleteItem('5ee67f293611841afa77cb6b', '5ee4f5a60e3879ed001f931d', '5ee511671978ee0cf5cf014c', 'silla', 1, 2, 0, 180, 3, 6)
                .then((item) => {
                    
                    console.log(`${item} was eliminated!`)
                })
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })