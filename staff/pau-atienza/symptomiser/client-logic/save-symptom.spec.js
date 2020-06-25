require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const saveSymptom = require('./save-symptom')
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

        context.storage.submittedSymptoms = JSON.stringify([])
    })

    it('should succeed on valid data', async () => {

        saveSymptom(HPO_id, name, confidenceLevel, symptomId)

        const newSymptomList = JSON.parse(context.storage.submittedSymptoms)

        expect(newSymptomList).to.be.an.instanceof(Array)

        const [symptom] = newSymptomList

        expect(symptom).to.be.an.instanceof(Object)
        
        const { term: {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel, symptomId: _symptomId}} = symptom
        
        expect(_HPO_id).to.equal(HPO_id)
        expect(_name).to.equal(name)
        expect(_confidenceLevel).to.equal(confidenceLevel)
        expect(_symptomId).to.equal(symptomId)
    })

    it('should succeed on valid data when there are no submitted symptoms', async () => {

        context.storage.submittedSymptoms = undefined

        saveSymptom(HPO_id, name, confidenceLevel, symptomId)

        const newSymptomList = JSON.parse(context.storage.submittedSymptoms)

        expect(newSymptomList).to.be.an.instanceof(Array)

        const [symptom] = newSymptomList

        expect(symptom).to.be.an.instanceof(Object)
        
       const { term: {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel, symptomId: _symptomId}} = symptom
        
        expect(_HPO_id).to.equal(HPO_id)
        expect(_name).to.equal(name)
        expect(_confidenceLevel).to.equal(confidenceLevel)
        expect(_symptomId).to.equal(symptomId)
    })

    it('should throw error when the symptom is already present in context storage', async () => {

        context.storage.submittedSymptoms = JSON.stringify([{term: {HPO_id, name, confidenceLevel, symptomId}}])        
        try{
            saveSymptom(HPO_id, name, confidenceLevel, symptomId)
        }catch(error){          
            expect(error).to.exist
        }
    })
})