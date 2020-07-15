require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const createChallenge = require('./create-challenge')
const { expect } = require('chai')
const { random } = Math
require('code-this-commons/polyfills/json')
const { mongo } = require('../code-this-data')
const { models: { Challenge } } = require('code-this-data')
const { init } = require('code-this-data/models/user')

context.API_URL = API_URL

describe('logic - create challenge', () => {
    before(() =>
    mongo.connect(MONGODB_URL)
        .then(connection => challenges = connection.db().collection('challenges'))
)

    let initialCode, description, difficulty, tests
    
    beforeEach(() =>
    challenges.deleteMany()
    .then(() => {
            description = `hello world-${random()}`
            difficulty = 'Medium'
            tests = 'expect(true).to.equal(true)'
            initialCode = `hola-mundo-${random()}`
            })
    )

    it('should succeed on valid data', () => {
        createChallenge({description, difficulty, tests, initialCode})
            .then(() => challenges.find().toArray())
            .then(_challenges => {
                expect(_challenges.length).to.equal(1)

                const [challenge] = _challenges

                expect(challenge.description).to.equal(description)
                expect(challenge.difficulty).to.equal(difficulty)
                expect(challenge.tests).to.equal(tests)
                expect(challenge.initialCode).to.equal(initialCode)

            })

    })

    describe('when challenge already exists', () => {
        beforeEach(() => challenges.insertOne({ description, difficulty, tests, initialCode }))
        it('should fail on trying to create an existing challenge', async () => {
            createChallenge({description, difficulty, tests, initialCode})
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
            })
        })
    })

    afterEach(() => challenges.deleteMany())

    after(mongo.disconnect)
})