require('dotenv').config()

const { env : { TEST_MONGODB_URL: MONGODB_URL} } = process

const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')

describe('logic - retrieve user', () => {
    let users

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))

    let name,surname,email,password,userId
    
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

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct user id', () =>
            retrieveUser(userId)
                .then(user => {
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.be.undefined
                })
        )
    })            
        
    it('should fail on wrong user id', () => {
        userId = '5ed1204ee99ccf6fae798aef'
         return retrieveUser(userId)
                .then(() => {throw new Error('should not reach that point')})
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`users doesn't exist`)
                })
        })
  


    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))

})