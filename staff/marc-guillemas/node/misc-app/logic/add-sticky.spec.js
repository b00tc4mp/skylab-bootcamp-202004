const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { expect } = require('chai')
require('../utils/json')
const addSticky = require('./add-sticky')
const { find } = require('../data/stickies')

describe('logic - add-sticky', () => {

    const data = path.join(__dirname, '..', 'data')
    let name, surname, email, password, userId, title, comment, idSticky
    let newSticky

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), ".json", error => {
            if (error) return done()
            deleteFilesByExtensionFromDirectory(path.join(data, 'users'), ".json", error => {
                debugger
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()
                title = `title-${random()}`
                comment = `comment-${random()}`


                const newUser = { name, surname, email, password, userId }

                newSticky = { title, comment }

                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(newUser), error => {
                    if (error) throw new Error(error)

                    done()
                })
            })
        })
    })

    it('should succed on add sticky', done => {

        addSticky(userId, newSticky, (error, idSticky) => {
            expect(error).to.be.null
            expect(idSticky).to.exist
            expect(idSticky).to.be.a('string')
            find({ userId }, (error, [sticky]) => {
                expect(error).to.be.null
                expect(sticky).to.exist
                expect(sticky.idSticky).to.be.a('string')
                expect(sticky.userId).to.equal(userId)
                expect(sticky.title).to.equal(title)
                expect(sticky.comment).to.equal(comment)


                done()
            })
        })
    })

    it('should fail when the sticky to add is undefined', () => {

        expect(() => { addSticky(userId, undefined, () => { }) }).to.throw(TypeError, (undefined + " is not an object"))
    })

    it('it should when user dont exist', done => {
        const fakeId = '12345'
        addSticky(fakeId, newSticky, (error, idSticky) => {

            expect(error).to.exist
            expect(idSticky).to.be.undefined

            done()
        })
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'stickies'), ".json", error => {
            if (error) return done(error)
            deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
                if (error) return done(error)
                done()
            })
        })
    })
})


