require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL , API_URL } } = process
const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const retrieveResultsfromStorage = require('./retrieve-results-from-storage')
const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')

const { errors: { VoidError, ValueError } } = require('commons')

describe('client logic - retrieve query results from storage', () => {
    let HPO_id, name, confidenceLevel, symptomId

    beforeEach(async () => {

        HPO_id = `HPO_id-${random()}`
        name = `name-${random()}`
        confidenceLevel = `conf-${random()}`
        symptomId = `symptomId-${random()}`

        context.storage.navigation = JSON.stringify({predictorOutput: {prediction: []}})
    })

    it('should retrieve the predictorOutput from the context storage when it exists', async () => {

        const results = retrieveResultsfromStorage()
        expect(results).to.deep.equal(JSON.parse(context.storage.navigation).predictorOutput)
    })
    
    it('should return null when the predictorOutput is not present in the navigation form the context storage', async () => {
        context.storage.navigation = JSON.stringify({predictorOutput: undefined})

        const results = retrieveResultsfromStorage()
        expect(results).to.not.exist
    })

    it('should return null when the navigation object is not present in the context storage', async () => {
        context.storage.navigation = undefined

        const results = retrieveResultsfromStorage()
        expect(results).to.not.exist
    })
})