require('dotenv').config()
const { env: { MONGODB_URL, API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
const { expect } = require('chai')
const { errors: { VoidError } } = require('commons')

const retrieveTermsByQuery = require('./retrieve-terms-by-query')

describe('client logic - retrieve-terms-by-query', () => {
    let query = "sore throat"

    describe('when the term exists', () => {

        it('should succeed on correct query', () =>
            retrieveTermsByQuery(query)
                .then(result => {
                    expect(result).to.exist

                    expect(result.prediction).to.be.an.instanceof(Array)
                    expect(result.prediction[0]["prediction-name"]).to.exist
                    expect(result.prediction[0]["prediction-code"]).to.exist
                })
        ).timeout(8000)
    })

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
})