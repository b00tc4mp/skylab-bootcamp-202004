require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User, Blueprint, Item } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const saveBlueprint = require('./save-blueprint')
const { random } = Math
const { expect } = require('chai')
const { utils: { jwtPromised } } = require('moove-it-commons')
const context = require('./context')
const item = require('moove-it-data/models/schemas/item')

context.API_URL = API_URL
context.storage = {}

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, token, blueprintId, userId, planeName,item, width, height, itemName, catalogueItemId, x, y, itemWidth, itemHeight, itemId;


    describe('When user already have blueprints on it and are modified', () => {

        beforeEach(async() => {
            debugger

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            planeName = `plane-${random()}`
            width = random()
            height = random()

            itemName = `item-${random()}`
            catalogueItemId= `${random()}`
            itemId= `${random()}`
            x = random()
            y = random()
            itemWidth = random()
            itemHeight = random()

            const user = await User.create({ name, surname, email, password })
            userId = user.id
            
            token = await jwtPromised.sign({ sub: userId }, SECRET)
            context.storage.token = token

            item = await Item.create({name: itemName, catalogueItemId, id: itemId, x, y, width: itemWidth, height: itemHeight })

            const blueprint = await Blueprint.create({ userId, name: planeName, width, height, items: [item]})
            blueprintId = blueprint.id
            await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

        })

        it('should succeed on correct blueprint id', () => {
            item = {name: 'aha', catalogueItemId: 'sofa', id: itemId, x, y, width: 1, height: 1 }
            return saveBlueprint( blueprintId, [item])
                .then(() => User.findById(userId))
                .then((user) => {
                    expect(user.blueprints).to.have.lengthOf(1)
                    // expect(user.blueprints[0].toString()).to.be.equal(blueprintId)


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

            expect(() => saveBlueprint(1, [item])).to.throw(TypeError, '1 is not a string')
            expect(() => saveBlueprint(" ", [item])).to.throw(Error, ' is empty or blank')
            expect(() => saveBlueprint(blueprintId, 1)).to.throw(TypeError, '1 is not an array')
            expect(() => saveBlueprint(blueprintId, '')).to.throw(TypeError, ' is not an array')

        

        })
    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())

})