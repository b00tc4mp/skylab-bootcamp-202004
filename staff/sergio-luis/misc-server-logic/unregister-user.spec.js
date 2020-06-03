const { random } = Math
const { errors:{VoidError} } = require('misc-commons')
const { expect } = require('chai')
const unregister = require('../logic/unregister-user')
const { mongo } = require('misc-data')
const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process

describe('unregisterUser', () => {
    let name, surname, email, password, userId, users

    before(() => mongo.connect(MONGODB_URL).then(connection => users = connection.db().collection('users')))
   
    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                return users.insertOne({name,surname,email,password})
            })
            .then(result =>userId = result.insertedId.toString())  
    )

    describe('When user already exists', ()=>{
        it('Should succeed to eliminate a user',()=>
            unregister(userId,email,password) 
                .then(message =>{
                    expect(message).to.exist
                    expect(message).to.equal(`Deleted user ${email}`)
                })
        )
    })

    describe('When inputs are wrong', ()=> {
        
        it('Should fail when email does not exist',()=>{
            const _email = `${random()}@mail.com`;

            unregister(userId, _email, password)
                .then(()=> {throw new Error("should not reach this point")})
                .catch(error =>{
                    expect(error).to.be.an.instanceof(Error);
                    expect(error.message).to.equal(`user with e-mail ${_email} does not exist`);
                })
            
        })
    
        it('Should fail on incorrect password',()=>{
            const _password = `${random()}`
    
            unregister(userId, email, _password)
                .then(()=>{throw new Error("should not reach this point")})
                .catch(error =>{
                    expect(error).to.be.an.instanceof(Error);
                    expect(error.message).to.equal(`wrong password`);
                })     
            
        })

        it('should fail when inputs do not match the format', () => {
            let _userId = ''
    
            expect(() => {
                return unregister(_userId, email, password)
            }).to.throw(VoidError, `${_userId} is empty or blank`)
    
            _userId = 1
    
            expect(() => {
                return unregister(_userId, email, password)
            }).to.throw(TypeError, `${_userId} is not a string`)

            let _email = 'dsgfj'
    
            expect(() => {
                return unregister(userId, _email, password)
            }).to.throw(Error, `${_email} is not an e-mail`)

            _email = ''
    
            expect(() => {
                return unregister(userId, _email, password)
            }).to.throw(VoidError, `${_email} is empty or blank`)
    
            _email = 1
    
            expect(() => {
                return unregister(userId, _email, password)
            }).to.throw(TypeError, `${_email} is not a string`)

            _password = ''
    
            expect(() => {
                return unregister(userId, email, _password)
            }).to.throw(Error, `length is not greater or equal than 8`)
    
            _password = 1
    
            expect(() => {
                return unregister(userId, _email, _password)
            }).to.throw(TypeError, `${_password} is not a string`)
        })    
        
    })

      
    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})

    