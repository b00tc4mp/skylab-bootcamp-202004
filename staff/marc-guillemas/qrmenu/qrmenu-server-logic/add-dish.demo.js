require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const {mongoose} = require('qrmenu-data')
const addDish = require('./add-dish')

mongoose.connect(MONGODB_URL)
    .then(() => {
        
        return addDish("5ee250262efaee3a31235a02", "5ee250272efaee3a31235a03", "ensalada mixta", "deliciosa ensalada mixta, muy refrescante", 5, ['healthy', 'fit','fresh'])
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)

