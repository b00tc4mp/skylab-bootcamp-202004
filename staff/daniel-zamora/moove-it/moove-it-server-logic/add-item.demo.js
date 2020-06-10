require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const addItem = require('./add-item')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try{
        
            return addItem('cama',[2,3], 90, 15, 20)
                .then((id) => console.log(`Item created! ${id}`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })