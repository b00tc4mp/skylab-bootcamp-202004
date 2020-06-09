require('dotenv').config()
const { env: { TEST_MONGOOSE_URL: MONGODB_URL } } = process
const { mongoose, models: {User} } = require('moove-it-data')

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const { errors: { DuplicityError }} = require('moove-it-commons')

describe('logic - register user', () => {
    before(() =>
        mongoose.connect(MONGODB_URL)
    )
    
    let name, surname, email, password
    
    beforeEach( async () => {
    
            await User.deleteMany()

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            })
        

    it('should succeed on valid data', async () => {
        const result = await registerUser(name, surname, email, password)
        const user = await User.findOne({ email })
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
            })               
    

    describe('when user already exists', () => {
        beforeEach(() => {
            return User.create({name, surname, email, password})
        })

        it('should fail on trying to register an existing user', () => 
            registerUser(name, surname, email, password) 
                .then(()=> {throw new Error( "Should throw error")})
                .catch(error=>{
                    expect(error).to.be.an.instanceof(DuplicityError)
                    expect(error.message).to.equal(`${email} already exist`)
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

    afterEach(() => User.deleteMany())
    after(mongoose.disconnect)
        
})