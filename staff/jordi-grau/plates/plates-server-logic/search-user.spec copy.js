require('dotenv').config()
const {  env: {TEST_MONGODB_URL: MONGODB_URL} } = process
const {utils: { Email }, errors: {DuplicityError, UnexistanceError, VoidError}} = require('plates-commons')
const  { mongoose , models:{ User, Restaurant, Menu, Plate }}  = require('plates-data')
const {floor, random } = Math
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const searchUser = require('./search-user')


describe('search user', () =>{
    let name, surname, email, password, _email, user


    before(async () =>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Menu.deleteMany(),
            Plate.deleteMany()
        ])

    })

    beforeEach( async() =>{
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@gmail.com`
        password = `password-${random()}`

        const newUser = await User.create({name: name, surname: surname, email: email, password: password})
        user = newUser.email
    })


    it('should succeed on correct data', async() =>{

        const result = await searchUser(email)

        expect(result).to.exist
        
        

    })

    it('should fail on wrong data', async () =>{

    })
})