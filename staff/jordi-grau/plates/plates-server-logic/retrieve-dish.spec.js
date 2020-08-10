require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL} } = process
const { expect } = require('chai')
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
const { UnexistenceError, DuplicityError, VoidError} = require('plates-commons/errors')
const { random } =  Math
const bcrypt = require('bcryptjs')
const retrieveDish = require('./retrieve-dish')


describe('retrieve all info of a chosen dish', ()=>{
    let userEmail, password
    let restaurantName, address, cif, phone, restaurantEmail, dishId
    let tags = ['good taste', 'veggie', 'fresh', 'gluten free', 'cool']
    let dishesIds = [], prices = []

    before(async() =>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach( async() =>{
        userEmail = `userEmail--${random()}@mail.com`
        password = `password${random()}`
        const hash = await bcrypt.hash(password, 10)
        const { id } = await User.create({ email: userEmail, password: hash})
        const userId = id.toString()

        restaurantName = `restaurantName--${random()}`
        address = `adress--${random()}`
        cif = `cif--${random()}`
        phone = random() * 100000
        restaurantEmail = `restaurantEmail--${random()}@mail.com`
        const { _id } = await Restaurant.create({ owner: userId, name: restaurantName, address, cif, phone, email: restaurantEmail})
        const restaurantId = _id.toString()

        for(let i=0; i<9; i++){
            debugger
            const {_id, price} =  await Dish.create({restaurantId, name: `dishName-${i}`, position: `${i}`, tags, price:i })
            dishId = _id.toString()
            dishesIds.push(dishId)
            prices.push(price)
        }
    })

    describe('asynchronous test', () =>{
        it('should retrieve a dish searching by name', async() =>{
            
            const dish =  await retrieveDish(dishesIds[8])
            expect(dish.id.toString()).to.equal(dishesIds[8])
            expect(dishesIds.length).to.equal(9)
            expect(dish.name).to.equal('dishName-8')
            expect(dish.position).to.equal('8')
            expect(dish.tags[1]).to.equal('veggie')
            expect(dish.price).to.equal(prices[8])
        })       
    })

    describe('synchronous test', () => {
        it('should return an error on wrong id', async()=>{
            
            try {
                dishId = '5f31542f8d54a5218ec7abbe'
                let dish = await retrieveDish(dishId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`Dish with ${dishId} does not exist`)            
            }
        })
    })

})