require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment, Order} } = require('qrmenu-data')
const retrieveOrderDishes = require('./retrieve-order-dishes')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const table = require('qrmenu-data/models/schemas/table')
const { before } = require('mocha')
const { UnexistenceError } = require('qrmenu-commons/errors')


describe('server-logic retrieve-order-dishes', () => {

    before(async() => {
       await mongoose.connect(MONGODB_URL)
       await Establishment.deleteMany()
    })

    let establishment, nif, email, password, table, active, hash, establishmentId, workerId, tableId, dishId, name, description, price, tags

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
        tags = [`tag-${random()}`, `tag-${random}`]

        table = Math.floor(random()*10)
        active = true

    })


    describe('on correct request', () => {
        
        beforeEach(async() => {
            const _hash = await bcrypt.hash(password, 10)
            hash = _hash
            const _establishment = await Establishment.create({establishment, nif, staff: [{email, role: 'owner', password: hash }], tables: [{table, active}], dishes: [{name, description, price, tags}]})

            establishmentId = _establishment.id 
            tableId = _establishment.tables[0].id
            dishId = _establishment.dishes[0].id
            const test = await Establishment.findByIdAndUpdate(establishmentId, {$set: {orders: {tableId, dishStatus: [{dish: dishId}]}}})
          
        })

        it('should succed on retrieve all dishes from the order', async() => {
            
            const _dishes = await retrieveOrderDishes(establishmentId, tableId, [dishId, dishId])

            expect(_dishes).to.exist
            expect(_dishes).to.be.an('array')
            expect(_dishes[0]).to.exist
            expect(_dishes[0]).to.equal(name)
        })

        it('should fail on wrong establisment Id', async() => {
            
                
            try {
                await retrieveOrderDishes("5eedfc3256012e6c3dbb7cbe", tableId, [dishId, dishId])
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })

        it('should fail on wrong dishes ids', async() => {
            
                
            try {
                await retrieveOrderDishes(establishmentId, tableId, ["5ef21de56317a5415dc2baae"])
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal('No dishes with this ids')
            }            

        })
    })

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})