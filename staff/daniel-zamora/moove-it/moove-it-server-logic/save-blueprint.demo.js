require('dotenv').config()
const { env: { MONGODB_URL } } = process

const { mongoose } = require('moove-it-data')
const saveBluePrint = require('./save-blueprint')

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            return saveBluePrint('5ee9e9cc130f893ce80e72a1', undefined, 'habitacion', 4, 2)
                .then((id) => console.log(`Blueprint with id ${id} created!`))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })