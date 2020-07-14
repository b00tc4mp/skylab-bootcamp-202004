require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const addDishesToOrder = require('./add-dishes-to-order')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const table = require('qrmenu-data/models/schemas/table')
const { before } = require('mocha')
const { UnexistenceError } = require('qrmenu-commons/errors')


describe('server-logic add-dishes-to-order', () => {

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
            await Establishment.findByIdAndUpdate(establishmentId, {$set: {orders: {tableId, table}}})

        })

        it('should succed on retrieve all tables from the establishment', async() => {
           
            await addDishesToOrder(establishmentId, tableId, [dishId])

            const {orders: _orders} = await Establishment.findById(establishmentId)
            
            expect(_orders).to.exist
            expect(_orders).to.be.an('array')
            expect(_orders[0]).to.exist
            expect(_orders[0].table).to.equal(table)
            expect(_orders[0].tableId.toString()).to.equal(tableId)
            expect(_orders[0].dishStatus[0]).to.exist
            expect(_orders[0].dishStatus[0].dish.toString()).to.equal(dishId)
        })

        it('should fail on wrong establisment Id', async() => {
            
                
            try {
                await addDishesToOrder("5eedfc3256012e6c3dbb7cbe", tableId,[dishId])
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Establishment with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })

        it('should fail on wrong worker Id', async() => {
            
                
            try {
                await addDishesToOrder(establishmentId, "5eedfc3256012e6c3dbb7cbe", [dishId])
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal("Table with id 5eedfc3256012e6c3dbb7cbe does not exist")
            }            

        })
       
        it('should fail on non passing a string or array as arguments', async() => {
              
            expect(() => addDishesToOrder(null, tableId, [dishId])).to.throw(TypeError, "is not a string")
            expect(() => addDishesToOrder(establishmentId, null, [dishId])).to.throw(TypeError, "is not a string")
            expect(() => addDishesToOrder(establishmentId, tableId, null)).to.throw(TypeError, "is not an array")
            
        })



    })

    after(async() => {
        await Establishment.deleteMany()
        await mongoose.disconnect()
    })
})