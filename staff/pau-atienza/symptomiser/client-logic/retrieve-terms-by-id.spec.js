require('dotenv').config()
const { env: { MONGODB_URL, API_URL } } = process
const context = require('./context')
context.API_URL = API_URL

const { expect } = require('chai')
const { mongoose, models: { Term } } = require('data')
const { errors: { UnexistenceError, VoidError } } = require('commons')

const retrieveTermsById = require('./retrieve-terms-by-id')

describe('logic - retrieve-terms-by-HPO_id', () => {
    let HPO_id = "HP:0000010"

    describe('when the term exists', () => {

        it('should succeed on correct HPO_id', () =>
            retrieveTermsById(HPO_id)
                .then(result => {
                    expect(result.term).to.exist

                    expect(result.term.HPO_id).to.equal(HPO_id)
                    expect(result.term._id).to.not.exist
                    expect(result.term.__v).to.not.exist
                    expect(result.term.xref).to.not.exist
                    expect(result.lower).to.be.an.instanceof(Array)
                    expect(result.higher).to.be.an.instanceof(Array)

                    expect(result.higher[0].HPO_id).to.exist
                    expect(result.higher[0]._id).to.not.exist
                    expect(result.higher[0].__v).to.not.exist
                    expect(result.higher[0].xref).to.not.exist

                    expect(result.lower[0].HPO_id).to.exist
                    expect(result.lower[0]._id).to.not.exist
                    expect(result.lower[0].__v).to.not.exist
                    expect(result.lower[0].xref).to.not.exist
                    return
                })
                .catch(error => {throw error})
        )
    })

    it('should fail when term does not exist', () => {
        const newHPO_id = "HP:1000010"

        return retrieveTermsById(newHPO_id)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error.message).to.equal(`Term with HPO id ${newHPO_id} does not exist`)
            })
    })

    it('should fail when input does not fit the format', () => {
        try{
            retrieveTermsById("")
        }catch(error){
            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try{
            retrieveTermsById([])
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }
    })
})