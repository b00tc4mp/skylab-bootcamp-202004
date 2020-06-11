require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {Establishment} } = require('qrmenu-data')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const { addDish } = require('./add-dish')
const {random} = Math
const bcrypt = require('bcryptjs')
const {expect} = require('chai')

describe('server-logic add dish ',() => {
    
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, name, surname, _password, workerId, dishName, description, price, tags 

    beforeEach(() => {
        Establishment.deleteMany()
        .then(() => {
           
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

            bcrypt.hash(password, 10)
                .then(hash =>  Establishment.create({establishment, nif, email, password: hash}))
                .then(establishment => establishmentId = establishment._id.toString()) 
                .then(() => bcrypt.hash(_password,10))
                .then(hash => Establishment.findByIdAndUpdate(establishmentId, {$set:{staff: [{name,surname, password: hash}]}}))
                .then(() => Establishment.findById(establishmentId))
                .then(({staff}) => {

                    const worker = staff.find(_worker => _worker.name === name && _worker.surname === surname )
                    
                    workerId = worker._id.toString()

                }) 

                
        })
    })

    it('should succed on add a dish to the dishes list', () => {
        try {
            addDish(establishmentId, workerId, dishName, description, price, tags)
                .then(() => {
                    debugger
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
                
            
        } catch (error) {
            
        }
    })

    after(() => mongoose.disconnect())
})