require('dotenv').config()
const {env: {TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET}} = process
const { mongoose, models: { User, Restaurant}} = require('plates-data')
global.fetch  = require('node-fetch')
const jwt = require('jsonwebtoken')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { DuplicityError, UnexistenceError, VoidError, CredentialsError } = require('plates-commons/errors')
const bcrypt = require('bcryptjs')
const { random } = Math
const { expect } = require('chai')
const retrieveRestaurant = require('./retrieve-restaurant')
const context = require('./context')
context.API_URL = API_URL
context.storage = {}
 
describe('client logic: retrieve restaurant', () => {
    let restaurantName, restaurantEmail, cif, address, phone, userEmail, password, userId, restaurantId, result
    
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),            
        ])

    })
 
    beforeEach(async () => {
        restaurantName = `restaurantname-${random()}`
        restaurantEmail = `restaurantemail-${random()}@gmail.com`
        cif = `cif-${random()}`
        address = `address-${random()}`
        phone = random() * 1000000000

        userEmail = `useremail-${random()}@email.com`
        password = `password-${random()}`
        const hash = await bcrypt.hash(password, 10)


        const { id } = await User.create({ email: userEmail, password: hash })
        userId = id

        const token = jwt.sign({ sub: userId }, TEST_SECRET, { expiresIn: '1d' });

        context.storage.token = token;

        const _restaurant = await Restaurant.create({ name: restaurantName, email: restaurantEmail, cif, address, phone });
        restaurantId = _restaurant.id.toString();
    })
    
    it('should retrieve a restaurant on correct data', async()=>{
        
        const restaurant = await retrieveRestaurant(restaurantId)

        expect(restaurant).to.exist;
        expect(restaurant).to.be.instanceof(Object);
        const { name, email, cif: _cif, address:_address, phone: _phone } = restaurant;
        expect(name).to.equal(restaurantName);
        expect(email).to.equal(restaurantEmail);
        expect(_cif).to.equal(cif);
        expect(_phone).to.equal(phone);
        expect(_address).to.equal(address);
    })

    it('should fail on wrong data', async ()=>{
        restaurantId = restaurantId +'wrongId'
        try {
            result = await retrieveRestaurant(restaurantId)
        } catch (error) {
           
            expect(error).to.exist
            expect(result).to.be.undefined   
        }


    })


    afterEach(async() => await Promise.all([
        User.deleteMany(),  
        Restaurant.deleteMany()      
    ]))

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany
        ]),
        await mongoose.disconnect();
    })
})

