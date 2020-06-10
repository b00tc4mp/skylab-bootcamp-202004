require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const registerEstablishment = require('./register-establishment')

mongoose.connect(MONGODB_URL)
    .then(() => {
        debugger
        return registerEstablishment("nona", "43276737F", "nona@mail.com","123123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

