require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const bcrypt = require('bcryptjs')
const searchWorkGroup= require('./search-work-groups')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - search work groups', () => {
    //user-oriented-variable
    let name, surname, email, password, encryptedPassword, userId
    //second-user oriented-variable
    let _email, _userId

    //workgroup-oriented-variable
    let workGroupName, workGroupId, query

    before(async() =>{mongoose.connect(MONGODB_URL)
                    await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])})

    

    beforeEach(async() =>{
        
    await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
            //user-oriented
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            encryptedPassword= await bcrypt.hash(password,10)

            //secondUser
            _email = `e-${random()}@mail.com`

            //workgroup-oriented
            workGroupName = "dreamTeam"
            query= "dre"

            const user = await User.create({name,surname,email,password:encryptedPassword})
            userId= user.id.toString()

            const _user = await User.create({name,surname,email: _email,password:encryptedPassword})
            _userId= _user.id.toString()

            const workGroup = await WorkGroup.create({name: workGroupName, creator: userId})
            workGroupId = workGroup.id.toString()
        
            
    })
   
    describe('asynchronous paths', () => {
        

        it('should succeed on correct data', async () =>{
            debugger
            const result = await searchWorkGroup(_userId,query)
            debugger
            expect(result).to.not.be.undefined
            expect(result.constructor.name).to.equal('Array')
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(workGroupName)
            expect(result[0].id).to.equal(workGroupId)

                
        }) 
        it('should succeed on upper case querys', async () =>{
            const query = "amte"
            debugger
            const result = await searchWorkGroup(_userId,query)

            expect(result).to.not.be.undefined
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(workGroupName)
            expect(result[0].id).to.equal(workGroupId)

                
        })

        it('should fails when the query finds nothing', () => {
            
            const query = 'aaaaaaa'
            
             return searchWorkGroup(_userId,query)
                .then(() => {throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(("there is no answer for your search"))
                })
        })
        it('should fails when user not exist', async () =>{
            await User.deleteMany()
            try {
                await searchWorkGroup(userId,query)
                throw new Error('should not reach this point')
            } catch (error) {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal((`user with Id ${userId} not exist`))
            }
   
        })

    })

    describe('syncrhonous path', () => {
        it('should fail when user non-string', () => {
            
            userId = random()
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = null
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = undefined
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = false
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = []
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = {}
            expect(()=>searchWorkGroup(userId, query)).throw(TypeError, `${userId} is not a string`)

            userId = ''
            expect(()=>searchWorkGroup(userId, query)).throw(Error, `string is empty or blank`)

            userId = '    '
            expect(()=>searchWorkGroup(userId, query)).throw(Error, `string is empty or blank`)
        });

        it('should fail when query is non-string', () => {
            userId= "random userId"

            query=random()
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query=undefined
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query=null
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query=[]
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query={}
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query=false
            expect(()=>searchWorkGroup(userId,query)).throw(TypeError, `${query} is not a string`)

            query=''
            expect(()=>searchWorkGroup(userId,query)).throw(Error, `string is empty or blank`)

            query='    '
            expect(()=>searchWorkGroup(userId,query)).throw(Error, `string is empty or blank`)
        });
    });

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(async ()=> await mongoose.disconnect())
})