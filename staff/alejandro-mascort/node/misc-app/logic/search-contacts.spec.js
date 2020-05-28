const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const searchContact = require('../logic/search-contacts')

describe('searchContact', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id, contact

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

    describe('Sould sucess to search query',()=>{

        it('Sould sucess to search just one contact',done=>{
            const query = contact.name

            searchContact(id, query, (error,contacts)=>{
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
  
        
        it('Sould sucess to search two or more contact', done => {
            const __id = uid()

            const _contact = {
                name: 'Pepito',
                surname: 'Fernández',
                email: 'fer@mail.com',
                phone: '+34 456 456 456',
                birth: '08/08/2017',
                country: 'France',
                user: id
            }
            
            fs.writeFile(path.join(__dirname, '..', 'data', 'contacts', `${__id}.json`), JSON.prettify(_contact), error => {
                if (error) return callback(error)

                
                const query = contact.name

                searchContact(id, query, (error,contacts)=>{
                    expect(error).to.be.null
                    expect(contacts).to.be.instanceof(Array)
                    
                    expect(contacts.length).to.be.greaterThan(1)
                    let count = 0;
                    
                    contacts.forEach(({name:_name ,surname:_surname,email:_email ,phone:_phone,birth:_birth,user:_id})=>{
                        
                        expect(_name).to.exist
                        expect(_surname).to.exist          
                        expect(_email).to.exist
                        expect(_phone).to.exist
                        expect(_birth).to.exist
                        expect(_id).to.equal(id)

                        if(++count === contacts.length) done()
                    })
                })
            })
        })
    })

    it('Sould fail wend don`t exist userId',done =>{
        const query = contact.name
        const __id = uid()
        searchContact(__id, query,(error, contacts) => {            
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.equal(`user with ${__id} does not exist`)
            expect(contacts).to.be.undefined

            done()
        
        })
    })

    it('Sould fail on a un invalid query',done=>{
        const query = `${name}-name`

        searchContact(id, query, (error,contacts)=>{
            
            expect(error).to.be.null
            expect(contacts).to.be.instanceof(Array)
            expect(contacts.length).to.be.equal(0)
            
            done()
        })
    })

    it('Sould fail with empty id',()=>{   
        const emptyId = '';
        const query = contact.name
    
        expect(() => searchContact(emptyId, query, (error,contact)=>{})).to.throw(Error, 'is empty or blank')
    })

    it('Sould fail with empty query',()=>{   
        const emptyQuery = '';

        expect(() => searchContact(id, emptyQuery, (error,contact)=>{})).to.throw(Error, 'is empty or blank')

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

    
