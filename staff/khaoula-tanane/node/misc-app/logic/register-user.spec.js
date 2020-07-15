
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


    
    afterEach(done=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })    

})