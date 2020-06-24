require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const registerEstablishment = require('./register-establishment')

mongoose.connect(MONGODB_URL)
    .then(() => {
        
        return registerEstablishment("newWok1", "13726747F", "wok12@mail.com","123123123")
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

