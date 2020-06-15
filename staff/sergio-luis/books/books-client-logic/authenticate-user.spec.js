require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL , TEST_API_URL: API_URL} } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
require('books-commons/ponyfills/xhr')
require('books-commons/ponyfills/atob')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError} } = require('books-commons')
global.fetch = require('node-fetch')
const context = require('./context')
context.API_URL = API_URL


describe('client-logic-authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash

    beforeEach(async() =>{
       await User.deleteMany()
    
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        hash  = await bcrypt.hash(password, 10)
    })

    describe('when user already exists', () => {
        beforeEach(async() =>{
            const user = await User.create({ name, surname, email, password: hash })
            userId = user.id
        })

        it('should succeed on correct credentials', async() =>{
            const token = await authenticateUser(email, password)
            const [, payloadBase64] = token.split('.')

            const payloadJson = atob(payloadBase64)

            const payload = JSON.parse(payloadJson)

            const { sub: _userId } = payload

            expect(_userId).to.equal(userId)
            
        })

        it('should fail on wrong password', async() => {
            password += 'wrong-'
            try{
                await authenticateUser(email, password);
                throw new Error('should not reach this point')
            }catch(error){
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`wrong password`)
            }
    
        })
    })

    it('should fail when user does not exist', async() =>{
        email = 'pepigri@mail.com'
        try{
            await authenticateUser(email, password);
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
        }
    })

    describe('Validate fiels sync tests', () => {
        it('should fail on non-string field', () => {
            expect(() => {
                authenticateUser(true, password)
            }).to.throw(TypeError, 'true is not a string')

            expect(() => {
                authenticateUser(email, 12313)
            }).to.throw(TypeError, '12313 is not a string')
        })

        it('should fail on void field', () => {
            expect(() => {
                authenticateUser('', password)
            }).to.throw(VoidError, 'string is empty or blank')

            expect(() => {
                authenticateUser(email, '')
            }).to.throw(VoidError, 'string is empty or blank')

        })

        it('should fail on incorrect email', () => {
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}`

            expect(() => {
                authenticateUser(email, password)
            }).to.throw(Error, `${email} is not an e-mail`)
        })

        it('should fail on password minlength of 8', () => {
            password = `123123`

            expect(() => {
                authenticateUser(email, password)
            }).to.throw(Error, `"${password}" length is not greater or equal than 8`)

        })
    })

    afterEach(async() => await User.deleteMany())

    after (async() => {
        return await mongoose.disconnect();
    })
})