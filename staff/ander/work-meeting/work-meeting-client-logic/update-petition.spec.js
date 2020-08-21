require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('work-meeting-commons')
const {expect} = require('chai')
const updatePetition = require('./update-petition')
const bcrypt = require('bcryptjs')
const {random} = Math
require('work-meeting-commons/polyfills/string')
const {mongoose, models: {User,WorkGroup}} = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL


describe('update Petition', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPassword, userId, token

    //workGroup-oriented variables
    let _name, workGroupId

    //petition-oriented
    let petitionId, status

    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
       
    })
    beforeEach(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])

        //user-oriented
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`e-${random()}@mail.com`
        password=`pass-${random()}`
        encryptedPassword= await bcrypt.hash(password,10)

        const user = await User.create({name, surname, email, password: encryptedPassword})
        userId=  user.id.toString()
        

        //workgroup-oriented
        _name = `name-${random()}`

        const workGroup = await WorkGroup.create({name, members:[], petitions:[{user:userId}],creator:userId})
        workGroupId= workGroup.id.toString()

        //petition-oriented
        status = 'accepted'
        petitionId = workGroup.petitions[0]._id.toString()
        debugger



    })

    describe('asynchronous paths', () => {
        it('should succes to update petition with a valid data & status=accepted', async() => {
        
            const result = await updatePetition(userId, workGroupId, petitionId, status)
            expect(result).to.be.undefined
         
            const workGroup = await WorkGroup.findById(workGroupId)
            const {petitions,members} = workGroup
            expect(petitions).to.be.instanceOf(Array)
            expect(petitions.length).to.equal(0)
            expect(members).to.be.instanceOf(Array)
            expect(members.length).to.equal(1)
            expect(members[0].toString()).to.equal(userId)
        });
        it('should succes to update petition with a valid data & status=dennied', async() => {
            const status='dennied'
            const result = await updatePetition(userId, workGroupId, petitionId, status)
            expect(result).to.be.undefined

            const workGroup = await WorkGroup.findById(workGroupId)
            const {petitions,members} = workGroup
            expect(petitions).to.be.instanceOf(Array)
            expect(petitions.length).to.equal(0)
            expect(members).to.be.instanceOf(Array)
            expect(members.length).to.equal(0)
            
        });

        it('should fail to update if user not exist', async() => {
            await User.deleteMany()
            try {
                await updatePetition(userId, workGroupId, petitionId, status)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }

        });
        it('should fail to update if workgroup not exist', async() => {
            await WorkGroup.deleteMany()
            try {
                await updatePetition(userId, workGroupId, petitionId, status)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
            }

        });
        it('should fail to update if workgroup not exist', async() => {
            const petitionId= workGroupId
            try {
                await updatePetition(userId, workGroupId, petitionId, status)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`petition with id ${petitionId} does not exist`)
            }

        });
        it('should fail to update if user already members', async() => {
            await WorkGroup.findByIdAndUpdate(workGroupId,{members:[userId]})
            try {
                await updatePetition(userId, workGroupId, petitionId, status)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} already exist`)
            }

        });


    });

    describe('synchronous paths', () => {
        it('should fail with a non-string user', () => {

            userId= random()
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= undefined
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= null
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= []
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= {}
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= false
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${userId} is not a string`)

            userId= '    '
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)

            userId= ''
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)
            
        });

        it('should fail with a non-string workgroup', () => {

            workGroupId= random()
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= undefined
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= null
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= []
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= {}
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= false
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= '    '
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)

            workGroupId= ''
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)
            
        });
        it('should fail with a non-string workgroup', () => {

            petitionId= random()
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= undefined
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= null
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= []
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= {}
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= false
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${petitionId} is not a string`)

            petitionId= '    '
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)

            petitionId= ''
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)
            
        });
        it('should fail with a non-string workgroup', () => {

            status= random()
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= undefined
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= null
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= []
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= {}
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= false
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(TypeError, `${status} is not a string`)

            status= '    '
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)

            status= ''
            expect(()=>updatePetition(userId, workGroupId, petitionId, status)).throw(Error, `string is empty or blank`)
            
        });
        
    });

    
    afterEach(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
    })

    after(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
        mongoose.disconnect()
    })
    
});