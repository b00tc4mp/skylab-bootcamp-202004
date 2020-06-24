require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const registerSymptomList = require('./register-symptom-list')
const { expect } = require('chai')
const { mongoose, models: { SymptomList } } = require('data')

const { errors: { VoidError } } = require('commons')

describe('client logic - register symptom list', () => {
    before(() => mongoose.connect(MONGODB_URL))
    before(() => SymptomList.deleteMany())
    let date, HPO_id, symptomList, symptoms

    beforeEach(async () => {
        context.API_URL = API_URL

        await SymptomList.deleteMany()

        symptomId = "5edfd817d242780ac65bc59c"

        symptomList = [{term: {symptomId}}]

        context.storage.submittedSymptoms = JSON.stringify(symptomList)
    })

    it('should succeed on valid data', async () => {
        const result = await registerSymptomList()

        expect(result).to.exist

        const retrievedsymptomList = await SymptomList.find()

        expect(retrievedsymptomList.length).to.equal(1)

        const [retrievedSymptoms] = retrievedsymptomList

        const {symptomList: [_symptomId], date: _date} = retrievedSymptoms

        expect(retrievedSymptoms.id).to.exist

        expect(_date).to.be.an.instanceof(Date)
        expect(JSON.stringify(_symptomId)).to.equal(`"${symptomId}"`)
    })

    describe('when inputs with incorrect format are introduced', async () => {
        
        it('should fail when empty strings are introduced', async () => {
            try {
                symptomId = ""

                symptomList = [{term: {symptomId}}]
                context.storage.submittedSymptoms = JSON.stringify(symptomList)
                await registerSymptomList()
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                symptomList = ""
                context.storage.submittedSymptoms = symptomList
                await registerSymptomList()
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }
        })
    })

    it('should fail when an incorrect url is introduced', async () => {
        context.API_URL = "http://localhost:8080/api/random"
        debugger
        try{
            await registerSymptomList()
        }catch(error){
            expect(error).to.exist
        }
    })

    afterEach(() => SymptomList.deleteMany())

    after(mongoose.disconnect)
})