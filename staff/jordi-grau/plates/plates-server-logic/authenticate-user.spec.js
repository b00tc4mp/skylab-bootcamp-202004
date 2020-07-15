require('dotenv').config()
const {env: { TEST_MONGODB_URL: MONGODB_URL }} = process
// global.fetch  = require('node-fetch')
const {UnexistenceError, VoidError } = require('plates-commons/errors')
const bcrypt = require('bcryptjs')
const { floor, random } = Math
const {expect} = require('chai')
const {mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
const authenticateUser = require('./authenticate-user')


describe('authenticateUser', () => {
    let name, surname, email, password, userId

    before(async()=> {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany(),
            
        ])
    })

    beforeEach(async() =>
        User.deleteMany()
        
            .then(() =>{
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `email.${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })

            .then(_hash => hash = _hash)
    )

    describe('When user already exists', () => {
        beforeEach(() =>
            User.create({name, surname, email, password: hash})
            .then(user => UserId = user.id)
        )

        it('should authenticate user on correct credentials', async()=>{
            authenticateUser(email, password)

            .then(_userId => expect(userId).to.equal(userId))
        })

        it('Should fail to authenticate user on wrorg email',async() =>{
            email += 'xxx'
            let id
            try {
              id =  await authenticateUser(email, password)
                
            } catch (error) {
                
                expect(id).to.be.undefined
                expect(error).to.exist
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            }
        })

        it('Should fail to authenticate user on wrong password', async()=>{
            password += 'xxx' 
            let id

            try {
                id =  await authenticateUser(email, password)
                  
              } catch (error) {
                  
                  expect(id).to.be.undefined
                  expect(error).to.exist
                  expect(error.message).to.equal('wrong password')
              }
        })

        it('Should fail to authenticate when user doesnt exists', async() =>{
            try{ 

            id = await authenticateUser(email, password)

            } catch (error){

                expect(id).to.be.undefined
                expect(error).to.exist
                expect(error.message).to.equal((`user with e-mail ${email} does not exist`))
            }
        })

    })


    afterEach(() => User.deleteMany())

    after(async()=> {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany(),
            
        ])
        await mongoose.disconnect()        
    })

})