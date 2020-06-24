require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment, Order}, obje } = require('qrmenu-data')
const retrieveOrders = require('./retrieve-orders')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const table = require('qrmenu-data/models/schemas/table')
const { before } = require('mocha')
const { UnexistenceError } = require('qrmenu-commons/errors')


describe('server-logic retrieve-orders', () => {

    before(async() => {
       await mongoose.connect(MONGODB_URL)
       await Establishment.deleteMany()
    })

    let establishment, nif, email, password, table, active, hash, establishmentId, workerId, tableId, dishId, name, description, price, tags, orderId

    beforeEach(async() => {
        await Establishment.deleteMany()

        establishment = `establisment-${random()}`
        nif = `${generateNIF()}`
        email = `mail-${random()}@mail.com`
        password = `password-${random()}`

        //dish
        name = `dish-${random()}`
        description = `description-${random()}`
        price = Math.floor(random()*10)
        tags = [`tag-${random()}`, `tag-${random()}`]

        table = Math.floor(random()*10)
        active = true

    })


    describe('on correct request', () => {
        
        beforeEach(async() => {
            const _hash = await bcrypt.hash(password, 10)
            hash = _hash
            const _establishment = await Establishment.create({establishment, nif, staff: [{email, role: 'owner', password: hash }], tables: [{table, active}], dishes: [{name, description, price, tags}]})

            establishmentId = _establishment.id 
            tableId = _establishment.tables[0].id.toString()
            dishId = _establishment.dishes[0].id
            workerId = _establishment.staff[0].id
            await Establishment.findByIdAndUpdate(establishmentId, {$set: {orders: {tableId, dishStatus: [{dish: dishId}]}}})
            
            const _orders = await Establishment.findById(establishmentId)

            
            orderId = _orders.orders[0].id
        })

        it('should succed on retrieve all dishes from the order', async() => {
            
            const _orders = await retrieveOrders(establishmentId, workerId)

            expect(_orders).to.exist
            expect(_orders).to.be.an('array')
            expect(_orders[0].tableId).to.equal(tableId)
            expect(_orders[0].dishStatus).to.be.an('array')
            expect(_orders[0].dishStatus[0].dish.toString()).to.equal(dishId)
            
        })

        it('should fail on wrong establisment Id', async() => {
            
                
            try {
                await retrieveOrders("5eedfc3256012e6c3dbb7cbe", workerId)
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })

        it('should fail on wrong worker ids', async() => {
            
                
            try {
                await retrieveOrders(establishmentId, "5eedfc3256012e6c3dbb7cbe")
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal('worker with id 5eedfc3256012e6c3dbb7cbe does not exist')
            }            

        })
    })

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})