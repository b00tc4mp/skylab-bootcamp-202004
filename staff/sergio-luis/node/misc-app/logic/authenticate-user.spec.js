const register = require('./register-user');
const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const authenticated = require('../logic/authenticate-user')

describe('authenticatedUser', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            name = `name-${random()}`;
            
            surname = `surname${random()}`;
            email = `${random()}@mail.com`;
            password = `${random()}` ;
            id = uid()

            const newUser = {name,surname,email,password,id};

            fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                if (error) return done(error) 
                done()
            })
        })
    })


    it('Sould sucess to authenticate a user',done=>{
        const user = {email,password}

        authenticated(user, (error, id) => {
            expect(error).to.be.null
            expect(id).to.exist

            done()
        })
    })

    it('Sould fail wend email don`t exist',done=>{
        const _email = `${random()}@Email.com`;
        const user = {email:_email,password}

        authenticated(user, (error, id) => {
            expect(error).to.be.an.instanceof(Error);
            expect(id).to.be.undefined
            expect(error.message).to.equal(`user with e-mail ${_email} does not exist`);

            done()
        })
    })
    it('Sould fail on incorrect password',done=>{
        const _password = `${random()}`
        const user = {email,password:_password}

        authenticated(user, (error, id) => {
            expect(error).to.be.an.instanceof(Error);
            expect(id).to.be.undefined
            expect(error.message).to.equal('wrong password');

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

    

  