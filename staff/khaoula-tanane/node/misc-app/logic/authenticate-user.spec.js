
const fs = require('fs')
const uid = require('../utils/uid')
const path = require('path')
const register = require('./register-user');
const { expect } = require('chai')
const { random } = Math
const authenticate = require('../logic/authenticate-user')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')

describe('authenticatedUser', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, id

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
            
            name = `name-${random()}`;
            
            surname = `surname${random()}`;
            email = `${random()}@email.com`;
            password = `${random()}` ;
            id = uid()

            const newUser = {name,surname,email,password,id};

            fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(newUser), error => {
                if (error) return done(error) 
                done()
            })
        })
    })


    it('Should succeed on authenticating an user',done=>{
        const user = {email,password}

        authenticate(user, (error, id) => {
            expect(error).to.be.null
            expect(id).to.exist

            done()
        })
    })

    it('Should fail when e-mail does not exist',done=>{
        const _email = `${random()}@Email.com`;
        const user = {email:_email,password}

        authenticate(user, (error, id) => {
            expect(error).to.be.an.instanceof(Error);
            expect(id).to.be.undefined
            expect(error.message).to.equal(`user with e-mail ${_email} does not exist`);

            done()
        })
    })
    it('Should fail on incorrect password',done=>{
        const _password = `${random()}`
        const user = {email,password:_password}

        authenticate(user, (error, id) => {
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