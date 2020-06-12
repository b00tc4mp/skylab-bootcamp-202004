require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { Blueprint, User, Item } } = require('moove-it-data')

const saveItem = require('./save-item')
const { random } = Math
const { expect } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, blueprintId, itemId, planeName, itemName, x, y, z, orientation, width, height;
    beforeEach(async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        itemName = `plane-${random()}`
        planeName = `plane-${random()}`
        x = random()
        y = random()
        z = random()
        orientation = random()
        width = random()
        height = random()



        const blueprint = await Blueprint.create({ userId, blueprintId, name: planeName, width, height })
        blueprintId = blueprint.id

        const user = { name, surname, email, password, blueprints: blueprint }
        const _user = await User.create(user)
        userId = _user.id
    })

    describe('when user already exists', () => {

        it('should create a new item on an existing user blueprint', async() => {
            debugger

            await saveItem(itemId, userId, blueprintId, itemName, x, y, z, orientation, width, height)

            const blueprint = await Blueprint.findById(blueprintId)

            expect(blueprint.items).to.exist
            expect(blueprint.items).to.have.lengthOf(1)
            expect(blueprint.items[0].name).to.equal(itemName)
            expect(blueprint.items[0].orientation).to.equal(orientation)
            expect(blueprint.items[0].x).to.equal(x)
            expect(blueprint.items[0].y).to.equal(y)
            expect(blueprint.items[0].z).to.equal(z)
            expect(blueprint.items[0].width).to.equal(width)
            expect(blueprint.items[0].height).to.equal(height)


        })

    })

    describe('when user have blue prints and items on it', () => {
        let name, surname, email, password, userId, blueprintId, itemId, planeName, itemName, x, y, z, orientation, width, height;
        beforeEach(async() => {

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            itemName = `plane-${random()}`
            planeName = `plane-${random()}`
            x = random()
            y = random()
            z = random()
            orientation = random()
            width = random()
            height = random()



            const item = await Item.create({ itemId, userId, blueprintId, name: itemName, x, y, z, orientation, width, height })
            itemId = item.id

            const blueprint = await Blueprint.create({ userId, blueprintId, name: planeName, width, height, items: item })
            blueprintId = blueprint.id

            const user = { name, surname, email, password, blueprints: blueprint }
            const _user = await User.create(user)
            userId = _user.id

        })

        it('should update an existing item on blueprint', async() => {
            debugger

            await saveItem(itemId, userId, blueprintId, "update item", 32, 14, 0, 3, 20, 10)

            const blueprint = await Blueprint.findById(blueprintId)

            expect(blueprint.items).to.exist
            expect(blueprint.items[0].name).to.equal('update item')
            expect(blueprint.items[0].x).to.equal(32)
            expect(blueprint.items[0].y).to.equal(14)
            expect(blueprint.items[0].z).to.equal(0)
            expect(blueprint.items[0].orientation).to.equal(3)
            expect(blueprint.items[0].width).to.equal(20)
            expect(blueprint.items[0].height).to.equal(10)

        })

    })


    // it('should fail on wrong user id', async() => {
    //     await User.deleteOne({ _id: userId })
    //     try {
    //         await saveItem
    //             (userId, blueprintId, itemName, width, height)
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceof(UnexistenceError)
    //         expect(error.message).to.equal(`user with id ${userId} does not exist`)
    //     }
    // })


    // it('should fail when incorrect inputs are introduced', () => {
    //     try {
    //         saveItem
    //             (1, blueprintId, itemName, width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(TypeError)
    //         expect(error.message).to.equal(`1 is not a string`)
    //     }

    //     try {
    //         saveItem
    //             ('', blueprintId, itemName, width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal(` is empty or blank`)
    //     }

    //     try {
    //         saveItem
    //             (userId, 1, itemName, width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(TypeError)
    //         expect(error.message).to.equal(`1 is not a string`)
    //     }

    //     try {
    //         saveItem
    //             (userId, "", itemName, width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal(` is empty or blank`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, 1, width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(TypeError)
    //         expect(error.message).to.equal(`1 is not a string`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, "", width, height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal(` is empty or blank`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, itemName, "1", height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(TypeError)
    //         expect(error.message).to.equal(`1 is not a number`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, itemName, "", height)
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal(` is empty or blank`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, itemName, width, "1")
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(TypeError)
    //         expect(error.message).to.equal(`1 is not a number`)
    //     }

    //     try {
    //         saveItem
    //             (userId, blueprintId, itemName, width, "")
    //     } catch (error) {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal(` is empty or blank`)
    //     }
    // })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})