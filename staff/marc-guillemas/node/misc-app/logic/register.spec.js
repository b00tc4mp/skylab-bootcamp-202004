const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { expect } = require('chai')
const register = require('./register')

describe('logic - register-user', () => {
    const data = path.join(__dirname, '..', 'data')
    let name, surname, email, password

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), ".json", error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}` 

            done()
        })
    })

    it("should succeed", done => {
        register({ name, surname, email, password }, (error, id) => {
            expect(error).to.be.null
            expect(id).to.exist
            expect(id).to.be.a('string')
            fs.readFile(path.join(data, 'users', `${id}.json`), (error, body) => {
                expect(error).to.be.null
                body = JSON.parse(body)
                const { name: _name, surname: _surname, email: _email, password: _password, userId: _id } = body

                expect(name).to.equal(_name)
                expect(surname).to.equal(_surname)
                expect(email).to.equal(_email)
                expect(password).to.equal(_password)
                expect(_id).to.equal(id)

                done()
            })
        })
    })

    it('should fail when user already exist', done => {

        const id = uid()

        fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify({ name, surname, email, password }), error => {
            if (error) return done()

            register({ name, surname, email, password }, error => {

                expect(error.message).to.equal('user already exists')

                done()
            })
        })
    })

    
    afterEach(done => {

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)


            done()
        })
    })
})