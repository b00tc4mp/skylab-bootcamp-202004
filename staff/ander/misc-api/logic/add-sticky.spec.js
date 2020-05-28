
const { deleteFilesByExtensionFromDirectory } = require("../utils/files");
const addSticky = require("./add-sticky")
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const uid = require('../utils/uid')

describe('addSticky', () => {
    let name, surname, email, password, userId
    const data = path.join(__dirname, '..', 'data')

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()

                const user = { name, surname, email, password,id:userId }
                
                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                    if (error) return done(error)

                    done()
                })
            })
        })
    })

    it('should succeed on valid data', done => {
        const text ={message:"hello"}
        addSticky(userId,  text , (error, id) => {
            expect(id).to.be.a('string')

            fs.readFile(path.join(__dirname, '..', 'data', 'stickies', `${id}.json`), 'utf8', (error, content) => {

                debugger
                expect(error).to.be.null

                expect(content).to.exist

                const sticky = JSON.parse(content)

                expect(sticky.message).to.equal("hello")
                expect(sticky.userId).to.equal(userId)
                done()
            })
        })
    })
})

