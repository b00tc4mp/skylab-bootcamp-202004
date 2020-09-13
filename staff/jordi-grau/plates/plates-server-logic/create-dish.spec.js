require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL} } = process
const { expect } = require('chai')
const {mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const { UnexistenceError, VoidError, DuplicityError } = require('plates-commons/errors')
const createDish = require('./create-dish')
const { random } =  Math
const bcrypt = require('bcryptjs')
const dish = require('plates-data/models/schemas/dish')

describe('create dish inserts a new dish on dishes db',() =>{
    let  userEmail, password, userId
    let restaurantName, restaurantEmail, cif, adress, phone
    let dishName, position, price
    let tags = []

    before(async() =>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach( async() =>{
        
        userEmail = `useremail-${random()}@mail.com`
        password = `password-${random()}`
        const hash = await bcrypt.hash(password, 10)
        restaurantName = `restaurantname-${random()}`
        adress= `address-${random()}`
        restaurantEmail = `restaurantemail-${random()}@mail.com`
        cif = `cif-${random()}`
        phone = random() * 1000000000
        dishName = `dishName-${random()}`
        position = `position-${random()}`
        tags = [`tag1-${random()}`, `tag2-${random()}`, `tag3-${random()}`, `tag4-${random()}`]
        price = random() * 20

        const { id } = await User.create({email: userEmail, password: hash })
        userId = id

        const {_id } =  await Restaurant.create({ name: restaurantName, address: adress, email: restaurantEmail, cif: cif, phone: phone})  
        restaurantId = _id.toString()
    })

describe('asyncronous test',() =>{
    it('should create a new dish on db dishes', async() => {
        debugger
        await createDish(restaurantId, dishName ,position, tags, price)
        const dish  = await Dish.findOne({restaurantId, name: dishName})
debugger
            expect(dish.restaurantId).to.equal(restaurantId)
            expect(dish.name).to.equal(dishName)
            expect(dish.position).to.equal(position)
            expect(dish.tags.length).to.equal(4)
            expect(dish.tags[0]).to.equal(tags[0])
            expect(dish.tags[1]).to.equal(tags[1])
            expect(dish.tags[2]).to.equal(tags[2])
            expect(dish.tags[3]).to.equal(tags[3])
            expect(dish.price).to.equal(price)
        })    


    it('should insert a new dish on a existing restaurant', async()=>{
        
       let dish = await Dish.create({restaurantId, name: dishName, position, tags, price})
        await Restaurant.findByIdAndUpdate(restaurantId,{$addToSet:{dishes:dish._id}})
        dishId = dish._id.toString()

        const newDishName = 'new--' + dishName
        const newPosition = 'new--' + position
        const newTags = [
            'new--' + tags[0], 
            'new--' + tags[1], 
            'new--' + tags[2], 
            'new--' + tags[3] 
        ]
        newPrice = price + 100

        dish = await Dish.findOne({restaurantId, name: dishName})

        await createDish(restaurantId, newDishName, newPosition,newTags, newPrice)
        const newDish = await Dish.findOne({restaurantId, name: newDishName})
       
        const newDishId = newDish._id.toString()
      
        const restaurant = await Restaurant.findById(restaurantId)
        
        expect(restaurant.dishes[0].toString()).to.equal(dishId)
        expect(restaurant.dishes[1].toString()).to.equal(newDishId)
    })

    
    it('sholud not duplicate an existing dish', async() =>{
        let dish = await Dish.create({restaurantId, name: dishName, position, tags, price})

        await Restaurant.findByIdAndUpdate(restaurantId,{$addToSet:{dishes:dish._id}})
        dishId = dish._id.toString()

        const newDishName =  dishName
        const newPosition =  position
      
        dish = await Dish.findOne({restaurantId, name: dishName})
        try{
            await createDish(restaurantId, dishName, position, tags, price)           
        }catch(error){
            expect(error).to.exist
            expect(error).to.be.instanceof(DuplicityError)
            expect(error.message).to.equal(`Dish with name ${newDishName}, and position ${newPosition} in restaurant with id ${restaurantId} already exists`)
        }
    })
    
    it('should not create a dish on wrong data', async() =>{
        await  Restaurant.deleteMany()
        try {
            await createDish(restaurantId, dishName, position, tags, price)
        } catch(error) {
            expect(error).to.exist
            expect(error).to.be.instanceof(UnexistenceError)
            expect(error.message).to.equal(`Restaurant with id ${restaurantId} does not exist`)           
        }

    })
})
  
    after(async() =>{
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
        await mongoose.disconnect()
    })
})