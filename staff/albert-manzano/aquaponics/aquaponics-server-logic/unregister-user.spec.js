require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const unregisterUser = require('./unregister-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('aquaponics-data')

describe('logic - unregisterUser', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, role, phone

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'admin'
                phone = random()
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const user = { name, surname, email, password ,role,phone}

            return User.create(user)
                .then(result => userId = result.id)
        })

        it('should remove the registered user from database', () =>{
            return unregisterUser(userId)
            .then(() => User.find())
            .then(users => {
                expect(users).to.have.lengthOf(0)
            })
        })
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'

        return unregisterUser(userId)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
            expect(error).to.be.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect( () => {
            unregisterUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect( () => {
            unregisterUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })
    afterEach(async() =>await User.deleteMany())

    after(async() => await mongoose.disconnect)
})