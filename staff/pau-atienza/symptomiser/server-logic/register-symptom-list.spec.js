require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerSymptomList = require('./register-symptom-list')
const { expect } = require('chai')
const { mongoose, models: { SymptomList } } = require('data')

const { errors: { VoidError } } = require('commons')

describe('logic - register symptom list', () => {
    before(() => mongoose.connect(MONGODB_URL))
    before(() => SymptomList.deleteMany())
    let date, HPO_id, symptomList, symptoms

    beforeEach(async () => {
        await SymptomList.deleteMany()
        
        date = new Date().toISOString()

        HPO_id = "5edfd817d242780ac65bc59c"

        symptomList = [HPO_id]

        symptoms = {symptomList, date}
    })

    it('should succeed on valid data', async () => {
        const result = await registerSymptomList(symptoms)

        expect(result).to.exist

        const retrievedsymptomList = await SymptomList.find()

        expect(retrievedsymptomList.length).to.equal(1)

        const [retrievedSymptoms] = retrievedsymptomList

        const {symptomList: [_HPO_id], date: _date} = retrievedSymptoms

        expect(retrievedSymptoms.id).to.exist

        expect(JSON.parse(JSON.stringify(_date))).to.equal(date)
        expect(JSON.stringify(_HPO_id)).to.equal(`"${HPO_id}"`)
    })

    describe('when inputs with incorrect format are introduced', async () => {
        
        it('should fail when empty strings are introduced', async () => {
            try {
                HPO_id = ""
                symptomList = [HPO_id]

                symptoms = {symptomList, date}
                registerSymptomList(symptoms)

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }
        })

        it('should fail when non-string inputs are introduced', async () => {

            try {
                HPO_id = []

                symptomList = [HPO_id]
                symptoms = {symptomList, date}
                registerSymptomList(symptoms)

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })

        it('should fail when non-Date inputs are introduced', async () => {
            try {
                date = []
                symptomList = [HPO_id]
                symptoms = {symptomList, date}                
                registerSymptomList(symptoms)

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })
        
    })

    afterEach(() => SymptomList.deleteMany())

    after(mongoose.disconnect)
})