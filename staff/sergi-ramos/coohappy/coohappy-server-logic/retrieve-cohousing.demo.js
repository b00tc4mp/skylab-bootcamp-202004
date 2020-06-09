require('dotenv').config()
const retrieveCohousing = require('./retrieve-cohousing')
const { mongoose } = require('coohappy-data')
const { env: { MONGODB_URL } } = process

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            return retrieveCohousing('5ede010a6fbff729acfdbceb')
                .then(coohousing => {
                    return console.log(coohousing)
                })
                .catch(error => console.error('KO async', error))

        } catch (error) {
            console.error('KO sync', error)
        }


    })
