require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL }} = process
const { errors: { DuplicityError, VoidError, UnexsistenceError }} = require('plates-commons')
const {mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
const { random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
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
            dish = new Dish({name: `name-${i}`})
            await dish.save()
            
            dishesIds.push(dish.id)
            dishes.push(dish)      
        }
     
        await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone, dishes: dishesIds})
    })

    it('should succeed on correct data', async () =>{
         
        query = dishes[0].name

        const _dish = await searchPlate(query)
         
        
        expect(_dish).to.exist
        expect(_dish[0].name).to.be.equal('name-0')
        expect(_dish[0].restaurant).to.exist
    })


    it('should fail on wrong data', async() =>{
      query = dishes[0].name + "wrongSearch"

      const result = await searchPlate(query)

      expect(result.length).to.equal(0)
      
    })

    after(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ])

        await mongoose.disconnect()
    })
})