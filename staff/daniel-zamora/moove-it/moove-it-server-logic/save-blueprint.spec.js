require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { Blueprint, User, Item } } = require('moove-it-data')

const saveBlueprint = require('./save-blueprint')
const { random } = Math
const { expect, use } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, blueprintId, planeName, width, height, itemName, catalogueItemId, item, x, id, y, items;
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        planeName = `plane-${random()}`
        width = random()
        height = random()
        itemName = `item-${random()}`
        catalogueItemId = random()
        x = random()
        y = random()
        id= random() 

    })


    describe('when user already exists and had an existing blueprint with items on it', () => {
        beforeEach( async ()=> { 
            
            item = await new Item({name: itemName,id, catalogueItemId,x, y, width, height })
            const user = await User.create({ name, surname, email, password })
            userId = user.id
            const blueprint = await Blueprint.create({ userId, name: planeName, width, height, items: [item] })
            blueprintId = blueprint.id
            await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

        })

        it('should succeed on correct user id', () => {

            return saveBlueprint(userId, blueprintId, [item])
                .then(resultId => resultId = blueprintId)

        })


        it('should fail on wrong user id', () => { 
           
            saveBlueprint('5ed43b913578a050d5600ee0', blueprintId, [item])
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(UnexistenceError)
                expect(error.message).to.equal(`User with id 5ed43b913578a050d5600ee0 does not exist`)
            })
        })

            it('should fail when blueprint does not exist', () => {
            blueprintId = '5ed43b913578a050d5600ee0'
            saveBlueprint(userId, blueprintId, [item])
            .catch(error => {
                expect(error).to.exist
                // expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`blueprint with id 5ed43b913578a050d5600ee0 does not exist`)
                })
            })
        

        it('should fail when incorrect inputs are introduced', () => {
            try {
                saveBlueprint(1, blueprintId, items)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                saveBlueprint('', blueprintId, items)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }

            try {
                saveBlueprint(userId, 1, items)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                saveBlueprint(userId, '', items)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }

            try {
                saveBlueprint(userId, blueprintId, 1)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not an array`)
            }

            try {
                saveBlueprint(userId, blueprintId, '')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is not an array`)
            }
        })


    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())
})