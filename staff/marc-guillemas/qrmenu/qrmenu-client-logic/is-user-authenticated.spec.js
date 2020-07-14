require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
// const jwt = require('jwt')
const {utils: {jwtPromised}} = require('qrmenu-commons')


const isUserAuthenticated = require('./is-user-authenticated')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, hash, workerId, token

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
    // {establishmentId: establishment._id, workerId: user._id}
    describe('when user already exists', () => {
        
        beforeEach(() =>
            Establishment.create({ establishment, nif, staff: [{email, password: hash}] })
                .then(_establishment =>{ 
                    establishmentId = _establishment.id 
                    workerId = _establishment.staff[0].id
                })
                .then(() => jwtPromised.sign({establishmentId, workerId}, "SECRET", {expiresIn: '1d'}))
                .then(_token => token = _token)
        )

        it('should succeed on correct token', () => {

            isUserAuthenticated(token)
                .then(_isAuthenticated => {
                
                    expect(_isAuthenticated).to.be.true
                    
                })
           
        })

        it('should fail on wrong token', () => {
            token += "wrong"
            try { 
                isUserAuthenticated(token)
                    .then(() => {
                    
                        throw new Error('should not reach this point')
                     
                    })

            } catch (error) {
                expect(error).to.exist
            }
           
        })

       

    })



    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})