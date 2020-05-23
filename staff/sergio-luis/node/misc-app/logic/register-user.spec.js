const register = require('./register-user');
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')

describe('registerUser', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            name = `name-${random()}`;
            surname = `surname${random()}`;
            email = `${random()}@mail.com`;
            password = `${random()}` ;

            done()
        })
    })


    it('Sould sucess to creat a new user',done=>{
        
        register({name,surname,email,password},(error, id)=>{
            
            expect(error).to.be.null
            expect(id).to.exist

            fs.readFile(path.join(__dirname,'..','data','users',`${id}.json`), 'utf-8',(error,body)=>{
                expect(error).to.be.null
                const {name: _name , surname:_surname,email:_email, password:_password ,id:_id}= JSON.parse(body);
           
                expect(name).to.equal(_name)
                expect(surname).to.equal(_surname)
                expect(email).to.equal(_email)
                expect(password).to.equal(_password)
                expect(id).to.equal(_id)

                done()
            })
        })
    })

    it('Sould fail wend user already exist',done=>{

        const _name = `name-${random()}`;
        const _surname = `surname${random()}`;
        const _email = `${random()}@mail.com`;
        const _password = `${random()}` ;
        const _id = uid()
        const newUser = {name:_name,surname:_surname,email:_email,password:_password,id:_id};

        fs.writeFile(path.join(data, 'users', `${_id}.json`), JSON.prettify(newUser), error => {
            expect(error).to.be.null 
            
            register(newUser,(error, id)=>{
                expect(error).to.be.an.instanceof(Error);
                expect(id).to.be.undefined
                expect(error.message).to.equal(`user with e-mail ${_email} already exists`);
                done()
            })
        })
    })
    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})

    

  