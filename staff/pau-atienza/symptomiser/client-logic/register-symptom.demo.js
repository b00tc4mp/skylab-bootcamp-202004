require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose } = require('data')

const registerSymptom = require('./register-symptom')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        const symptom = {
            navigation: {
                predictorInput: {
                    content: 'hello',
                    limit: 5,
                    date: new Date().toISOString()
                },
                predictorOutput: {
                    date: new Date().toISOString(),
                    prediction: [
                        {
                            predictionCode: "hello",
                            predictionName: "mom"
                        }
                    ]
                },
                clicks: [{
                    HPO_id: "hi",
                    date: new Date().toISOString()
                }] 
            },
            submittedTerm: {
                HPO_id: "heya",
                name: "sis",
                confidenceLevel: "good"
            }
        }

        return registerSymptom(symptom)
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)