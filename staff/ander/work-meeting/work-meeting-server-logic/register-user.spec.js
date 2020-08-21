require('dotenv').config()
require('work-meeting-commons/polyfills/string')
const { errors: { UnexistenceError, DuplicityError } } = require('work-meeting-commons')
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const registerUser = require('./register-user')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('work-meeting-data')
const bcrypt = require('bcryptjs')

describe('register user', () => {

    //user-oriented variables

    let name, surname, email, password, encryptedPassword

    before(async () => {
        
        await mongoose.connect(MONGODB_URL)
        await User.deleteMany()

    })
    beforeEach(async () => {
        //user-oriented
        name = `name-${random()}`
        surname = `surnname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        encryptedPassword=bcrypt.hash(password,10)
        
    })
    describe('asyncrhonous paths', () => {

        it('should succes with a valid data', async () => {
            debugger

            const result = await registerUser(name, surname, email, password)
            expect(result).to.be.undefined
            const user = await User.findOne({email})
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            const match = await bcrypt.compare(password, user.password)
            expect(match).to.be.true


        });

        /* it('should fail when email alreasdy registered', async () => {

            await User.create(name, surname, email, encryptedPassword)
            try {
                debugger
                await registerUser(name, surname, email, password)

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exist`)
            }
        }); */
        describe('when user already exists', () => {
            beforeEach(() => User.create({ name, surname, email, password }))
    
            it('should return an error when the user already exists', async () => {
                try {
                    await registerUser(name, surname, email, password)
    
                    throw new Error('should not reach this point')
    
                } catch (error) {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with email ${email} already exists`)
                }
            })
        })

    });

    describe('synchronous path', () => {
        it('should fail when name non-string', async() => {
            
            name= random()
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= false
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= null
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= undefined
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= {}
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= []
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${name} is not a string`)

            name= ''
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)

            name= '  '
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)


        });
        it('should fail when surname non-string', async() => {
            name="random name"

            surname= random()
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= false
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= null
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= undefined
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= {}
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= []
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${surname} is not a string`)

            surname= ''
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)

            surname= '  '
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)


        });
        it('should fail when name non-string', async() => {
            
            email= random()
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= null
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= undefined
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= []
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= {}
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= false
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)
            
            email= '    '
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)
            
            email= ''
            expect(()=>registerUser(name,surname,email,password)).to.throw(Error,`string is empty or blank`)
            
            email= random()
            expect(()=>registerUser(name,surname,email,password)).to.throw(TypeError,`${email} is not a string`)

            
        });
        
    });

    afterEach(async () => {
        await User.deleteMany()
    })
    after(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })

});

