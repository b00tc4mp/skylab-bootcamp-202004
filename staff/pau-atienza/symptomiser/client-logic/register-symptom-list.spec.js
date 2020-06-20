require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL

const registerSymptomList = require('./register-symptom-list')
const { expect } = require('chai')
const { mongoose, models: { SymptomList } } = require('data')

const { errors: { VoidError } } = require('commons')

describe('client logic - register symptom list', () => {
    before(() => mongoose.connect(MONGODB_URL))
    before(() => SymptomList.deleteMany())
    let date, HPO_id, symptomList, symptoms

    beforeEach(async () => {
        await SymptomList.deleteMany()

        HPO_id = "5edfd817d242780ac65bc59c"

        symptomList = [HPO_id]

        symptoms = {symptomList}
    })

    it('should succeed on valid data', async () => {
        const result = await registerSymptomList(symptoms)

        expect(result).to.exist

        const retrievedsymptomList = await SymptomList.find()

        expect(retrievedsymptomList.length).to.equal(1)

        const [retrievedSymptoms] = retrievedsymptomList

        const {symptomList: [_HPO_id], date: _date} = retrievedSymptoms

        expect(retrievedSymptoms.id).to.exist

        expect(_date).to.be.an.instanceof(Date)
        expect(JSON.stringify(_HPO_id)).to.equal(`"${HPO_id}"`)
    })

    describe('when inputs with incorrect format are introduced', async () => {
        
        it('should fail when empty strings are introduced', async () => {
            try {
                HPO_id = ""
                symptomList = [HPO_id]

                symptoms = {symptomList, date}
                registerSymptomList(symptoms)
                    .then(()=>{throw Error('should not reach this point')})

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
                    .then(()=>{throw Error('should not reach this point')})

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