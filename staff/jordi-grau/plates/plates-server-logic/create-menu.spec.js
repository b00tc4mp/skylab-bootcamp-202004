
require('dotenv').config()
const { mongoose, models: { User, Restaurant, Dish}} = require('plates-data')
const { env: {TEST_MONGODB_URL: MONGODB_URL } } = process
const {floor, random} = Math
const  bcrypt  = require('bcryptjs')
const { expect } = require('chai')
const { utils:{ Email}, errors: { DuplicityError, VoidError, UnexistenceError }} = require('plates-commons')
const createMenu  = require('./create-menu')


describe('server logic: create menu', ()=>{
    let restaurantName, restaurantEmail, cif, address, phone, restauranId
    let userEmail, password, userId
    let dishesIds =[]
    let _dish = []
    
    before( async () =>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
            
        ])
        
    })

    after(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ])

        await mongoose.disconnect()
    })

    beforeEach( async () =>{
        restaurantName = `restaurantName-${random()}`
        restaurantEmail = `restaurantEmail-${random()}@email.com`
        cif = `cif-${random()}`
        address = `address-${random()}`
        phone = random() * 100000000
        userEmail = `useremail-${random()}@email.com`
        password = `password-${random()}`
        const hash = await bcrypt.hash(password, 10)
        const dish = Dish.create({name: 'Tortilla de patatas'})
        let dishId = dish.id
        const { id } = await User.create({ email: userEmail, password: hash })
        userId = id
        const restaurant = await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone, dishes: dishId })
         restaurantId = restaurant._id.toString()
        for(let i = 0; i < 5; i++){ 
            const dish = new Dish({name: `name-${i}`})

            dishesIds.push(dish.id)
            _dish.push(dish)
        }

    })
    
    it('when menu not exists, should create a menu on correct data', async() => {
        debugger
        const _dish =  await Dish.create({restaurantId: restaurantId, name: 'Arroz'})
        let _dishId = _dish.id
        const result = await createMenu(userId, restaurantId, _dishId)  
        const restaurant = await Restaurant.findById(restaurantId)   
        
        expect(result).to.be.undefined
        expect(restaurant.dishes[0].toString()).to.equal(_dishId)
        
    })
debugger
    it('should fail on wrong data', async () =>{
        try{
        restaurantId = '5ee328fad4e15914a3946a68'
        await createMenu(userId, restaurantId, dishesIds)
        throw new Error ('should not arrive here')

        } catch(error){ 
       
        expect(error).to.exist
        expect(error.message).to.equal(`restaurant with id ${restaurantId} doesn't exist`)
        
        }
    })
  
  
        it('should fail if no user is finded', async ()=>{
        

            restaurantName = `restaurantName-${random()}`
            restaurantEmail = `restaurantEmail-${random()}@email.com`
            cif = `cif-${random()}`
            address = `address-${random()}`
            phone = random() * 100000000
            userEmail = `useremail-${random()}@email.com`
            password = `password-${random()}`
            const hash = await bcrypt.hash(password, 10)
            const dish = Dish.create({name: 'Tortilla de patatas'})
            let dishId = dish.id
            const { id } = await User.create({ email: userEmail, password: hash })
            userId = id + 'wrongId'
            const restaurant = await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone, dishes: dishId })
             restaurantId = restaurant.id
            for(let i = 0; i < 5; i++){ 
                const dish = new Dish({name: `name-${i}`})
    
                dishesIds.push(dish.id)
                _dish.push(dish)
            }
                userId = userId + "jjj"
        try {
            createMenu(userId, restaurantId, dishesIds)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceof(UnexistanceError)    
        }
    })

    




/* TODO IN NEXT APROACH
    describe('when menu exists', ()=>{

        beforeEach(async() => {
          
           const { id }= await  Menu.create({plates})
           await Restaurant.findByIdAndUpdate(restauranId, {menu: id})
        })



        it("won't be able to create a menu", async() =>{


            try {
                await createMenu(userId, restaurantId, plateIds)
                
            } catch (error) {
                expect(error).to.exist
            }

        })

    })
*/

})