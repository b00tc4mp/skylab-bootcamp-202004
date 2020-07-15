require('dotenv').config()

const { env: { MONGODB_URL } } = process
const { mongo } = require('misc-data')
const registerUser = require('./misc-server-logic/register-user')

mongo.connect(MONGODB_URL)
    .then(() => {
        try {
            return registerUser('Jean', 'Nice blue pants', 10.99, 'https://img.ltwebstatic.com/images2_pi/2018/08/31/1535706293727658319_thumbnail_600x799.webp')
                .then(() => console.log('OK'))
                .catch(error => console.error('KO async', error))
        } catch (error) {
            console.error('KO sync', error)
        }
    })
