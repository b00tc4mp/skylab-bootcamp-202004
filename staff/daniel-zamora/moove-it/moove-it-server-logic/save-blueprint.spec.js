require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { Blueprint, User } } = require('moove-it-data')

const saveBlueprint = require('./save-blueprint')
const { random } = Math
const { expect } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, blueprintId, planeName, width, height;
    beforeEach(async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        planeName = `plane-${random()}`
        width = random()
        height = random()

        const user = { name, surname, email, password }
        const _user = await User.create(user)
        userId = _user.id
    })

    describe('when user already exists', () => {


        it('should create a new blueprint on user', async() => {

            await saveBlueprint(userId, blueprintId, planeName, width, height)
            const result = await Blueprint.findOne({ name: planeName })
            expect(result.name).to.equal(planeName)
            expect(result.width).to.equal(width)
            expect(result.height).to.equal(height)

            const user = await User.findById(userId)
            expect(user.blueprints).to.exist
            expect(user.blueprints[0].toString()).to.equal(result.id)

        })

    })

    describe('when user already exists and have a existing blueprint', () => {
        let name, surname, email, password, userId, blueprintId, planeName, width, height;
        beforeEach(async() => {
            debugger

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            planeName = `plane-${random()}`
            width = random()
            height = random()

            const blueprint = await Blueprint.create({ userId, blueprintId, name: planeName, width, height })
            blueprintId = blueprint.id

            const user = await User.create({ name, surname, email, password, blueprints: [blueprint] })
            userId = user.id

        })

        it('should update an existing blueprint', async() => {

            await saveBlueprint(userId, blueprintId, "update plane", 20, 10)

            const result = await Blueprint.findById(blueprintId)
            expect(result.name).to.equal("update plane")
            expect(result.width).to.equal(20)
            expect(result.height).to.equal(10)
            expect(result.id).to.equal(blueprintId)

        })

    })


    it('should fail on wrong user id', async() => {
        await User.deleteOne({ _id: userId })
        try {
            await saveBlueprint(userId, blueprintId, planeName, width, height)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(UnexistenceError)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })


    it('should fail when incorrect inputs are introduced', () => {
        try {
            saveBlueprint(1, blueprintId, planeName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveBlueprint('', blueprintId, planeName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveBlueprint(userId, 1, planeName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveBlueprint(userId, "", planeName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveBlueprint(userId, blueprintId, 1, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveBlueprint(userId, blueprintId, "", width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveBlueprint(userId, blueprintId, planeName, "1", height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a number`)
        }

        try {
            saveBlueprint(userId, blueprintId, planeName, "", height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveBlueprint(userId, blueprintId, planeName, width, "1")
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a number`)
        }

        try {
            saveBlueprint(userId, blueprintId, planeName, width, "")
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }
    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})