require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const assignNumOfTables = require('./assign-num-of-tables')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const { UnexistenceError } = require('qrmenu-commons/errors')

describe('server-logic assign-num-of-tables ',() => {
    
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, workerId, hash

    beforeEach(async() => {
        await Establishment.deleteMany()
        
           
        establishment = `establishment-${random()}`
        nif =  generateNIF()
        email = `e-${random()}@mail.com`
        password = `password${random()}`
        ntables = Math.floor(random()*50)

        hash = await bcrypt.hash(password, 10)
                
    })


    describe('correct credentials and add tables correctly', () => {
        beforeEach(async() => {
            const _establishment = await Establishment.create({establishment, nif, staff: [{email, role: "owner", password: hash}]})
            establishmentId = _establishment.id
            
            workerId = _establishment.staff[0].id
        })

        it('should succed on add n numbers of tables', async() => {
            await assignNumOfTables(establishmentId, workerId, ntables)

            const _establishment = await Establishment.findById(establishmentId)

            const {tables} = _establishment

            expect(tables).to.be.an('array')
            expect(tables).to.have.lengthOf(ntables)
        })
        
        it('should fail on wrong establishment id', async() => {
           
            try {
              await assignNumOfTables("5ef30217e22a4608f83d5d8f", workerId, ntables)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5ef30217e22a4608f83d5d8f does not exist")
            }
        })


        
    })

    
                    
    afterEach(() => Establishment.deleteMany())

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})