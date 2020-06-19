require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User, Blueprint } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const saveBlueprint = require('./save-blueprint')
const { random } = Math
const { expect } = require('chai')
    // const { errors: { UnexistenceError, CredentialsError } } = require('moove-it-commons')
const bcrypt = require('bcryptjs')
const { utils: { jwtPromised } } = require('moove-it-commons')
const context = require('./context')

context.API_URL = API_URL

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, token, blueprintId, userId, planeName, width, height


    describe('when user already exists and dont have bluerints', () => {

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

        })

        it('should succeed on correct blueprint id', () => {
            debugger

            return saveBlueprint(token, blueprintId, planeName, width, height)
                .then(() => User.findById(userId))
                .then(user => {
                    debugger
                    expect(user.blueprints).to.be.an.instanceOf(Array)
                    expect(user.blueprints).to.have.lengthOf(1)

                })

        })

    })

    describe('When user already have blue prints on it and are modified', () => {

        beforeEach(async() => {
            debugger

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

        it('should succeed on correct blueprint id', () => {

            return saveBlueprint(token, blueprintId, planeName, width, height)
                .then(() => User.findById(userId))
                .then((user) => {
                    expect(user.blueprints).to.have.lengthOf(1)
                    expect(user.blueprints[0].toString()).to.be.equal(blueprintId)


                })

        })
    })

    describe('sync errors', () => {
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

        it('on wrong type of data', () => {

            expect(() => saveBlueprint(1, blueprintId, planeName, width, height)).to.throw(TypeError, '1 is not a string')
            expect(() => saveBlueprint("", blueprintId, planeName, width, height)).to.throw(Error, ' is empty or blank')
            expect(() => saveBlueprint(token, 1, planeName, width, height)).to.throw(TypeError, '1 is not a string')
            expect(() => saveBlueprint(token, '', planeName, width, height)).to.throw(Error, ' is empty or blank')
            expect(() => saveBlueprint(token, blueprintId, 1, width, height)).to.throw(TypeError, '1 is not a string')
            expect(() => saveBlueprint(token, blueprintId, '', width, height)).to.throw(Error, ' is empty or blank')
                // expect(() => saveBlueprint(token, blueprintId, planeName, 'as', height)).to.throw(TypeError, 'as is not a number')
                // expect(() => saveBlueprint(token, blueprintId, planeName, '', height)).to.throw(TypeError, ' is empty or blank')
                // expect(() => saveBlueprint(token, blueprintId, planeName, width, 'as')).to.throw(TypeError, 'as is not a number')
                // expect(() => saveBlueprint(token, blueprintId, planeName, width, '')).to.throw(TypeError, ' is empty or blank')

        })
    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})