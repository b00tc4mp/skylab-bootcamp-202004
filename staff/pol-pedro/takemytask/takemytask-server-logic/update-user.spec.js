require('dotenv').config()

//TODO PASS THE BODY OF REQ 

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: { User, Worker } } = require('takemytask-data')
const { ObjectId } = mongoose
const bcrypt = require('bcryptjs')

// describe('logic - register user', () => {
//     before(() => mongoose.connect(MONGODB_URL))

//     const fakeId = '5ee0ed9a603a0a4f3c650fe1'
//     let name, surname, email, password, adress, bankAcount, description, pricingHour, jobCategories, workingDistance, userId, workerId, changeName, changeName

//     beforeEach(async () => {
//         await User.deleteMany()

//         name = `name-${random()}`
//         surname = `surname-${random()}`
//         email = `e-${random()}@mail.com`
//         password = `password-${random()}`
//         adress = `street-${random()}`
//         bankAcount = `bankAcount-${random()}`
//         description = `description-${random()}`
//         pricingHour = random()*10
//         jobCategories = `jobCategories-${random()}`
//         workingDistance = random()*10

//         changeName = `changed-name-${random()}`

//         changeName = `changed-surname-${random()}`

//         const hash = await bcrypt.hash(password, 10)

//         const user = await User.create({name, surname, email, password: hash, adress})

//         const worker = await Worker.create({name, surname, email, password: hash, adress, bankAcount, description, pricingHour, jobCategories, workingDistance})

//         userId = user.id

//         workerId = worker.id
//     })

//     it('should succeed on retriving updates user', async () => {
        
//         await updateUser(userId)

//         const user = await User.find({id_: ObjectId(userId)})
//         expect(user).to.exist
//         expect(user.name).to.be.equal(user.name)
//         expect(result.surname).to.be.equal(user.surname)
//         expect(result.email).to.be.equal(user.email)
//         expect(result.adress).to.be.equal(user.adress)

//     })

//     it('should fail on retriving user', async () => {
//         result = await retriveUser(fakeId)
//             .catch( error => {
//                 expect(error).to.exist
//                 expect(error.message).to.be.equal(`user with id: ${fakeId} dont exists`)
//             })
//     })
    
//     //TODO finish test with unhappy path

//     afterEach(() => User.deleteMany())

//     after(mongoose.disconnect)
// })