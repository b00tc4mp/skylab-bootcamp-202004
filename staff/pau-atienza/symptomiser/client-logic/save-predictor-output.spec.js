require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
savePredictorOutput = require('./save-predictor-output')
const { random } = Math

const { expect } = require('chai')

const { errors: { VoidError} } = require('commons')

describe('client logic - save predictor input', ()=>{

    let query, results, predictionName, predictionCode, date

    beforeEach(()=>{
        context.storage = {}
        query = `query-${random()}`

        predictionName = `predictionName-${random()}`
        predictionCode = `predictionCode-${random()}`
        date = new Date().toISOString()
    })

    it('should succeed on valid inputs without modifying the prediction inputs', ()=>{

        context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}

        results = {prediction: [{predictionName, predictionCode}]}

        savePredictorOutput(results)

        expect(typeof context.storage.navigation).to.equal("string")

        const navigation = JSON.parse(context.storage.navigation)

        expect(navigation.predictorInput).to.exist

        expect(navigation.predictorInput instanceof Object).to.be.true

        const {content, limit, date: _date} = navigation.predictorInput

        expect(content).to.equal(query)

        expect(limit).to.equal(LIMIT)

        expect(_date).to.equal(date)

        expect(navigation.predictorOutput).to.exist

        expect(navigation.predictorOutput instanceof Object).to.be.true

        const {prediction: [{predictionName: _predictionName, predictionCode: _predictionCode}], date: date2} = navigation.predictorOutput

        expect(_predictionName).to.equal(predictionName)
        expect(_predictionCode).to.equal(predictionCode)
        
        try{
            String.validate.isISODate(date2)
        }catch(error){
            expect(error).to.not.exist
        }


    })

    describe('when invalid inputs are introduced', ()=>{

        it('should fail when information in the session storage has been modified', ()=>{
            query = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
    
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }
    
            query = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            let limit = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
    
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            limit = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            date = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
    
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            date = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            date = "12412412"
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                context.storage = {navigation: {predictorInput: {content: query, limit, date}}}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('[object Object] is not a string')
            }
        })

        it('should fail when information in the session storage is missing', ()=>{
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: null})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Oops! Some important information was lost - please restart the search")
            }

            try{
                context.storage = {navigation: null}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Oops! Some important information was lost - please restart the search")
            }
        })

        it('should fail on invalid inputs', ()=>{


            predictionName = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
    
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }
    
            predictionName = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            predictionCode = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
    
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }
    
            predictionCode = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: [{predictionName, predictionCode}]}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = {prediction: ""}
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a valid JSON')
            }

            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}})}
    
                results = ""
    
                savePredictorOutput(results)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a valid JSON')
            }
        })
    })


    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)