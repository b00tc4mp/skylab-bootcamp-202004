require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose } = require('data')

const registerSymptom = require('./register-symptom')
const updateSymptom = require('./update-symptom')
const { Symptom } = require('data/models')

console.debug('connecting to database')
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.info(`connected to database ${MONGODB_URL}`)

        const symptom = {
            navigation: {
                predictorInput: {
                    content: 'hello',
                    limit: 5,
                    date: new Date
                },
                predictorOutput: {
                    date: new Date,
                    prediction: [
                        {
                            predictionCode: "hello",
                            predictionName: "mom"
                        }
                    ]
                },
                clicks: [{
                    HPO_id: "hi",
                    date: new Date
                }] 
            },
            submittedTerm: {
                HPO_id: "heya",
                name: "sis",
                confidenceLevel: "good",
                date: new Date
            }
        }

        return registerSymptom(symptom)
            .then(id =>{
                symptom.modifiers = [{
                    HPO_id: "heya",
                    name: "sis",
                    confidenceLevel: "good",
                    date: new Date
                }]
                symptom.comments = "Hello there"

                return updateSymptom(id, symptom)
            })
    })
    .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)