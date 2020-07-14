require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const retrieveTables = require('./retrieve-tables')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const table = require('qrmenu-data/models/schemas/table')
const { before } = require('mocha')
const { UnexistenceError } = require('qrmenu-commons/errors')


describe('server-logic retrieve-tables', () => {

   before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, table, hash, establishmentId, workerId, tableId

    beforeEach(async() => {
        await Establishment.deleteMany()

        establishment = `establisment-${random()}`
        nif = `${generateNIF()}`
        email = `mail-${random()}@mail.com`
        password = `password-${random()}`

        table = Math.floor(random()*10)

    })


    describe('', () => {
        beforeEach(async() => {
            const _hash = await bcrypt.hash(password, 10)
            hash = _hash
            const _establishment = await Establishment.create({establishment, nif, staff: [{email, role: 'owner', password: hash }], tables: [{table}]})
            establishmentId = _establishment.id 
            workerId = _establishment.staff[0].id 
            tableId = _establishment.tables[0].id
        })

        it('should succed on retrieve all tables from the establishment', async() => {
            
            const _tables = await retrieveTables(establishmentId, workerId)

            expect(_tables).to.be.an('array')
            expect(_tables[0]).to.exist
            expect(_tables[0].table).to.equal(table)
            expect(_tables[0].id).to.equal(tableId)
          
        })

        it('should fail on wrong establisment Id', async() => {
            
                
            try {
                await retrieveTables("5eedfc3256012e6c3dbb7cbe", workerId)
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })

        it('should fail on wrong worker Id', async() => {
            
                
            try {
                await retrieveTables(establishmentId, "5eedfc3256012e6c3dbb7cbe")
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Worker with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })
    })

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})