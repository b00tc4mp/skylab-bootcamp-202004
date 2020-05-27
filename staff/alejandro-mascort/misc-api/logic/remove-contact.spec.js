const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const removeContact = require('../logic/remove-contact')

describe('removeContact', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id,contact

    beforeEach(done =>{
        contact = {
            name: 'Pepito',
            surname: 'Grillo',
            email: 'pepigri@mail.com',
            phone: '+34 123 123 123',
            birth: '12/12/2020',
            country: 'Spain',
            contactId: uid()
        }

        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)
           
                name = `name-${random()}`;
                surname = `surname${random()}`;
                email = `${random()}@mail.com`;
                password = `${random()}` ;
                id = uid()
    
                const newUser = {name,surname,email,password,id};
    
                fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                    if (error) return done(error) 

                    const file = `${contact.contactId}.json`

                    contact.user = id;
        
                    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
                        if (error) return callback(error)
                
                        done()
                    })
                })
            })

        })
        
    })


    it('Sould sucess to remove a contact',done=>{

        removeContact(id, contact, (error, message) => {
            expect(error).to.be.null
            expect(message).to.exist
            expect(message).to.equal(`Deleted user ${contact.name}`)

            done()
        })
    })

    it('Sould fail wend id don`t exist',done=>{
        const _id = `${id}-id`

        removeContact(_id, contact, (error, message) => {
            expect(message).to.be.undefined
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal(`user with id: ${_id}, does not exist`)
            
            done()
        })
    })

    it('Sould fail wend contactId don`t exist',done=>{
        let _contact = contact
        _contact.contactId = uid()
       
        removeContact(id, _contact, (error, message) => {
            expect(message).to.be.undefined
            expect(error).to.exist
            expect(error).to.instanceof(Error)
            expect(error.message).to.equal(`this ${_contact.contactId} does not exist`)
    
            done()
        })
    })
    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})

    