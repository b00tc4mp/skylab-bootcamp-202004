require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
savePredictorInput = require('./save-predictor-input')
const { random } = Math

context.LIMIT = LIMIT

const { expect } = require('chai')

const { errors: { VoidError} } = require('commons')


describe('client logic - save predictor input', ()=>{

    let query

    beforeEach(()=>{
        context.storage = {}
        query = `query-${random()}`
    })

    it('should succeed on valid inputs', ()=>{

        savePredictorInput(query)

        expect(typeof context.storage.navigation).to.equal("string")

        const navigation = JSON.parse(context.storage.navigation)

        expect(navigation.predictorInput).to.exist

        expect(navigation.predictorInput instanceof Object).to.be.true


        const {content, limit, date} = navigation.predictorInput

        expect(content).to.equal(query)

        expect(limit).to.equal(LIMIT)

        String.validate.isISODate(date)
    })

    it('should fail on invalid inputs', ()=>{
        query = ""

        try{
            savePredictorInput(query)
        }catch(error){
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal('string is empty or blank')
        }

        query = []

        try{
            savePredictorInput(query)
        }catch(error){
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(' is not a string')
        }
    })

    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)