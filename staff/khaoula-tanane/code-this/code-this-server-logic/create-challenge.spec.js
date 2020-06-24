require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const createChallenge = require('./create-challenge')
const { expect } = require('chai')
const { random } = Math
require('code-this-commons/polyfills/json')
const { mongoose, models: { Challenge } } = require('code-this-data')
const { init } = require('code-this-data/models/user')

describe('logic - create challenge', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let description, initialCode, difficulty, tests
    beforeEach(async () => {

        await Challenge.deleteMany()
        description = `hello world-${random()}`
        difficulty = 'Medium'
        tests = 'expect(true).to.equal(true)'
        initialCode = `hola-mundo-${random()}`

    })

    it('should succeed on valid data', async () => {
        const result = await createChallenge(description, difficulty, tests, initialCode)

        expect(result).to.be.undefined

        const challenges = await Challenge.find()

        expect(challenges.length).to.equal(1)

        const [challenge] = challenges

        expect(challenge.description).to.equal(description)
        expect(challenge.difficulty).to.equal(difficulty)
        expect(challenges.length).to.equal(1)

    })

    describe('when challenge already exists', () => {
        beforeEach(() => Challenge.create({description, difficulty, tests, initialCode}))

        it('should fail on trying to create an existing challenge', async () => {
            try {
                await createChallenge(description, difficulty, tests, initialCode)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
            }
        })
    })

    afterEach(() => Challenge.deleteMany())

    after(mongoose.disconnect)
})