require('dotenv').config()
const {  env: {TEST_MONGODB_URL: MONGODB_URL} } = process
const { errors: { UnexistenceError }} = require('plates-commons')
const  { mongoose , models:{ User, Restaurant, Dish }}  = require('plates-data')
const {floor, random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const retrieveRestaurant = require('./retrieve-restaurant')


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

       

        const {_id } =  await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone, dishes: dishesIds})
        restaurantId = _id.toString()
    })
 
    it('should succeed on correct data', async() =>{
        
        let restaurant = await retrieveRestaurant(restaurantId)
        
        expect(restaurant).to.exist
        expect(restaurant).to.be.instanceof(Object)
        expect(restaurant.id).to.equal(restaurantId)
        expect(restaurant.name).to.equal(restaurantName)


    })
     

    it('should fail on wrong data', async() => { 
         
        restaurantId = restaurantId +'wrongValue'

        try {
            restaurant = await retrieveRestaurant(restaurantId)
            
        } catch (error) {

            expect(error).to.exist
            expect(error).to.be.instanceof(Error)
           
            
        }

    })

    it("should fail to retrieve the restaurant if the restaurant does not exist", async() => {
        await Restaurant.deleteMany();

        let _error;

        try {
            await retrieveRestaurant(restaurantId);
        } catch(error){
            _error = error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(UnexistenceError);
        expect(_error.message).to.equal(`restaurant with id ${restaurantId} does not exist`)
    })
    
    after(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ])

        await mongoose.disconnect()
    })
})