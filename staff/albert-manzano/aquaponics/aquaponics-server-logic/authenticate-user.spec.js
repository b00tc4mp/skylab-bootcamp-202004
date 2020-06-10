require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User } } = require('aquaponics-data')
const bcrypt = require('bcryptjs')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    // let name, surname, email, password, userId, hash, phone

    let  userId, name,surname,email,password,role,confirmed,status,phone,hash

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = "user"
                status = "enable"
                phone = random()

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name,surname,email,password,role,confirmed,status,phone, password: hash })
                .then(user => userId = user.id)
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
                .then(_userId => expect(_userId).to.equal(userId))
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        authenticateUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    )

    describe('wrong inputs',()=>{
        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(true, password)
            }).to.throw(TypeError, `${'true'} is not a string`)
        })

        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(undefined, password)
            }).to.throw(TypeError, `${'undefined'} is not a string`)
        })

        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(9, password)
            }).to.throw(TypeError, `${'9'} is not a string`)
        })

        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(email,true)
            }).to.throw(TypeError, `${'true'} is not a string`)
        })

        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(email, undefined)
            }).to.throw(TypeError, `${'undefined'} is not a string`)
        })

        it('should fail on wrong input', () => {
            expect( () => {
                authenticateUser(email, 9)
            }).to.throw(TypeError, `${'9'} is not a string`)
        })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})