require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User, Blueprint } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const retrieveUserBlueprint = require('./retrieve-user-blueprint')
const { random } = Math
const { expect } = require('chai')
    // const { errors: { UnexistenceError, CredentialsError } } = require('moove-it-commons')
const bcrypt = require('bcryptjs')
const { utils: { jwtPromised } } = require('moove-it-commons')
const context = require('./context')

context.API_URL = API_URL

describe('logic - retrieve user blueprints', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, token, blueprintId, userId, planeName, width, height

    beforeEach(async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        planeName = `plane-${random()}`
        width = random()
        height = random()

        const user = await User.create({ name, surname, email, password })
        userId = user.id
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        const blueprint = await Blueprint.create({ userId, name: planeName, width, height })
        blueprintId = blueprint.id
        await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

    })


    describe('when user already exists', () => {

        it('should succeed on correct blueprint id', () => {

            return retrieveUserBlueprint(token)
                .then(blueprints => {
                    expect(blueprints).to.be.an.instanceOf(Array)
                    expect(blueprints).to.have.lengthOf(1)
                })

        })

        describe('sync errors', () => {

            it('on wrong type of data', () => {

                expect(() => retrieveUserBlueprint(1)).to.throw(TypeError, '1 is not a string')
                expect(() => retrieveUserBlueprint('')).to.throw(Error, ' is empty or blank')

            })
        })

    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})