require('dotenv').config()
const {  env: {TEST_MONGODB_URL: MONGODB_URL} } = process
const { errors: { UnexistenceError }} = require('plates-commons')
const  { mongoose , models:{ User, Restaurant, Dish }}  = require('plates-data')
const {floor, random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const searchRestaurant = require('./search-restaurant')


describe('search ', () =>{
    let restaurantName, restaurantEmail, cif, address, phone, userEmail, password, query
    let dishesIds =[]
    let dishes = []

    before(async () =>{
        await mongoose.connect(MONGODB_URL)

        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()     
        ])

    })

    beforeEach( async() =>{
        restaurantName = `restaurantName-${random()}`
        restaurantEmail = `restaurantEmail-${random()}@email.com`
        cif = `cif-${random()}`
        address = `address-${random()}`
        phone = random() * 100000000
        userEmail = `useremail-${random()}@email.com`
        password = `password-${random()}`
        const hash = await bcrypt.hash(password, 10)

        const { id } = await User.create({ email: userEmail, password: hash })
        userId = id
        
        for(let i = 0; i < 5; i++){ 
            const dish = new Dish({name: `name-${i}`})
            
            dishesIds.push(dish.id)
            dishes.push(dish)      
        }

       

        await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone, dishes: dishesIds})
    
    })
 
    it('should succeed on correct data', async() =>{
        query = restaurantName
        let restaurant = await searchRestaurant(query)
        
        expect(restaurant.length).to.equal(1)
        expect(restaurant[0].name).to.equal(query)

        query = dishes[0].name
        restaurant = await searchRestaurant(query)
        
        expect(restaurant.length).to.equal(1)
        expect(restaurant[0].name).to.equal(restaurantName)
        
        query = cif
        restaurant = await searchRestaurant(query)
        
        expect(restaurant.length).to.equal(1)
        expect(restaurant[0].name).to.equal(restaurantName)
    })

    it('should fail on wrong data', async () =>{

        query = restaurantName + 'wrongName' 

        try {
            const restaurant = await searchRestaurant(query)
            
        } catch (error) {
            expect(error).to.exist
            expect(restaurant).to.be.null
            expect(error).to.be.instanceof(UnexistenceError)
            expect(error.message).to.equal(`no results with ${query} search`)
        }
    })

    it('should not find a restaurant if there is no matching', async()=>{
        let _error 

        try {
            searchRestaurant(query)
        } catch (error) {
            _error = error
            expect(error).to.exist
            expect(error).to.be.instanceof(UnexistenceError)
            expect(error.message).to.equal(`no results with ${query} search`)
        }
    })

    after(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ])

        await mongoose.disconnect()
    })
})