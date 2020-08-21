require('dotenv').config();
const {env:{TEST_MONGODB_URL: MONGODB_URL}} = process
const {random} = Math;
const addPetition = require('./add-petition')
const {errors:{UnexistenceError,DuplicityError}} = require('work-meeting-commons')
const {expect} = require('chai')
const {mongoose, models:{User,WorkGroup,Petition}} = require('work-meeting-data')
const bcrypt = require('bcryptjs')

describe('addPetition', () => {
    //user-oriented variables
    let name,surname,email,password, encryptedPassword, userId

    //workGroup-oriented variables
    let _name, workGroupId

    //Petition-oriented variables
    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), 
                        WorkGroup.deleteMany(), 
                        Petition.deleteMany()])
    })
    beforeEach(async()=>{
        //user-oriented
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`email-${random()}@mail.com`
        password=`pass-${random()}`
        encryptedPassword= await bcrypt.hash(password,10)

        //workGroup-oriented
        _name=`name-${random()}`

        const user = await User.create({name,surname,email,password : encryptedPassword})
        userId= user._id.toString()

        const workGroup = await WorkGroup.create({name :_name, creator: userId})
        workGroupId= workGroup._id.toString()

    })
    describe('asynchrous paths', () => {
        it('should succes to add petition with a valid data ', async() => {
            const result= await addPetition(userId,workGroupId)
            expect(result).to.be.undefined
            const workGroup = await WorkGroup.findById(workGroupId).lean()
            expect(workGroup).to.exist
            expect(workGroup.constructor.name).to.equal('Object')
            expect(workGroup.petitions).to.be.instanceOf(Array)
            debugger
            expect(workGroup.petitions.length).to.equal(1)
            expect(workGroup.petitions[0].user.toString()).to.equal(userId)

        });
        it('should fail to add petition when user not exist', async()=>{
            await User.deleteMany()
            try {
                await addPetition(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        })
        it('should fail to add petition when workgroup not exist', async()=>{
            await WorkGroup.deleteMany()
            try {
                await addPetition(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }
        })
        it('should fail to add petition user is already a member', async()=>{
            await WorkGroup.findByIdAndUpdate(workGroupId, {members:userId})
            try {
                await addPetition(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`user with id ${userId} is already a member`)
            }
        })
        it('should fail to add petition when user already send petition', async()=>{
            await WorkGroup.findByIdAndUpdate(workGroupId, {petitions:[{user:userId}]})
            try {
                await addPetition(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`user with id ${userId} already send petition`)
            }
        })
    });

        describe('synchronous paths', () => {
            it('should fail on a non-string userId', () => {
                userId= random()
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= undefined
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= null
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= []
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= {}
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= false
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= ''
                expect(()=>addPetition(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
                
                userId= '    '
                expect(()=>addPetition(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
               
                
            });
            it('should fail on a non-string workgroupId', () => {
                userId = 'random user'
                workGroupId= random()
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= undefined
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= null
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= []
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= {}
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= false
                expect(()=>addPetition(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= ''
                expect(()=>addPetition(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
                
                workGroupId= '    '
                expect(()=>addPetition(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
               
                
            });
            
            
        });
        afterEach(async () => {
            await Promise.all([
                User.deleteMany(),
                WorkGroup.deleteMany(),
                Petition.deleteMany()
            ]);
        })
    
        after(async () => {
            await Promise.all([
                User.deleteMany(),
                WorkGroup.deleteMany(),
                Petition.deleteMany()
            ]);
            await mongoose.disconnect();
        })
});