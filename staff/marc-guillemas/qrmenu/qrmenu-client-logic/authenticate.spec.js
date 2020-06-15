require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL  } } = process

const authenticate = require('./authenticate')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const { mongo, mongo: {ObjectId} } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const context = require('./context')
const staff = require('qrmenu-data/models/schemas/staff')
require('qrmenu-commons/ponyfills/xhr')
require('qrmenu-commons/ponyfills/atob')

context.API_URL = API_URL

describe.only('logic - authenticate', () => {
    let establishments
    before(() => mongo.connect(MONGODB_URL)
        .then(connection => establishments = connection.db().collection('establishments'))
    )

    let  establishment, nif, email, password, _workerId, hash

    beforeEach(() =>
        establishments.deleteMany()
            .then(() => {
                establishment = `establishment-${random()}`
                nif = `${generateNIF()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => {             
               
                hash = _hash
            })
    )

    
    describe('when worker already exists', () => {
        
        beforeEach(()=>{
            establishments.deleteMany()
            .then(() => establishments.insertOne({establishment, nif, staff: [{_id: ObjectId(), email, password: hash}]}))
            .then(({insertedId}) => {
                return establishments.findOne({_id: ObjectId(insertedId.toString())})
            })
            .then(({staff}) => {
                _workerId = staff[0]._id.toString()
            })
        })

        it('should succeed on valid data', () =>
            
            authenticate(nif, email, password)
                .then(token => { 
                    expect(token).to.exist
                    expect(token).to.be.a('string')
    
                    const [,payloadBase64] = token.split('.')
    
                    const payloadJson = atob(payloadBase64)
    
                    const payload = JSON.parse(payloadJson)
    
                    const {workerId} = payload
    
                    expect(workerId).to.equal(_workerId)
                })
        )

        it('should fail on wrong password', () => {
            password += '-wrong'

            return authenticate(nif, email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('wrong password')
            })

        })
    });
        


    describe('when worker does not exist', () => {
        
        beforeEach(() => establishments.insertOne({establishment, nif, staff: [{_id: ObjectId(), email, password: hash}]}))
        
        it('should fail on worker does not exist', () => {
            email = 'wrong-' + email 
            return authenticate(nif, email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`User with e-mail ${email} does not exist`)
            })
        })
    })

    afterEach(() => establishments.deleteMany())

    after(() => establishments.deleteMany({}).then(mongo.disconnect))
})