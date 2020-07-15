require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_SECRET: SECRET, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User, Blueprint } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const retrieveBlueprint = require('./retrieve-blueprint')
const { random } = Math
const { expect } = require('chai')
const { utils: { jwtPromised } } = require('moove-it-commons')
const context = require('./context')

context.API_URL = API_URL
context.storage = {}

describe('logic - retrieve user', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, token, userId, blueprintId, blueprint

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
        context.storage.token = token
        const blueprint = await Blueprint.create({ userId, name: planeName, width, height })
        blueprintId = blueprint.id
        await User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } })

    })


    describe('when user already exists', () => {

        it('should succeed on correct blueprint id', () => {
            

            return retrieveBlueprint( blueprintId)
                .then(blueprint => {
                    expect(blueprint).to.exist
                    expect(blueprint.id).to.equal(blueprintId)
                    expect(blueprint.name).to.equal(planeName)
                    expect(blueprint.width).to.equal(width)
                    expect(blueprint.height).to.equal(height)
                    expect(blueprint.items).to.be.an.instanceOf(Array)
                    expect(blueprint.items).to.have.lengthOf(0)

                })

        })

        it('should fail on wrong user blueprintId', () => {

            return retrieveBlueprint( '5ed43b913578a050d5600ee0')
                .then(() => { throw new Error('Should not be here') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`blueprint with id 5ed43b913578a050d5600ee0 does not exist`)
                })
        })

        describe('sync errors', () => {

            it('on wrong type of data', () => {

                expect(() => retrieveBlueprint(1, blueprintId)).to.throw(TypeError, '1 is not a string')
                expect(() => retrieveBlueprint('', blueprintId)).to.throw(Error, ' is empty or blank')

                expect(() => retrieveBlueprint( 1)).to.throw(TypeError, '1 is not a string')
                expect(() => retrieveBlueprint( "")).to.throw(Error, ' is empty or blank')

            })
        })



        afterEach(() => User.deleteMany())
        after(() => mongoose.disconnect())

    })

})