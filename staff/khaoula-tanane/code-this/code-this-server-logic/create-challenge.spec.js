require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const createChallenge = require('./create-challenge')
const { expect } = require('chai')
const { random } = Math
require('code-this-commons/polyfills/json')
const { mongoose, models: { Challenge } } = require('code-this-data')

describe('logic - create challenge', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let description, solution, difficulty, tests
    beforeEach(async () => {

        await Challenge.deleteMany()
        description = `hello world-${random()}`
        solution = `hola mundo-${random()}`
        difficulty = 'Medium'
        tests = 'expect(true).to.equal(true)'
    })

    it('should succeed on valid data', async () => {
        const result = await createChallenge(description, solution, difficulty, tests)

        expect(result).to.be.undefined

        const challenges = await Challenge.find()

        expect(challenges.length).to.equal(1)

        const [challenge] = challenges

        expect(challenge.description).to.equal(description)
        expect(challenge.solution[0]).to.equal(solution)
        expect(challenge.difficulty).to.equal(difficulty)
        expect(challenges.length).to.equal(1)

    })

    describe('when challenge already exists', () => {
        beforeEach(() => Challenge.create({description, solution, difficulty, tests}))

        it('should fail on trying to create an existing challenge', async () => {
            try {
                await createChallenge(description, solution, difficulty, tests)

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