require('dotenv').config()
const { env: { MONGODB_URL, PREDICTOR_URL, LIMIT } } = process
const { expect } = require('chai')
const { mongoose } = require('data')
const { errors: { VoidError } } = require('commons')
const context = require('./context')

context.PREDICTOR_URL = PREDICTOR_URL
context.LIMIT = LIMIT

const retrieveTermsByQuery = require('./retrieve-terms-by-query')

describe('server logic - retrieve-terms-by-query', () => {
    let query = "sore throat"

    it('should succeed on correct inputs', () =>{

        return retrieveTermsByQuery(query)
            .then(result => {
                expect(result).to.exist

                expect(result.prediction).to.be.an.instanceof(Array)
                expect(result.prediction[0].predictionName).to.exist
                expect(result.prediction[0].predictionCode).to.exist
                expect(typeof result.prediction[0].predictionName).to.equal("string")
                expect(typeof result.prediction[0].predictionCode).to.equal("string")
            })
    }).timeout(8000)

    it('should fail when input does not fit the format', () => {
        try{
            retrieveTermsByQuery("")
        }catch(error){
            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try{
            retrieveTermsByQuery([])
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }
    
    })

    it('should fail when weird strings are introduced', () =>{
        query = "?????"
        return retrieveTermsByQuery(query)
            .catch(error=>{
                expect(error).to.exist
            })
    }).timeout(8000)

})