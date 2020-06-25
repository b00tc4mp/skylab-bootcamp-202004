require('dotenv').config()


const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const retrieveAllUsers = require('./retrieve-all-users')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')
__context__.storage = AsyncStorage
__context__.API_URL = API_URL


describe('logic - retrieveAllUsers', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone, name1, surname1, email1,  role1, phone1, token1, admin,encryptedPassword

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        role = 'admin'
        phone = random()
        encryptedPassword = await bcrypt.hash(password, 10);
        
        admin = await User.create({ name, surname, email, password: encryptedPassword, phone, role });

        userId = admin.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await __context__.storage.setItem('token', token)

        name1 = `name-${random()}`
        surname1 = `surname-${random()}`
        email1 = `e-${random()}@mail.com`
        password1 = `password-${random()}`
        role1 = 'user'
        phone1 = random()
    })

    describe('when user already exist', () => {
        it('should return the users data', () => {
            return retrieveAllUsers(userId)
                .then(allUsers => {
                    expect(allUsers.length).to.equal(2)
                    expect(allUsers.password).to.be.undefined

                })
        })

        it('should return all users', async () => {
            const user = await User.create({ name: name1, surname: surname1, email: email1, password: encryptedPassword, role: role1, phone: phone1 });
            await User.create(user)
            const result = await retrieveAllUsers()

            expect(result.length).to.equal(2)


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
            it('use app as user should fail', async () => { 
                userId = user.id;
                token1 = await jwtPromised.sign({ sub: userId }, SECRET)
                await __context__.storage.setItem('token', token1)

                const result = await retrieveAllUsers()

                expect(result).to.be.an.instanceof(Error)
                expect(result.message).to.equal(`your role does not allow you to acces here`)

            })

        })
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', async () => {
            await User.deleteMany()
            try {
                await retrieveAllUsers()
            } catch (error) {
                expect(error).to.be.exist
                expect(error.message).to.equal(`user with ${userId} does not exist`)

            }
        })
    })
    afterEach(async () => await User.deleteMany())

    after(async () => await mongoose.disconnect)
})
