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


    it('Sould sucess to authenticate a user',()=>{
        const user = {email,password}

        return authenticated(user)
            .then(() => {})
    })

    it('Sould fail wend email don`t exist', () =>{
        const _email = `${random()}@Email.com`;
        const user = {email:_email,password}

        return authenticated(user)
            .then(() => {throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal(`user with e-mail ${_email} does not exist`);
            })
    })
    it('Sould fail on incorrect password',()=>{
        const _password = `${random()}`
        const user = {email,password:_password}

        authenticated(user)
            .then(() => {throw new Error('should not reach this point')})
            .catch(error => {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.equal('wrong password');
            })
    })

    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})

    

  