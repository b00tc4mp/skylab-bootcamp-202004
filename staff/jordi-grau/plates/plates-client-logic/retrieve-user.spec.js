require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL, API_URL}} = process
const { mongoose, models: { User}} = require('plates-data')
global.fetch  = require('node-fetch')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const bcrypt = require('bcryptjs')
const { random } = Math
const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const context = require('./context')
const retrieveUser = require('../plates-api/node_modules/plates-server-logic/retrieve-user')

context.API_URL = API_URL


describe('client logic: retrieve user', () =>{
    before(async () => await mongoose.connect(MONGODB_URL))
    let name, surname, email, password, hashedPassword, _userId, result
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
 
    describe('when user already exists', () => {
        beforeEach( async() => {
            const user = await User.create({email, password: hashedPassword})
            let { _id: userId} = user
            userId = userId.toString()
           _userId = userId
        })

        it('should retrieve a user on correct data', ()=>{
            
             retrieveUser(_userId)
            .then( user => {
                expect(user).to.exist
                expect(user.email).to.equal(email)
                expect(user.password).to.be.undefined
            })
            

        })

        it('should not rertieve any user on wrong data', () =>{
            userId = _userId + 'wrongId'

            try {
               result =  retrieveUser(userId)
            } catch (error) {
                expect(error).to.exist
                expect(result).to.be.undefined
            }
        })
    })
  


    afterEach(async() => await Promise.all([
        User.deleteMany(),
    ]))

    after(async () => {
        await Promise.all([
            User.deleteMany()
        ]),
        await mongoose.disconnect();
    })
})