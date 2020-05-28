const retrieveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create } } = require('../data')

describe('logic - retrieve user', () => {
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteMany(error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const user = { name, surname, email, password }

            create(user, (error, id) => {
                if (error) return done(error)

                userId = id

                done()
            })
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

        it('should fail on wrong user id', () => {
            userId += 'wrong-'

            return retrieveUser(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })

    it('should fail when user does not exist', () => {
        const userId = 'unexisting'

        return retrieveUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            })
    })

    afterEach(done => {
        deleteMany(error => {
            if (error) return done(error)

            done()
        })
    })
})