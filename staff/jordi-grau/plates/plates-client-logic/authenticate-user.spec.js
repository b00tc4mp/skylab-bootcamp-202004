require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL, API_URL}} = process
const { mongoose, models: { User}} = require('plates-data')
global.fetch  = require('node-fetch')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
debugger
const { DuplicityError, UnexistenceError, VoidError, CredentialsError } = require('plates-commons/errors')
const bcrypt = require('bcryptjs')
const { random } = Math
const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const context = require('./context')

context.API_URL = API_URL


describe('client logic. authenticate user',() => {
    let email, password, hashedPassword


    before( async()=> {
        await mongoose.connect(MONGODB_URL)
    })

    beforeEach(async() =>
    User.deleteMany()
        .then(() =>{
            
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `email.${random()}@mail.com`
            password = `password-${random()}`
             

            return bcrypt.hash(password, 10)
        })

        .then(_hash => hashedPassword = _hash)
    )

debugger
    describe('when user already exists',() =>{
        beforeEach( async() => {
            await User.create({email, password: hashedPassword})
            .then ( user => userId = user.id)
        })

        it('should authenticate user on correct credentials', async () =>{
            await authenticateUser(email, password)

            .then(_userId => expect(userId).to.equal(userId))
        })

        it('should not atuthenticate with wrong e-mail', async() =>{
            email = email + 'wrongEmail'
            try {
                await authenticateUser(email, password)
            } catch (error) {
                expect(error).to.exist    
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            }
        })

        it('should not authenticate a user with wrong password', async() => {
            password = password+'wrongPassword'
            try {
                await authenticateUser(email, password)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal('wrong password')
            }
        })

    })   
    
    afterEach(async() => await Promise.all([
        User.deleteMany(),
        
    ]))

    after(async () => {
        await Promise.all([
            User.deleteMany(),
        ]),
        await mongoose.disconnect();
    })

})



