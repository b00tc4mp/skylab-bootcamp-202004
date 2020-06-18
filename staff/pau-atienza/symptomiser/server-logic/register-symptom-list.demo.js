require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose } = require('data')
const registerSymptomList = require('./register-symptom-list')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        const symptomList = {
            symptomList: ["5eeb8e92cebb32062f46cafa"],
            date: new Date
        }

        return registerSymptomList(symptomList)
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)