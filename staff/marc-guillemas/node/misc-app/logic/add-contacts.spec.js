const { random } = Math
const path = require('path')
const fs = require('fs')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const authenticate = require('./authenticate')
const { expect } = require('chai')
require('../utils/json')
const addContact = require('./add-contact')
const { find } = require('../data/contacts')

describe('logic - add-contact', () => {

    const data = path.join(__dirname, '..', 'data')
    let name, surname, email, password, userId, phone, birthdate, country 
    let newContact

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), ".json", error => {
            if (error) return done()
            deleteFilesByExtensionFromDirectory(path.join(data, 'users'), ".json", error => {
                debugger
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()
                phone = uid()
                birthdate = '2010-05-10'
                country = `country-${random()}`

                const newUser = { name, surname, email, password, userId }

                newContact = { name, surname, email, phone, birthdate, country }

                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(newUser), error => {
                    if (error) throw new Error(error)

                    done()
                })
            })
        })
    })

    it('should succed on add a contact', done => {

        addContact(userId, newContact, (error, id) => {
            expect(error).to.be.null
            expect(id).to.exist
            expect(id).to.be.a('string')
            find({ userId }, (error, [contact]) => {
                expect(error).to.be.null
                expect(contact).to.exist
                expect(contact.idContact).to.be.a('string')
                expect(contact.userId).to.equal(userId)
                expect(contact.name).to.equal(name)
                expect(contact.surname).to.equal(surname)
                expect(contact.phone).to.equal(phone)
                expect(contact.birthdate).to.equal(birthdate)
                expect(contact.country).to.equal(country)

                done()
            })
        })
    })

    it('should fail when the contact to add is  ', () => {

        expect(() => { addContact(userId, undefined, () => {  }) }).to.throw(TypeError, (undefined + " is not an object"))

    })

    it('it should when user dont exist', done => {
        const fakeId = '12345'
        addContact(fakeId,newContact, (error, id) => {


            expect(error).to.exist
            expect(id).to.be.undefined

            done()
        })

})

afterEach(done => {
    deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), ".json", error => {
        if (error) return done(error)
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            done()
        })
    })
})
})



