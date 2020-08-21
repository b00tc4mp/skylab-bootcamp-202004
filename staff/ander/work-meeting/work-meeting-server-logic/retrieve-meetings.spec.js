require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User, Meeting, WorkGroup } } = require('work-meeting-data')
const {expect} = require('chai')
const {random} = Math
const retrieveMeetings = require('./retrieve-meetings')
const bcrypt = require('bcryptjs')
const { UnexistenceError } = require('work-meeting-commons/errors')

describe('retrieve meetings', () => {
    //user-oriented variables

    let name, surname, email, password, encryptedPassword, userId
   
    //workgroup-oriented variables
    let workGroupId, workGroupName
    //meeting-oriented variables
    let title,content, meetingId
    
    before(async()=>{

        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), Meeting.deleteMany()])
        
    })
    beforeEach(async()=>{
        //users-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@gmail.com`
        password = `pass-${random()}`
        encryptedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,surname,email,password: encryptedPassword})
        userId = user.id.toString()

        //workGroup-oriented
        workGroupName=`name-${random()}`
        const workGroup = await WorkGroup.create({name: workGroupName, creator: userId})
        workGroupId = workGroup.id.toString()

        //meeting-oriented
        title = `title-${random()}`
        content = `content-${random()}`
        const meeting = await Meeting.create({title, content, host:userId, workGroup: workGroupId})
        meetingId = meeting.id.toString()

        await User.findByIdAndUpdate(userId,{host:[meetingId]})

    })
    describe('asynchronous', () => {
        it('should succes to retrieve meetings with valid data', async() => {
            debugger
            const result= await retrieveMeetings(userId, workGroupId)
            expect(result).to.be.not.undefined
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(1)
            expect(result[0].content).to.equal(content)
            expect(result[0].title).to.equal(title)
            expect(result[0].id).to.equal(meetingId)
            expect(result[0].workGroup.toString()).to.equal(workGroupId)
        });

        it('should fail to retrieve meeting when user does not exist', async() => {
            await User.deleteMany()

            try {
                await retrieveMeetings(userId, workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
                
            }

            
        });
        it('should fail to retrieve meeting when user does not exist', async() => {
            await WorkGroup.deleteMany()

            try {
                await retrieveMeetings(userId, workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
                
            }

            
        });
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            
            userId=random()
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=false
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=[]
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId={}
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=undefined
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=null
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=''
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(Error,'string is empty or blank')
            
            userId='    '
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(Error,'string is empty or blank')
        });
        it('should fail on a non-string workGroup', () => {
            
            workGroupId=random()
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=false
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=[]
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId={}
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=undefined
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=null
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=''
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(Error,'string is empty or blank')
            
            workGroupId='    '
            expect(()=>retrieveMeetings(userId, workGroupId)).to.throw(Error,'string is empty or blank')
        });
    });
    afterEach(async()=>{
        await Promise.all([User.deleteMany(),Meeting.deleteMany()])
        
    })
    after(async()=>{
        await Promise.all([User.deleteMany(),Meeting.deleteMany()])
        await mongoose.disconnect()
    })
});