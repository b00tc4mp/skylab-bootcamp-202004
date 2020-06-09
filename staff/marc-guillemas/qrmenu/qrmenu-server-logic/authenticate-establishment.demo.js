require('dotenv').config()
const {env: {MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const authenticateEstablishment = require('./authenticate-establishment')

mongoose.connect(MONGODB_URL)
    .then(() => {
        return authenticateEstablishment("su-shi3@mail.com", "sushi123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

