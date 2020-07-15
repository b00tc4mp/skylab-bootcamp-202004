require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { Blueprint, User, Item } } = require('moove-it-data')

const createBlueprint = require('./create-blueprint')
const { random } = Math
const { expect, use } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')

describe('logic - save blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, blueprintId, planeName, width, height;
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        planeName = `plane-${random()}`
        width = random()
        height = random()


    })


    describe('when user already exists and had an existing blueprint with items on it', () => {
        beforeEach(async () => {

            const user = await User.create({ name, surname, email, password })
            userId = user.id

        })

        it('should create a new blueprint', () => {

            return createBlueprint(userId, name, width, height)
                .then(result => blueprintId = result.id)
                .then(() => User.findById(userId))
                .then(user => {
                    expect(user.blueprints).to.exist
                    expect(user.blueprints.id).to.be.equal(blueprintId)
                })

        })


        it('should fail on wrong user id', () => {
            

            createBlueprint('5ed43b913578a050d5600ee0', name, width, height)
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(UnexistenceError)
                    expect(error.message).to.equal(`User with id 5ed43b913578a050d5600ee0 does not exist`)
                })
        })


        it('should fail when incorrect inputs are introduced', () => {
            try {
                createBlueprint(1, name, width, height)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                createBlueprint('', name, width, height)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }

            try {
                createBlueprint(userId, 1, width, height)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                createBlueprint(userId, '', width, height)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            } 
            try {
                createBlueprint(userId, name, 1, height)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                createBlueprint(userId, name, '', height)
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            } 
            try {
                createBlueprint(userId, name, width, 1)
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(`1 is not a string`)
            }

            try {
                createBlueprint(userId, name, width, '')
            } catch (error) {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(` is empty or blank`)
            }
       
        })


    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())
})