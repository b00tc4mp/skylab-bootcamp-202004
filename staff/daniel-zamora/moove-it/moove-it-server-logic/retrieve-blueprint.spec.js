require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Blueprint } } = require('moove-it-data')

const retrieveBlueprint = require('./retrieve-blueprint')
const { random } = Math
const { expect } = require('chai')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const bcrypt = require('bcryptjs')

describe('logic - retrieve blueprint', () => {

    before(() => mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, userId, planeName, width, height;

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        planeName = `plane-${random()}`
        width = random()
        height = random()


    })


    describe('when user already exists and had an existing blueprint', () => {
        beforeEach(() => {
            const user = { name, surname, email, password: hash }
            User.create(user).then(user => userId = user.id)

            Blueprint.create({ userId, name: planeName, width, height })
                .then(blueprint => blueprintId = blueprint.id)
                .then(() => User.findByIdAndUpdate(userId, { $addToSet: { blueprints: blueprint } }))

        })

        it('should succeed on correct user id', () => {

            return retrieveBlueprint(userId)
                .then(blueprint => {
                    expect(blueprint.name).to.equal(planeName)
                    expect(blueprint.width).to.equal(width)
                    expect(blueprint.height).to.equal(height)
                    expect(blueprint.items).to.exist
                })

        })

        //     it('should fail on wrong user id', () =>
        //         retrieveUser('5ed43b913578a050d5600ee0')
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error).to.be.an.instanceof(UnexistenceError)
        //             expect(error.message).to.equal(`user with id 5ed43b913578a050d5600ee0 does not exist`)
        //         })
        //     )
        // })


        // it('should fail when incorrect inputs are introduced', () => {
        //     try {
        //         retrieveUser(1)
        //     } catch (error) {
        //         expect(error).to.be.an.instanceof(TypeError)
        //         expect(error.message).to.equal(`1 is not a string`)
        //     }

        //     try {
        //         retrieveUser('')
        //     } catch (error) {
        //         expect(error).to.be.an.instanceof(Error)
        //         expect(error.message).to.equal(` is empty or blank`)
        //     }
        // })


    })

    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect())
})