require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')
const { mongoose, models: { Symptom } } = require('data')

const { errors: { VoidError, ValueError } } = require('commons')
const updateSymptom = require('./update-symptom')

describe('client logic - update symptom', () => {
    before(() => mongoose.connect(MONGODB_URL))
    before(() => Symptom.deleteMany())
    let content, limit, date, prediction, date2, clicks, HPO_id, name, confidenceLevel, date3, predictionCode, 
    predictionName, HPO_id2, date4, symptom, HPO_id3, name2, confidenceLevel2, date5, comments, modifiers, id, 
    userNavigationTime, serverResponseTime, navigation

    beforeEach(async () => {
        context.API_URL = API_URL
        
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

        userNavigationTime = 1
        serverResponseTime = 1

        clicks = [{HPO_id: HPO_id2, date: date4}]
        prediction = [{predictionCode, predictionName}]
        modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
        navigation = {
            predictorInput: {content, limit, date}, 
            predictorOutput: {prediction, date: date2}, 
            clicks, 
            userNavigationTime, 
            serverResponseTime
        }
        
        symptom = {navigation, submittedTerm: {HPO_id, name, confidenceLevel, date: date3}}

        const result = await Symptom.create(symptom)
        id = result.id
    })

    it('should succeed to update modifiers and comments on valid data both in the database and in the context storage', async () => {

        symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

        context.storage.symptomToModify = JSON.stringify(symptom)
        context.storage.submittedSymptoms = JSON.stringify([symptom])

        await updateSymptom(comments)

        const updatedSymptomsList = await Symptom.find()

        expect(updatedSymptomsList.length).to.equal(1)

        const [updatedSymptom] = updatedSymptomsList

        let {navigation: {predictorInput: {content: _content, limit: _limit, date: _date}, predictorOutput: {prediction: _prediction, date: _date2}, clicks: _clicks}} = updatedSymptom

        let {submittedTerm: {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel, date: _date3}} = updatedSymptom
        let {comments: _comments, modifiers: [{HPO_id: _HPO_id3, date: _date5, name: _name2, confidenceLevel: _confidenceLevel2}]} = updatedSymptom

        expect(updatedSymptom.id).to.equal(id)


        expect(_content).to.equal(content)
        expect(_limit).to.equal(limit)
        expect(_comments).to.equal(comments)
        expect(_prediction[0].predictionName).to.equal(predictionName)
        expect(_prediction[0].predictionCode).to.equal(predictionCode)

        expect(_date.toISOString()).to.equal(date)
        expect(_date2.toISOString()).to.equal(date2)
        expect(_date3.toISOString()).to.equal(date3)
        expect(_clicks[0].date.toISOString()).to.equal(clicks[0].date)
        expect(_date5.toISOString()).to.equal(date5)
        
        expect(_clicks[0].HPO_id).to.equal(clicks[0].HPO_id)
        expect(_HPO_id).to.equal(HPO_id)
        expect(_HPO_id3).to.equal(HPO_id3)

        expect(_name).to.equal(name)
        expect(_name2).to.equal(name2)
        
        expect(_confidenceLevel).to.equal(confidenceLevel)
        expect(_confidenceLevel2).to.equal(confidenceLevel2)

        const [updatedSymptomFromStorage] = JSON.parse(context.storage.submittedSymptoms)

        let {navigation: {predictorInput: {content: __content, limit: __limit, date: __date}, predictorOutput: {prediction: __prediction, date: __date2}, clicks: __clicks}} = updatedSymptomFromStorage

        let {term: {HPO_id: __HPO_id, name: __name, confidenceLevel: __confidenceLevel, date: __date3}} = updatedSymptomFromStorage
        let {comments: __comments, modifiers: [{HPO_id: __HPO_id3, date: __date5, name: __name2, confidenceLevel: __confidenceLevel2}]} = updatedSymptomFromStorage

        expect(updatedSymptomFromStorage.term.symptomId).to.equal(id)

        expect(__content).to.equal(content)
        expect(__limit).to.equal(limit)
        expect(__comments).to.equal(comments)
        expect(__prediction[0].predictionName).to.equal(predictionName)
        expect(_prediction[0].predictionCode).to.equal(predictionCode)

        expect(__date).to.equal(date)
        expect(__date2).to.equal(date2)
        expect(__date3).to.equal(date3)
        expect(__clicks[0].date).to.equal(clicks[0].date)
        expect(__date5).to.equal(date5)
        
        expect(_clicks[0].HPO_id).to.equal(clicks[0].HPO_id)
        expect(__HPO_id).to.equal(HPO_id)
        expect(__HPO_id3).to.equal(HPO_id3)

        expect(__name).to.equal(name)
        expect(__name2).to.equal(name2)
        
        expect(__confidenceLevel).to.equal(confidenceLevel)
        expect(__confidenceLevel2).to.equal(confidenceLevel2)
    })

    it('should succeed to delete modifiers and comments both in the database and in the context storage when these are introduced as null or undefined, without affecting the rest of the object', async () => {

        symptom = {navigation, modifiers: undefined, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

        comments = undefined

        context.storage.symptomToModify = JSON.stringify(symptom)
        context.storage.submittedSymptoms = JSON.stringify([symptom])

        await updateSymptom(comments)

        const updatedSymptomsList = await Symptom.find()

        expect(updatedSymptomsList.length).to.equal(1)

        const [updatedSymptom] = updatedSymptomsList

        let {navigation: {predictorInput: {content: _content, limit: _limit, date: _date}, predictorOutput: {prediction: _prediction, date: _date2}, clicks: _clicks}} = updatedSymptom

        let {submittedTerm: {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel, date: _date3}} = updatedSymptom
        let {comments: _comments, modifiers: _modifiers} = updatedSymptom

        expect(updatedSymptom.id).to.equal(id)

        expect(_modifiers).to.be.an.instanceof(Array)
        expect(_modifiers.length).to.equal(0)

        expect(_content).to.equal(content)
        expect(_limit).to.equal(limit)
        expect(_comments).to.equal("none")
        expect(_prediction[0].predictionName).to.equal(predictionName)
        expect(_prediction[0].predictionCode).to.equal(predictionCode)

        expect(_date.toISOString()).to.equal(date)
        expect(_date2.toISOString()).to.equal(date2)
        expect(_date3.toISOString()).to.equal(date3)
        expect(_clicks[0].date.toISOString()).to.equal(clicks[0].date)
        
        expect(_clicks[0].HPO_id).to.equal(clicks[0].HPO_id)
        expect(_HPO_id).to.equal(HPO_id)

        expect(_name).to.equal(name)
        
        expect(_confidenceLevel).to.equal(confidenceLevel)

        const [updatedSymptomFromStorage] = JSON.parse(context.storage.submittedSymptoms)

        let {navigation: {predictorInput: {content: __content, limit: __limit, date: __date}, predictorOutput: {prediction: __prediction, date: __date2}, clicks: __clicks}} = updatedSymptomFromStorage

        let {term: {HPO_id: __HPO_id, name: __name, confidenceLevel: __confidenceLevel, date: __date3}} = updatedSymptomFromStorage
        let {comments: __comments, modifiers: __modifiers} = updatedSymptomFromStorage

        expect(updatedSymptomFromStorage.term.symptomId).to.equal(id)

        expect(__modifiers).to.be.an.instanceof(Array)
        expect(__modifiers.length).to.equal(0)

        expect(__content).to.equal(content)
        expect(__limit).to.equal(limit)
        expect(__comments).to.equal("none")
        expect(__prediction[0].predictionName).to.equal(predictionName)
        expect(_prediction[0].predictionCode).to.equal(predictionCode)

        expect(__date).to.equal(date)
        expect(__date2).to.equal(date2)
        expect(__date3).to.equal(date3)
        expect(__clicks[0].date).to.equal(clicks[0].date)
        
        expect(_clicks[0].HPO_id).to.equal(clicks[0].HPO_id)
        expect(__HPO_id).to.equal(HPO_id)

        expect(__name).to.equal(name)
        
        expect(__confidenceLevel).to.equal(confidenceLevel)

    })

    describe('when inputs with incorrect format are introduced', async () => {
        
        it('should fail when empty strings are introduced', async () => {
            
            try {
                confidenceLevel2 = ""
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom])
            
                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                name2 = ""
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom])                
                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }

            try {
                HPO_id3 = ""
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom]) 

                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            }
        })

        it('should fail when non-string inputs are introduced', async () => {
            try {
                confidenceLevel2 = []
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom]) 
                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                name2 = []
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom])      
                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }

            try {
                HPO_id3 = []
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom])               
                await updateSymptom(comments)
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })

        it('should fail when non-ISODate inputs are introduced', async () => {

            try {
                date5 = []
                modifiers = [{HPO_id: HPO_id3, date: date5, name: name2, confidenceLevel: confidenceLevel2}]
                symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

                context.storage.symptomToModify = JSON.stringify(symptom)
                context.storage.submittedSymptoms = JSON.stringify([symptom])               
                await updateSymptom(comments)

            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            }
        })

    })

    it('should fail whenan HPO_id that doesn\'t fit the format is introduced', async () => {
        symptom = {navigation, modifiers, term: {HPO_id, name, confidenceLevel, date: date3, symptomId: id}}

        context.storage.symptomToModify = JSON.stringify(symptom)
        context.storage.submittedSymptoms = JSON.stringify([symptom])

        context.API_URL = "http://localhost:8080/api/random"

        try{
            await updateSymptom(comments)
        }catch(error){
            expect(error).to.exist
        }
    })

    afterEach(() => Symptom.deleteMany())

    after(mongoose.disconnect)
})