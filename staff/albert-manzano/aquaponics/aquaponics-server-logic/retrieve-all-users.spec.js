require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrieveAllUsers = require('./retrieve-all-users')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')

describe('logic - retrieveAllUsers', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone, name1, surname1, email1, password1, role1, phone1, userId1
    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'admin'
                phone = random()

                name1 = `name-${random()}`
                surname1 = `surname-${random()}`
                email1 = `e-${random()}@mail.com`
                password1 = `password-${random()}`
                role1 = 'user'
                phone1 = random()
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const admin = { name, surname, email, password, role, phone }

            return User.create(admin)
                .then(result => userId = result.id)
        })

        it('should return the users data', () => {
            return retrieveAllUsers(userId)
                .then(allUsers => {
                    expect(allUsers.length).to.equal(1)
                    expect(allUsers.password).to.be.undefined
                   
                })
        })

        it('should return credentials error', () => {
            const user = { name: name1, surname: surname1, email: email1, password: password1, role: role1, phone: phone1 }
            return User.create(user)
                .then(result1 => userId1 = result1.id)
                .then(async () => {
                    const allUsers = await User.find()
                    expect(allUsers.length).to.equal(2)
                    return retrieveAllUsers(userId)
                        .then(result => {
                            expect(result.length).to.equal(2)
                            expect(result[0].password).to.be.undefined
                            expect(result[0].name).to.equal(name)
                            expect(result[0].surname).to.equal(surname)
                            expect(result[0].email).to.equal(email)
                            expect(result[0].role).to.equal(role)
                            expect(result[0].phone).to.equal(phone)
                            expect(result[1].password).to.be.undefined
                            expect(result[1].name).to.equal(name1)
                            expect(result[1].surname).to.equal(surname1)
                            expect(result[1].email).to.equal(email1)
                            expect(result[1].role).to.equal(role1)
                            expect(result[1].phone).to.equal(phone1)
                        })
                })
        })

        it('use app as user should fail', () => {
            const user = { name: name1, surname: surname1, email: email1, password: password1, role: role1, phone: phone1 }
            return User.create(user)
                .then(result1 => userId1 = result1.id)
                .then()
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`your role does not allow you to acces here`)
                })
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveAllUsers(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            retrieveAllUsers(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveAllUsers(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = ''
        expect(() => {
            retrieveAllUsers(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrieveAllUsers(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with ${userId} does not exist`)
                })
        })
    })
    afterEach(async() =>await User.deleteMany())

    after(async() => await mongoose.disconnect)
})