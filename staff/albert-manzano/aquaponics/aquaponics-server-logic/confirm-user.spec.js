require('dotenv').config

const { env :{ TEST_MONGODB_URL: MONGODB_URL} } = process
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: {User} }= require('aquaponics-data')
const  confirmUser  = require ('./confirm-user')


describe('logic - confirm-user',()=>{
    before(()=>mongoose.connect(MONGODB_URL))

    let name, surname, email, password, role, phone
    let userId

    beforeEach(()=>
        User.deleteMany()
            .then(()=>{
                name=`name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'user'
                phone = random()
            })
    )
            
    describe('when user exist', ()=>{
        beforeEach(()=>{
            const user= {name,surname,email,password,role,phone}

            return User.create(user)
                .then(result => userId = result.id)
        })

        it('should confirm the user registered',() => {
            return confirmUser(userId)
                .then(user =>{
                    expect(user.confirmed).to.be.true
                })
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            confirmUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            confirmUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            confirmUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'
        return confirmUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with ${userId} does not exist`)
            })
    })

   
    afterEach(async() =>await User.deleteMany())

    after(async() => await mongoose.disconnect)
})