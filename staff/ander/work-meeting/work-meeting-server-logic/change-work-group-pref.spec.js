require('dotenv').config();
const {env:{TEST_MONGODB_URL: MONGODB_URL}} = process
const {random} = Math;
const changeWorkGroup = require('./change-work-group-pref')
const {errors:{UnexistenceError,DuplicityError}} = require('work-meeting-commons')
const {expect} = require('chai')
const {mongoose, models:{User,WorkGroup}} = require('work-meeting-data')
const bcrypt = require('bcryptjs')

describe('change work group', () => {
    //user-oriented variables
    let name,surname,email,password, encryptedPassword, userId

    //workGroup-oriented variables
    let _name, workGroupId


    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), 
                        WorkGroup.deleteMany()]
                        )
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
        it('should succes to change work group with a valid data ', async() => {
            const result= await changeWorkGroup(userId,workGroupId)
            expect(result).to.be.undefined
            const user= await User.findById(userId).lean()
            expect(user).to.exist
            expect(user.constructor.name).to.equal('Object')
            expect(user.workGroupPref.toString()).to.equal(workGroupId)
      

        });
        it('should fail to change work group when user not exist', async()=>{
            await User.deleteMany()
            try {
                await changeWorkGroup(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        })
        it('should fail to change work group when workgroup not exist', async()=>{
            await WorkGroup.deleteMany()
            try {
                await changeWorkGroup(userId, workGroupId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }
        })
    });

        describe('synchronous paths', () => {
            it('should fail on a non-string userId', () => {
                userId= random()
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= undefined
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= null
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= []
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= {}
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= false
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId= ''
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
                
                userId= '    '
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
               
                
            });
            it('should fail on a non-string workgroupId', () => {
                userId = 'random user'
                workGroupId= random()
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= undefined
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= null
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= []
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= {}
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= false
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= ''
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
                
                workGroupId= '    '
                expect(()=>changeWorkGroup(userId,workGroupId)).to.throw(Error, `string is empty or blank`)
               
                
            });
            
            
        });
        afterEach(async () => {
            await Promise.all([
                User.deleteMany(),
                WorkGroup.deleteMany()
            ]);
        })
    
        after(async () => {
            await Promise.all([
                User.deleteMany(),
                WorkGroup.deleteMany()
            ]);
            await mongoose.disconnect();
        })
});