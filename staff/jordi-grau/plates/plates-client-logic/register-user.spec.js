require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL, API_URL}} = process
 
const { DuplicityError, UnexistenceError, VoidError } = require('plates-commons/errors')
const {floor, random} = Math
const { expect } = require('chai')
const {mongoose, models:{ User, Restaurant}} = require('plates-data')
global.fetch  = require('node-fetch')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const registerUser = require('./register-user')
const context = require('./context')
context.API_URL = API_URL



describe('client logic: register user', () =>{
    before(async () => await mongoose.connect(MONGODB_URL))
    let name, surname, email,  password

    beforeEach(async() => {

        await User.deleteMany();
             name = `name-${random()}`,
             surname = `surname-${random()}`,
             email = `email-${random()}@gmail.com`,
             password = `password-${random()}`
        
    })

    describe('when user does not exist', () => {
        
        it('should register a user on correct data', async () =>{
           await registerUser(name, surname, email, password)

           const user = await User.findOne({name, surname, email});
           expect(user).to.exist
           expect(user.name).to.equal(name)
           expect(user.surname).to.equal(surname)
           expect(user.email).to.equal(email)  
        })

        it('should not register a user on wrong data', async () =>{
            email = ""
            
            try {
                await registerUser(name, surname, email, password)
                user = await User.findOne({name, surname, email})
                
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`${email} is not an e-mail`)
            }
        })

        it('should fail on existing email', async () =>{
           await User.create({name, surname, email, password})
            try {
                registerUser(name, surname, email, password)
            } catch (error) {
                expect(error).to.be.instanceOf(Error)
            }
        })
    })



    afterEach(async() => await Promise.all([
        User.deleteMany(),
        Restaurant.deleteMany()
    ]))

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ]),
        await mongoose.disconnect();
    })
})

