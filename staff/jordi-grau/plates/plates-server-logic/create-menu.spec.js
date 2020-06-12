
require('dotenv').config()
const { mongoose, models: { User, Restaurant, Menu, Plate}} = require('plates-data')
const { env: {TEST_MONGODB_URL: MONGODB_URL } } = process
const {floor, random} = Math
const  bcrypt  = require('bcryptjs')
const { expect } = require('chai')
const { utils:{ Email}, errors: { DuplicityError, VoidError, UnexistenceError }} = require('plates-commons')
const createMenu  = require('./create-menu')


describe('server logic: create menu', ()=>{
    let restaurantName, restaurantEmail, cif, address, phone
    let userEmail, password, userId
    let plateIds =[]
    let _plates = []
    
    before( async () =>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Menu.deleteMany(),
            Plate.deleteMany()
            
        ])
        
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

        const { id } = await User.create({ email: userEmail, password: hash })
        userId = id
        await Restaurant.create({ owner: userId, name: restaurantName, email: restaurantEmail, cif, address, phone })
         
        for(let i = 0; i < 5; i++){ 
            const plate = new Plate({name: `name-${i}`})

            plateIds.push(plate.id)
            _plates.push(plate)
        }

    })
    it('when menu not exists, should create a menu on correct data', async() => {
        
        const restaurant=await Restaurant.find()
        const restaurantId=restaurant[0]._id.toString()
        const result = await createMenu(userId, restaurantId, plateIds)     
        expect(result).to.be.undefined
        expect(plateIds.length).to.equal(5)
        
    })

    it('should fail on wrong data', async () =>{
        try{
        restaurantId = '5ee328fad4e15914a3946a68'
        await createMenu(userId, restaurantId, plateIds)
        throw new Error ('should not arrive here')

        } catch(error){ 
       
        expect(error).to.exist
        expect(error.message).to.equal(`restaurant with id ${restaurantId} doesn't exist`)
        
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