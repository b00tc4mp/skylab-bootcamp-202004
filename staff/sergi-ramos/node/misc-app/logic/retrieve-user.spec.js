const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const retrieveUser = require('./retrieve-user')
const { expect } = require('chai')
require('../utils/json')


describe('logic - retrieve-user', () => {
    const data = path.join(__dirname, '..', 'data')
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), ".json", error => {
            debugger
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            userId = uid()

            const newUser = { name, surname, email, password, userId }

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(newUser), error => {
                if (error) throw new Error(error)

                done()
            })
        })
    })
    
    it('should succeed on retrieve user ', done => {
        retrieveUser(userId, (error, user) => {
            const { name, surname, email } = user

            expect(user.userId).to.be.undefined
            expect(error).to.be.null
            expect(name).to.equal(name)
            expect(surname).to.equal(surname)
            expect(email).to.equal(email)

            done()
        })
    })

    it('should fail when user does not exist', done => {
        
        const _userId = 'userId'
        
        retrieveUser(_userId, (error, user) => {
            expect(user).to.be.undefined
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with id:${_userId} does not exist`)

            done()
        })
    })

    afterEach(done => {

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            done()
        })
    })
})