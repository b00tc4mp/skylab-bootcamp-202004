require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised } } = require('../work-meeting-commons')
const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User } } = require('work-meeting-data')

const context = require('./context')

context.API_URL = API_URL

describe('logic - retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))
    //user-oriented variables
    let name, surname, email, password, userId, token

    beforeEach(async() =>{
        await User.deleteMany()
           
                //user-oriented
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                const user= User.create({ name, surname, email, password })
                userId = user.id
                token = await jwtPromised.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1d' })
                context.storage = { token }
   })

    describe('when user already exists', () => {

        it('should succeed on correct user id', () =>{
            
            retrieveUser(token)
                .then(user => {
                    
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                    expect(user.cart).to.be.undefined
                    expect(user.order).to.be.undefined
                })
       })
       
    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'

            return jwtPromised.sign({ sub: userId }, JWT_SECRET, {expiresIn:'1d'})
                .then(_token => token = _token)
        })

        it('should fail when user does not exist', () =>{
            
            return User.deleteMany()
            .then(()=>retrieveUser(token))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
            })
            it('synchronous paths : should fail on a non-string token', () => {

                token = random()
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = false
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = []
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = {}
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = undefined
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = null
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(TypeError, `${token} is not a string`)
    
                token = ''
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(Error, 'string is empty or blank')
    
                token = '    '
                context.storage={token}
                expect(() => retrieveUser(token)).to.throw(Error, 'string is empty or blank')
            });
    
    })
    })


    afterEach(async () => await User.deleteMany())

    after(async () => await mongoose.disconnect())
})