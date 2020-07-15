require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveChallenges = require('./retrieve-challenges')
const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
const { mongoose, models: { Challenge } } = require('code-this-data')

describe('logic - retrieve challenges', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let description, solution, difficulty, tests
    
    beforeEach(async () => {
        await Challenge.deleteMany()
        description = `hello world-${random()}`
        solution = `hola mundo-${random()}`
        difficulty = 'Medium'
        tests = 'expect(true).to.equal(true)'
        await Challenge.create({ description, solution, difficulty, tests })
    })

    it('should succeed on retrieving challenges', async () => {
        const challenges = await retrieveChallenges()

        expect(challenges.length).to.equal(1)
        expect(challenges).to.be.an('array')
  
    })

    afterEach(() => Challenge.deleteMany())

    after(mongoose.disconnect)
})