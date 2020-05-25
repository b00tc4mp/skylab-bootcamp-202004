
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const listContact = require('../logic/list-contacts')

describe('listContact', () => {
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

                    const file = `${uid()}.json`
                    contact.user = id;
                    
                    fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', file), JSON.prettify(contact), error => {
                        if (error) return callback(error)
                
                        done()
                    })
                })
            })

        })
        
    })

    it('Sould sucess to list a contact',done=>{
        listContact(id,(error,contacts)=>{
            const [{name:_name ,surname:_surname,email:_email ,phone:_phone,birth:_birth,user:_id}] = contacts
            expect(error).to.be.null

            expect(contacts).to.be.instanceof(Array)
            expect(contacts.length).to.be.greaterThan(0)
            expect(_name).to.equal(contact.name)
            expect(_surname).to.equal(contact.surname)            
            expect(_email).to.equal(contact.email)
            expect(_phone).to.equal(contact.phone)
            expect(_birth).to.equal(contact.birth)
            expect(_id).to.equal(contact.user)
            
            done()
        })
    })

    it('Sould fail wend don`t exist userId',done =>{

    const __id = uid()
    listContact(__id,(error, contacts) => {            
        expect(error).to.exist
        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.equal(`user with ${__id} does not exist`)
        expect(contacts).to.be.undefined

        done()
      
        })
    })
 

    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
             
            deleteFilesByExtensionFromDirectory(path.join(data, 'contacts'), '.json', error => {
                if (error) return done(error)
                    done()
            })
        })
    })    

})

    
