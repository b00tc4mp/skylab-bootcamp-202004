const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const authenticateUser = require('../logic/authenticate-user')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')

describe('Authenticate-user', () => {
    let username, email, password, id
    const data = path.join(__dirname, '..', 'data')

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            username = `username-${random()}`
            email = `e-${random()}@mail.com`
            password = `${random()}pass`
            id = uid()
            const user = { username, email, password, id }
            fs.writeFile(path.join(data, 'users', `${id}.json`), JSON.prettify(user), error => {
                if (error) return callback(error)
                done()
            })    
        })
        
    })

    it('should succeed on valid data', done => {
        
        authenticateUser({email, password}, (error, user) => {
            expect(error).to.be.null
    
            expect(user).to.exist
            expect(user.username).to.equal(username)
            expect(user.id).to.equal(id)
            expect(user.email).to.equal(email)
        
            done()
        })
    })

    it('should fail when inputs do not meet the criteria', () => {
        expect(function(){
            authenticateUser({ username: 1, email}, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            authenticateUser({ username, email: 1}, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)

        expect(function(){
            authenticateUser({ username, email}, 1)
        }).to.throw(TypeError)

        expect(function(){
            authenticateUser(1, (error, id) => { 
                if(error) throw error
               
            })
        }).to.throw(TypeError)
    })

    afterEach(()=>{
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)
 
        })
    })
})
