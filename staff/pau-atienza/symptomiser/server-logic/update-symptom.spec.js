require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')
const { mongoose, models: { Symptom } } = require('data')

const { errors: { VoidError, ValueError } } = require('commons')
const updateSymptom = require('./update-symptom')

describe('server logic - update symptom', () => {
    before(() => mongoose.connect(MONGODB_URL))
    before(() => Symptom.deleteMany())
    let content, limit, date, prediction, date2, clicks, HPO_id, name, confidenceLevel, date3, predictionCode, predictionName, HPO_id2, date4, symptom, HPO_id3, name2, confidenceLevel2, date5, comments, modifiers, id

    beforeEach(async () => {
        await Symptom.deleteMany()

        content = `content-${random()}`
        limit = 1

        date = new Date().toISOString()
        date2 = new Date().toISOString()
        date3 = new Date().toISOString()
        date4 = new Date().toISOString()
        date5 = new Date().toISOString()

        HPO_id = `id-${random()}`
        HPO_id2 = `id2-${random()}`
        HPO_id3 = `id2-${random()}`

        name = `name-${random()}`
        name2 = `name-${random()}`

        confidenceLevel = `conf-${random()}`
        confidenceLevel2 = `conf-${random()}`
        
        predictionCode = `predCode-${random()}`
        predictionName = `predName-${random()}`
        comments = `comment-${random()}`

        clicks = [{HPO_id: HPO_id2, date: date4}]
        prediction = [{predictionCode, predictionName}]
        modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

        symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}}

        const result = await Symptom.create(symptom)
        id = result.id
    })

    it('should succeed on valid data', async () => {

        symptom.modifiers = modifiers
        symptom.comments = comments

        const _id = await updateSymptom(id, symptom)

        expect(_id).to.equal(id)

        const updatedSymptoms = await Symptom.find()

        expect(updatedSymptoms.length).to.equal(1)

        const [updatedSymptom] = updatedSymptoms

        const {navigation: {predictorInput: {content: _content, limit: _limit, date: _date}, predictorOutput: {prediction: _prediction, date: _date2}, clicks: _clicks}} = updatedSymptom

        const {submittedTerm: {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel, date: _date3}} = updatedSymptom
        const {comments: _comments, modifiers: [{HPO_id: _HPO_id3, date: _date5, name: _name2, confidenceLevel: _confidenceLevel2}]} = updatedSymptom

        expect(updatedSymptom.id).to.equal(id)


        expect(_content).to.equal(content)
        expect(_limit).to.equal(limit)
        expect(_comments).to.equal(comments)
        expect(_prediction[0].predictionName).to.equal(predictionName)
        expect(_prediction[0].predictionCode).to.equal(predictionCode)

        expect(_date.toISOString()).to.equal(date)
        expect(_date2.toISOString()).to.equal(date2)
        expect(_date3.toISOString()).to.equal(date3)
        expect(_clicks[0].date.toISOString()).to.equal(clicks[0].date.toISOString())
        expect(_date5.toISOString()).to.equal(date5)
        
        expect(_clicks[0].HPO_id).to.equal(clicks[0].HPO_id)
        expect(_HPO_id).to.equal(HPO_id)
        expect(_HPO_id3).to.equal(HPO_id3)

        expect(_name).to.equal(name)
        expect(_name2).to.equal(name2)
        
        expect(_confidenceLevel).to.equal(confidenceLevel)
        expect(_confidenceLevel2).to.equal(confidenceLevel2)

    })

    describe('when inputs with incorrect format are introduced', async () => {
        
        it('should fail when empty strings are introduced', async () => {
            try {
                predictionCode = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                predictionName = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                HPO_id2 = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }
            try {
                content = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                HPO_id = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                name = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                confidenceLevel = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                confidenceLevel2 = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                name2 = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                HPO_id3 = ""
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }
        })

        it('should fail when non-string inputs are introduced', async () => {
            try {
                predictionCode = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]

                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                predictionName = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                HPO_id2 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
            try {
                content = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                HPO_id = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                name = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})


            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                confidenceLevel = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                confidenceLevel2 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                name2 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                HPO_id3 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })

        it('should fail when non-number inputs are introduced', async () => {
            try {
                limit = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(ValueError)
                expect(error.message).to.equal(` is not greater or equal than 1`)
            }
        })

        it('should fail when non-ISODate inputs are introduced', async () => {
            try {
                date = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                date2 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                date3 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                date4 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                date5 = []
                clicks = [{HPO_id: HPO_id2, date: date4}]
                prediction = [{predictionCode, predictionName}]
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]

                symptom = {navigation: {predictorInput: {content, limit, date}, predictorOutput: {prediction, date: date2}, clicks}, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}, modifiers, comments}                
                updateSymptom(id, symptom)
                    .then(()=>{throw Error('should not reach this point')})

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })

    })

    afterEach(() => Symptom.deleteMany())

    after(mongoose.disconnect)
})