require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
const { mongoose } = require('data')
const registerSymptomList = require('./register-symptom-list')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        const symptomList = {
            symptomList: ["5eeb8e92cebb32062f46cafa"]
        }

        return registerSymptomList(symptomList)
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)