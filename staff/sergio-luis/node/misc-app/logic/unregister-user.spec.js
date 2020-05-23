const { random } = Math
const fs = require('fs')
const path = require('path')
const {deleteFilesByExtensionFromDirectory} = require('../utils/files.js')
const { expect } = require('chai')
const uid = require('../utils/uid')
const unregister = require('../logic/unregister-user')

describe('unregisterUser', () => {
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


    it('Sould sucess to eliminated a user',done=>{
        const user = {email,password}

        unregister(user, (error, message) => {
            expect(error).to.be.null
            expect(message).to.exist
            expect(message).to.equal(`Deleted user ${email}`)

            done()
        })
    })

    it('Sould fail wend email don`t exist',done=>{
        const _email = `${random()}@mmail.com`;
        const user = {email:_email,password}

        unregister(user, (error, message) => {
            expect(error).to.be.an.instanceof(Error);
            expect(message).to.be.undefined
            expect(error.message).to.equal(`user with e-mail ${_email} does not exist`);

            done()
        })
    })
    it('Sould fail on incorrect password',done=>{
        const _password = `${random()}`
        const user = {email,password:_password}

        unregister(user, (error, message) => {
            expect(error).to.be.an.instanceof(Error);
            expect(message).to.be.undefined
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

    