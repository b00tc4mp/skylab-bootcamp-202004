require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongo } = require('../data')

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')

describe('logic - retrieve user', () => {
    let users 

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))
    
    let name, surname, email, password, userId
    
    beforeEach(() => 
        users.deleteMany() 
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }
            return users.insertOne(user).then(user=>userId = user.insertedId.toString())
        })

        it('should succeed on correct user id', () => 
            retrieveUser(userId)
                .then(user=> {
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                })   
        )

        it('should fail on wrong user id', () => 
            retrieveUser('5ed43b913578a050d5600ee0')
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id 5ed43b913578a050d5600ee0 does not exist`)
                })
        )
    })

    it('should fail on wrong user id', () => 
        retrieveUser('5ed43b913578a050d5600ee0')
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id 5ed43b913578a050d5600ee0 does not exist`)
            })
    )

    it('should fail when incorrect inputs are introduced', () => {
        try{
            retrieveUser(1)          
        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try{
            retrieveUser('')          
        }catch(error){
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is empty or blank`)
        }
    })

    afterEach(() => users.deleteMany())
    after(()=>users.deleteMany().then(mongo.disconnect))

})