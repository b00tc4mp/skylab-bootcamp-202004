require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL }} = process
const { errors: { DuplicityError, VoidError, UnexsistenceError }} = require('plates-commons')
const {models: { User, Restaurant, Dish }} = require('plates-data')
const { random } = Math
const { expect } = require('chai')
const bcrypt = require('brcyptjs')
const searchPlate = require('./search-plate')

describe('server logic: search plate', () =>{
    let restaurantName, restaurantEmail, cif, address, phone, userEmail, password, query
    let dishesIds =[]
    let dishes = []

    before( async() =>{
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

    it('should succeed on correct data', async () =>{
        query = dishes[0]

        _dish = await searchPlate(query)



    })



    it('should fail on wrong data')
})