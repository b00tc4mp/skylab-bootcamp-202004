require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const addDish = require('./add-dish')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')
const { UnexistenceError, CredentialsError } = require('qrmenu-commons/errors')

describe('server-logic add dish ',() => {
    
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, name, surname, _password, workerId, dishName, description, price, tags, hash 

    beforeEach(async() => {
        
        await Establishment.deleteMany()
        
           
        establishment = `establishment-${random()}`
        nif =  generateNIF()
        email = `e-${random()}@mail.com`
        password = `password${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        _password = `password-${random()}`
        dishName = `dish-${random()}`
        description = `description-${random()}`
        price = random()
        tags = [`tag-${random()}`,`tag-${random()}`,`tag-${random()}`]

        hash = await bcrypt.hash(password, 10)
                // .then(_hash => hash = _hash )
                // .then(establishment => establishmentId = establishment._id.toString()) 
                // .then(() => bcrypt.hash(_password,10))
                // .then(hash => Establishment.findByIdAndUpdate(establishmentId, {$set:{staff: [{name,surname, password: hash}]}}))
                // .then(() => Establishment.findById(establishmentId))
                // .then(({staff}) => {

                //     const worker = staff.find(_worker => _worker.name === name && _worker.surname === surname )
                    
                //     workerId = worker._id.toString()

                // }) 
    })

    describe('', () => {

        beforeEach(async() => {
            
            const _establishment = await Establishment.create({establishment, nif, staff: {email, role: "owner", password: hash}})
            establishmentId = _establishment.id
                
            workerId = _establishment.staff[0].id
            
        })
        it('should succed on add a dish to the dishes list', () => {
         
            addDish(establishmentId, workerId, dishName, description, price, tags)
                .then(() => {
                    
                    Establishment.findById(establishmentId)
                })
                .then(({dishes}) => {
                    const dish = dishes.find(_dish => _dish.name === dishName)
                    
                    expect(dish.name).to.exist
                    expect(dish.name).to.be.a('string')
                    expect(dish.name).to.equal(dishName)
                    expect(dish.description).to.exist
                    expect(dish.description).to.be.a('string')
                    expect(dish.description).to.equal(description)
                    expect(dish.price).to.exist
                    expect(dish.price).to.be.a('string')
                    expect(dish.price).to.equal(price)
                    expect(dish.tags).to.exist
                    expect(dish.tags).to.be.an('array')
                    expect(dish.tags).to.deep.equal(tags)
    
                })
                    
                
            
        })

        it('should fail on non passing a string as arguments', () => {
         
            try {
                
                addDish("5ef30217e22a4608f83d5d8f", workerId, dishName, description, price, tags)
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal('Establishment with id 5ef30217e22a4608f83d5d8f does not exist')

            }
                    
                
            
        })
        
        it('should fail on non passing a string as arguments', () => {
         
            try {
                
                addDish(establishmentId, "5ef30217e22a4608f83d5d8f", dishName, description, price, tags)
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(CredentialsError)
                expect(error.message).to.equal('can not add dishes to the menu with your working role')

            }
                    
                
            
        })
        
    
        
        it('should fail on non passing a string as arguments', () => {
                 
            expect(()=> addDish(null, workerId, dishName, description, price, tags)).to.throw(TypeError, "is not a string")
            expect(()=> addDish(establishmentId, null, dishName, description, price, tags)).to.throw(TypeError, "is not a string")
            expect(()=> addDish(establishmentId, workerId, null, description, price, tags)).to.throw(TypeError, "is not a string")
            expect(()=> addDish(establishmentId, workerId, dishName, null, price, tags)).to.throw(TypeError, "is not a string")
            expect(()=> addDish(establishmentId, workerId, dishName, description, price, null)).to.throw(TypeError, "is not an array")
        
        })
                
    })


    after(() => mongoose.disconnect())
})