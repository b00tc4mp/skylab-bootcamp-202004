require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { Blueprint, User, Item } } = require('moove-it-data')

const saveItem = require('./save-item')
const { random } = Math
const { expect } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, blueprintId, itemName, x, y, z, orientation, width, height;
    beforeEach(async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        itemName = `plane-${random()}`
        x = random()
        y = random()
        z = random()
        width = random()
        height = random()


        const user = { name, surname, email, password }
        const _user = await User.create(user)
        userId = _user.id

        const blueprint = await Blueprint.create({ userId, blueprintId, name: itemName, width, height })
        blueprintId = blueprint.id

        const item = await Item.create({ itemId, userId, blueprintId, name, x, y, z, orientation, width, height })
        itemId = item.id
    })

    describe('when user already exists', () => {

        it('should create a new blueprint on user', async() => {

            await saveItem(itemId, userId, blueprintId, name, x, y, z, orientation, width, height)
            const result = await Blueprint.findOne({ name: itemName })
            expect(result.name).to.equal(itemName)
            expect(result.width).to.equal(width)
            expect(result.height).to.equal(height)

            const user = await User.findById(userId)
            expect(user.blueprints).to.exist
            expect(user.blueprints[0].toString()).to.equal(result.id)

        })

    })

    describe('when user already exists and have a existing blueprint', () => {
        let name, surname, email, password, userId, blueprintId, itemName, width, height;
        beforeEach(async() => {
            debugger

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            itemName = `plane-${random()}`
            width = random()
            height = random()

            const blueprint = await Blueprint.create({ userId, blueprintId, name: itemName, width, height })
            blueprintId = blueprint.id

            const user = await User.create({ name, surname, email, password, blueprints: [blueprint] })
            userId = user.id

        })

        it('should update an existing blueprint', async() => {

            await saveItem
                (userId, blueprintId, "update plane", 20, 10)

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
            await saveItem
                (userId, blueprintId, itemName, width, height)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(UnexistenceError)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })


    it('should fail when incorrect inputs are introduced', () => {
        try {
            saveItem
                (1, blueprintId, itemName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveItem
                ('', blueprintId, itemName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveItem
                (userId, 1, itemName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveItem
                (userId, "", itemName, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveItem
                (userId, blueprintId, 1, width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            saveItem
                (userId, blueprintId, "", width, height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveItem
                (userId, blueprintId, itemName, "1", height)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a number`)
        }

        try {
            saveItem
                (userId, blueprintId, itemName, "", height)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try {
            saveItem
                (userId, blueprintId, itemName, width, "1")
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a number`)
        }

        try {
            saveItem
                (userId, blueprintId, itemName, width, "")
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }
    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})