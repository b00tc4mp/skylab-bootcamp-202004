require('dotenv').config()
const { env: { MONGODB_URL } } = process
const { expect } = require('chai')
const { mongoose, models: { Term } } = require('data')
const { errors: { UnexistenceError, VoidError } } = require('commons')

const retrieveTermsByQuery = require('./retrieve-terms-by-query')

describe('logic - retrieve-terms-by-query', () => {
    let query = "sore throat"

    before(() => {
        console.debug('connecting to database')
        return mongoose.connect(MONGODB_URL)
            .then(()=>{
                console.info(`connected to database ${MONGODB_URL}`)

                return
            })
    })

    describe('when the term exists', () => {

        it('should succeed on correct inputs', () =>
            retrieveTermsByQuery(query)
                .then(result => {
                    expect(result.term).to.exist

                    expect(result.term.HPO_id).to.exist
                    expect(result.term._id).to.not.exist
                    expect(result.term.__v).to.not.exist
                    expect(result.term.xref).to.not.exist
                    expect(result.lower).to.be.an.instanceof(Array)
                    expect(result.higher).to.be.an.instanceof(Array)

                    expect(result.higher[0]._id).to.not.exist
                    expect(result.higher[0].__v).to.not.exist
                    expect(result.higher[0].xref).to.not.exist

                    expect(result.lower[0]._id).to.not.exist
                    expect(result.lower[0].__v).to.not.exist
                    expect(result.lower[0].xref).to.not.exist
                    return
                })
                .catch(error => {throw error})
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

    after(mongoose.disconnect)
})