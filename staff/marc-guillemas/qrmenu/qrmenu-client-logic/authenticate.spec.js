require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticate = require('./authenticate')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe('logic - authenticate', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, hash

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
            establishment = `name-${random()}`
            nif =  generateNIF()
            email = `e-${random()}@mail.com`
            password = `password${random()}`

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        
        beforeEach(() =>
            Establishment.create({ establishment, nif, staff: [{email, password: hash}] })
                .then(_establishment => establishmentId = _establishment.id)
        )

        it('should succeed on correct credentials', () => {

            try {
                
                authenticate(nif, email, password)
                    .then(token => {
                        
                        expect(token).to.exist
                        expect(token).to.be.a('string')
                    })
            } catch (error) {
                expect(error).to.be.null
            }
        }
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'
            
            return authenticate(nif,email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })

    
        it('should fail on wrong email', () => {
            email = 'wrong-' + email
            
            try {
                authenticate(nif,email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    
            } catch (error) {
                    
   
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`User with e-mail ${email} does not exist`)
                  
            }
        })
        
        it('should fail on passing a wrong type of value as arguments' , () => {
            
            
            expect(()=> authenticate(null,email, password)).to.throw(Error, 'null is not a NIF')
            expect(()=> authenticate(nif,null, password)).to.throw(Error, 'null is not an e-mail')
            expect(()=> authenticate(nif,email, null)).to.throw(Error, 'null is not a string')
                    
    
        })




    })




    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})