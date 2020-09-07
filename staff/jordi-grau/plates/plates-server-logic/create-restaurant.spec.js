require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { DuplicityError } = require('plates-commons/errors')
const bcrypt = require('bcryptjs')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Restaurant, Dish } } = require('plates-data')
const createRestaurant = require('./create-restaurant')


describe('server logic: create restaurant', () => {
    let restaurantName, restaurantEmail, cif, address, phone
    let userEmail, password, userId

    before(async () => {
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
    })


    it('should create a restaurant on correct data', async () => {
        const result = await createRestaurant( userId, restaurantName, restaurantEmail, cif, address, phone)

        const restaurant = await Restaurant.findOne({ cif })

        expect(restaurant).to.exist
        expect(restaurant).to.be.instanceof(Object);
        expect(restaurant.name).to.equal(restaurantName);
        expect(restaurant.cif).to.equal(cif);
        expect(restaurant.email).to.equal(restaurantEmail);
        expect(restaurant.phone).to.equal(phone)

    })


    it('should not create a restaurant with wrong data', async () => {

        const result = await createRestaurant(userId, restaurantName, restaurantEmail, cif, address, phone)

        cif += 'invalid'
        const restaurant = await Restaurant.findOne({ cif })

        expect(result).to.be.undefined
        expect(restaurant).to.be.null

    })


    describe('When restaurant already exists', () => {

        beforeEach(async () => {

            await Restaurant.create({  name: restaurantName, email: restaurantEmail, cif, address, phone })

        })

        it('should fail and throw error on restaurant duplicity', async () => {
            try {
               const result = await createRestaurant(userId, restaurantName, restaurantEmail, cif, address, phone)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceof(DuplicityError)
                expect(error.message).to.equal(`restaurant cif with ${cif} already exists`)
            }
        })
    })
})