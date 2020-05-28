const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
require('../utils/polyfills/json')
const { users: { deleteMany, create } } = require('../data')
const { UnexistenceError, CredentialsError, ForbiddenError } = require('../errors')
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')

describe.only('logic - update user', () => {
    let name, surname, email, password, userId

    beforeEach(done => {
        deleteMany(error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const user = { name, surname, email, password }

            create(user, (error, id) => {
                if (error) return done(error)

                userId = id

                done()
            })
        })

        it('should succeed on correct credentials', () => {
            let data = {name: name + 'new'} 

            return updateUser(userId, data)
                .then(user=>{
                    expect(user).to.exist
                    
                    expect(user.name).to.equal(name + 'new')
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email) 
                }) 
        })

        it('should succeed if user attempts to change password and oldPassword is correct', () => {
            let data = {"password": "123", oldPassword: password}
            
            return updateUser(userId, data)
                .then((user)=>{ debugger
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    
                    fs.readFile(path.join(__dirname, "..","data", "users", `${userId}.json`), (error, data)=>{
                        data = JSON.parse(data)
                        expect(data.password).to.equal("123")
                    })
                })
                .catch(error=>{throw error})
        })

        it('should fail if user attempts to change password and no oldPassword is introduced', () => {
            let data = {password: "123"}
            try{
                updateUser(userId, data)
                    .then(()=>{throw new Error("Should not be here")})

            }catch(error){
                expect(error).to.be.an.instanceOf(CredentialsError)
                expect(error.message).to.equal("oldPassword is required")
            }
        })

        it('should fail if user attempts to change email', () => {
            let data = {email: "123@abc.com"}
            try{
                updateUser(userId, data)
                    .then(()=>{throw new Error("Should not be here")})
                    
            }catch(error){
                expect(error).to.be.an.instanceOf(ForbiddenError)
                expect(error.message).to.equal("Email cannot be updated")
            }
        })

        it('should fail when incorrect credencials are introduced', () => {
            try{
                updateUser(userId, 1)
                    .then(()=>{throw new Error("Should not be here")})        
            }catch(error){
                expect(error).to.be.an.instanceOf(TypeError)
                
                expect(error.message).to.equal("1 is not a JSON")
            }

            try{
                updateUser(1, {name: "123"})
                    .then(()=>{throw new Error("Should not be here")})        
            }catch(error){
                expect(error).to.be.an.instanceOf(TypeError)
                
                expect(error.message).to.equal("1 is not a string")
            }
        })
    })

    describe('when user does not exist', ()=>{
        it('should fail when user does not exist', () =>{ 
            let userId = uid()

            return updateUser(userId, {name, surname})
                .then(()=>{throw new Error("Should throw error")})
                .catch(error=>{
                    expect(error).to.be.an.instanceof(Error)
                })
            })
    })
        
    afterEach(done => {
        deleteMany(error => {
            if (error) return done(error)
            
            done()
        })
    })
})