require('dotenv').config()
const context = require('./context')
context.storage = {}
const retrieveSubmittedSymptomsfromStorage = require('./retrieve-submitted-symptoms-from-storage')
const { expect } = require('chai')

describe('client logic - retrieve submitted symptoms from storage', () => {
    let submittedSymptoms

    beforeEach(async () => {

        submittedSymptoms = []

        context.storage.submittedSymptoms = JSON.stringify([])
    })

    it('should retrieve the submittedSymptoms from the context storage when it exists', async () => {

        const _submittedSymptoms = retrieveSubmittedSymptomsfromStorage()
        expect(_submittedSymptoms).to.deep.equal(JSON.parse(context.storage.submittedSymptoms))
    })
    
    it('should return null when there are no submittedSymptoms in the context storage', async () => {
        context.storage.submittedSymptoms = undefined

        const results = retrieveSubmittedSymptomsfromStorage()
        expect(results).to.not.exist
    })
})