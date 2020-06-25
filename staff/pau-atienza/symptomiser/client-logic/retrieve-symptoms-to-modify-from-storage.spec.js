require('dotenv').config()
const context = require('./context')
context.storage = {}
const retrieveSymptomToModifyFromStorage = require('./retrieve-symptom-to-modify-from-storage')
const { expect } = require('chai')

describe('client logic - retrieve submitted symptoms from storage', () => {
    let symptomToModify

    beforeEach(async () => {

        symptomToModify = []

        context.storage.symptomToModify = JSON.stringify([])
    })

    it('should retrieve the symptomToModify from the context storage when it exists', async () => {

        const _submittedSymptoms = retrieveSymptomToModifyFromStorage()
        expect(_submittedSymptoms).to.deep.equal(JSON.parse(context.storage.symptomToModify))
    })
    
    it('should return null when there are no symptomToModify in the context storage', async () => {
        context.storage.symptomToModify = undefined

        const results = retrieveSymptomToModifyFromStorage()
        expect(results).to.not.exist
    })
})