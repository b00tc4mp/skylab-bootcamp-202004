require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const { mongoose, models: { User, Meeting, WorkGroup } } = require('work-meeting-data')
const {expect} = require('chai')
const {random} = Math
const retrieveMeetings = require('./retrieve-meetings')
const bcrypt = require('bcryptjs')
const context = require('./context')
context.API_URL = API_URL

describe('retrieve meetings', () => {
    //user-oriented variables

    let name, surname, email, password, encryptedPassword, userId, token
   
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
        token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn:'1d'})
        context.storage = {token}

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
            const result= await retrieveMeetings(workGroupId)
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
                await retrieveMeetings(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
                
            }

            
        });
        it('should fail to retrieve meeting when user does not exist', async() => {
            await WorkGroup.deleteMany()

            try {
                await retrieveMeetings(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
                
            }

            
        });
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            
            token=random()
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token=false
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token=[]
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token={}
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token=undefined
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token=null
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${token} is not a string`)
            
            token=''
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(Error,'string is empty or blank')
            
            token='    '
            context.storage = {token}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(Error,'string is empty or blank')
        });
        it('should fail on a non-string workGroup', () => {
            
            workGroupId=random()
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=false
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=[]
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId={}
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=undefined
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=null
            expect(()=>retrieveMeetings(workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId=''
            expect(()=>retrieveMeetings(workGroupId)).to.throw(Error,'string is empty or blank')
            
            workGroupId='    '
            expect(()=>retrieveMeetings(workGroupId)).to.throw(Error,'string is empty or blank')
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