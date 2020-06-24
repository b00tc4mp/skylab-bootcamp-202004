require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveChallenges = require('./retrieve-challenges')
const { random } = Math
const { expect } = require('chai')
require('code-this-commons/polyfills/json')
const { mongoose, models: { Challenge } } = require('code-this-data')

describe('logic - retrieve challenges', () => {
    let challenges
    
    before(() => mongo.connect(MONGODB_URL).then(connection => challenges = connection.db().collection('challenges')))
    
    
    let description, solution, difficulty, tests
    beforeEach(() => 
    challenges.deleteMany()
        .then(()=> {
            description = `hello world-${random()}`
            solution = `hola mundo-${random()}`
            difficulty = 'Medium'
            tests = 'expect(true).to.equal(true)'
        })
    )

    it('should succeed on retrieving challenges', () => {
        retrieveChallenges()
        .then(challenges => {
            expect(challenges.length).to.equal(1)
            expect(challenges).to.be.an('array')
        })
  
    })

    afterEach(() => challenges.deleteMany())

    after(() => challenges.deleteMany().then(mongo.disconnect))
})