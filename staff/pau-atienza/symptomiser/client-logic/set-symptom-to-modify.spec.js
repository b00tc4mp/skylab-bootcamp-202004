require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const setSymptomToModify = require('./set-symptom-to-modify')
const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')

const { errors: { VoidError, ValueError } } = require('commons')

describe('client logic - save symptom', () => {
    let HPO_id, name, confidenceLevel, symptomId

    beforeEach(async () => {

        HPO_id = `HPO_id-${random()}`
        name = `name-${random()}`
        confidenceLevel = `conf-${random()}`
        symptomId = `symptomId-${random()}`

        context.storage.submittedSymptoms = JSON.stringify([{term: {HPO_id, name, confidenceLevel, symptomId}}])
    })

    it('should succeed on valid data', async () => {

        setSymptomToModify(name)

        const symptomToModify = JSON.parse(context.storage.symptomToModify)
        const submittedSymptoms = JSON.parse(context.storage.submittedSymptoms)

        expect(symptomToModify).to.deep.equal(submittedSymptoms[0])
    })

    it('should fail when the symptom is not present in the list', async () => {

        context.storage.submittedSymptoms = JSON.stringify([])
        try{
            setSymptomToModify(name)
        }catch(error){
            expect(error).to.exist
        }
    })
})