require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('../data')

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('misc-commons/polyfills/json')
const { errors: {DuplicityError, VoidError, UnexistenceError, CredentialsError, ForbiddenError} } = require('misc-commons')


describe('logic - register user', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL)
            .then(connection => users = connection.db().collection('users'))
    )
    let name, surname, email, password
    
    beforeEach(() => 
        users.deleteMany()
            .then(()=>{
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    it('should succeed on valid data', () => 
        registerUser(name, surname, email, password)
            .then(()=>users.findOne({ email }))
            .then(user=> {
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
            })               
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }
            return users.insertOne(user)
        })

        it('should fail on trying to register an existing user', () => 
            registerUser(name, surname, email, password) 
                .then(()=> {throw new Error( "Should throw error")})
                .catch(error=>{
                    expect(error).to.be.an.instanceof(DuplicityError)
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                })         
        )
    })

    it('should fail when incorrect inputs are introduced', () => {
        try{
            registerUser(1, surname, email, password)          
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try{
            registerUser( '', surname, email, password)          
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try{
            registerUser(name, 1, email, password)          
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try{
            registerUser( name, '', email, password)          
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try{
            registerUser(name, surname, 1, password)          
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try{
            registerUser( name, surname, '', password)          
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }

        try{
            registerUser(name, surname, email, 1)          
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try{
            registerUser( name, surname, email, '')          
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }
    })

    afterEach(() => users.deleteMany())
    after(() => users.deleteMany().then(() =>mongo.disconnect()))
        
})