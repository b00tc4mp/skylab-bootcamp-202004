require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-user')
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
require('termometro-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { errors: { UnexistenceError, ValueError } } = require('termometro-commons')
const { mongoose, models: { User } } = require('termometro-data')
const updateUser = require('./update-user')


describe('logic - update user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, plan, mood, sex, age, data
    let genderArray = ['M', 'F']

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                age = Math.floor(Math.random() * 100);
                sex = genderArray[Math.floor(genderArray.length * Math.random())];
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                mood = {
                    date: Date.now(),
                    score: Math.floor(Math.random() * 10)
                }
                plan = 'twice';
                data = {
                    name: 'Sergi'
                }
            })
    )

    describe('prove update works', () => {
        beforeEach(() =>
            User.create({ name, surname, age, sex, email, password, plan, mood })
                .then(user => userId = user.id)
        )

        it('should succeed on updating credentials', async () => {
            const result = await updateUser(userId, data)

            expect(result).to.be.undefined

            const users = await User.find()

            expect(users.length).to.equal(1)

            const [user] = users

            expect(user.name).to.equal('Sergi')

            // const match = await bcrypt.compare(password, user.password)

            // expect(match).to.be.true

        })
    })

    describe('if user does not exist', () => {
        beforeEach(() =>
            User.deleteMany()
        )

        it('should fail on updating credentials', () => {
            updateUser(userId, data)
                .then(() => { throw new Error('El usuario que quieres actualizar no existe') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('El usuario que quieres actualizar no existe')
                })

        })
    })
    // it('should fail when user does not exist', () =>
    // authenticateUser(email, password)
    //     .then(() => { throw new Error('should not reach this point') })
    //     .catch(error => {
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal('Este email no existe')
    //     })
    // )
    // })

    // it('should fail on trying to remove a whole product that is not already in cart', () =>
    //     updateCart(userId, productId, quantity = 0)
    //         .then(() => { throw new Error('it should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.instanceOf(UnexistenceError)
    //             expect(error.message).to.equal(`product with id ${productId} does not exist in cart for user with id ${userId}`)
    //         })
    // )

    // it('should fail on negative quantity', () => {
    //     quantity = -1

    //     expect(() => updateCart(userId, productId, quantity))
    //         .to.throw(ValueError, `${quantity} is not a positive number`)
    // })

    // it('should fail on non-string user id', () => {
    //     expect(() => updateCart(true, productId, quantity))
    //         .to.throw(TypeError, `true is not a string`)

    //     expect(() => updateCart(1, productId, quantity))
    //         .to.throw(TypeError, `1 is not a string`)
    // })

    // it('should fail on non-string product id', () => {
    //     expect(() => updateCart(userId, true, quantity))
    //         .to.throw(TypeError, `true is not a string`)

    //     expect(() => updateCart(userId, 1, quantity))
    //         .to.throw(TypeError, `1 is not a string`)
    // })

    // it('should fail on non-numeric quantity', () => {
    //     expect(() => updateCart(userId, productId, true))
    //         .to.throw(TypeError, `true is not a number`)

    //     expect(() => updateCart(userId, productId, 'abc'))
    //         .to.throw(TypeError, `abc is not a number`)

    //     expect(() => updateCart(userId, productId, NaN))
    //         .to.throw(TypeError, `NaN is not a number`)
    // })

    // it('should fail when user does not exist', () =>
    //     updateCart(userId = ObjectId().toString(), productId, 1)
    //         .then(() => { throw new Error('it should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.instanceOf(UnexistenceError)
    //             expect(error.message).to.equal(`user with id ${userId} does not exist`)
    //         })
    // )

    // it('should fail when product does not exist', () =>
    //     updateCart(userId, productId = ObjectId().toString(), 1)
    //         .then(() => { throw new Error('it should not reach this point') })
    //         .catch(error => {
    //             expect(error).to.exist

    //             expect(error).to.be.instanceOf(UnexistenceError)
    //             expect(error.message).to.equal(`product with id ${productId} does not exist`)
    //         })
    // )

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})