require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const {utils: {jwtPromised}} = require('qrmenu-commons')


const retrieveDishes = require('./retrieve-dishes')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, table, active, hash, establishmentId, workerId, tableId, dishId, name, description, price, tags, orderId, token

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
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

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        
        beforeEach(() =>
            Establishment.create({ establishment, nif, staff: [{email, password: hash}], tables: [{active, table}], dishes: [{name,description,price,tags}] })
                .then(_establishment =>{
                    
                    establishmentId = _establishment.id 
                    tableId = _establishment.tables[0].id
                    dishId = _establishment.dishes[0].id
                })
        )

        it('should succed on passing a correct token', async() => {
                
            
            const _dishes = await retrieveDishes(establishmentId, tableId)
            
            expect(_dishes).to.exist
            expect(_dishes[0]._id).to.equal(dishId)
        })
        
        it('should fail on wrong establisment Id', async() => {
            token = "wrong"+token 
            try {
                
                await retrieveDishes(token)
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
            }            

        })
        
        it('should fail on wrong establisment Id', async() => {
            token = "wrong"+token 
            try {
                
                await retrieveDishes(token)
                throw new Error('Should not reach this point')
            } catch (error) {
                
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
            }            

        })
       

    })



    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})