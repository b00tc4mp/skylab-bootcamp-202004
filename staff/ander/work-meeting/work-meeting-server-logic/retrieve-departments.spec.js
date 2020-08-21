require('dotenv').config()
const {env:{TEST_MONGODB_URL:MONGODB_URL}} = process
const {random} = Math
const retrieveDepartments = require('./retrieve-departments')
const {errors:{UnexistenceError} }= require('work-meeting-commons')
const {mongoose, models:{User, WorkGroup,Department}} = require('work-meeting-data')
const {expect} = require('chai')
const bcrypt = require('bcryptjs')

describe('retrieve user', () => {
    //user-oriented-variables
    let name, surname, email, password, encryptedPassword, userId

    //workGroup-oriented variables
    let _name, workGroupId

    //department-oriented variables
    let departmentName, departmentId

    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Department.deleteMany()])
    })
    beforeEach(async()=>{

        //user-oriented
        name= `name-${random()}`
        surname= `surname-${random()}`
        email= `email-${random()}@gmail.com`
        password= `pass-${random()}`
        encryptedPassword= await bcrypt.hash(password,10)

        //workgroup-oriented
        _name= `name-${random()}`

        //department-oriented
        departmentName= `name-${random()}`
        debugger
        const user= await User.create({name,surname,email,password:encryptedPassword})
        userId= user.id.toString()
        const workGroup = await WorkGroup.create({name:_name, creator: userId})
        workGroupId= workGroup.id.toString()
        const department = await Department.create({name: departmentName, workGroup: workGroupId})
        departmentId = department.id.toString()
   
    })

    describe('asynchronous paths', () => {
        it('should succes with valid data', async() => {
            debugger
            const result= await retrieveDepartments(userId, workGroupId)
            expect(result).to.be.not.undefined
            expect(result.constructor.name).to.equal('Array')
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(departmentName)
            expect(result[0].workGroup.toString()).to.equal(workGroupId)
            
        });
        it('should fail if user does not exist', async() => {
            await User.deleteMany()
            try {
                await retrieveDepartments(userId,workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }

        });
        it('should fail if workgroup does not exist', async() => {
            await WorkGroup.deleteMany()
            try {
                await retrieveDepartments(userId,workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }

        });
        it('should fail if user is not workGroup creator', async() => {
            let _email = `e-${random()}@gmail.com`
            const _user =  await User.create({name, surname, email:_email, password:encryptedPassword})
            _userId= _user.id.toString()
            try {
                await retrieveDepartments(_userId,workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${_userId} is not creator`)
            }

        });
    });
        describe('synchronous path', () => {
            it('should fail on a non-string userId', () => {
            
                userId=random()
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId=false
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId=[]
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId={}
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId=undefined
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId=null
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${userId} is not a string`)
                
                userId=''
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(Error,'string is empty or blank')
                
                userId='    '
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(Error,'string is empty or blank')
            });

            it('should fail when workgroupId is non-string', () => {
                
                workGroupId= random()
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= undefined
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= null
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= {}
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= []
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= false
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(TypeError,`${workGroupId} is not a string`)
                
                workGroupId= ''
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(Error,`string is empty or blank`)
                
                workGroupId='     '
                expect(()=>retrieveDepartments(userId,workGroupId)).to.throw(Error,`string is empty or blank`)
            });
            
        });
    
    afterEach(async()=>{
        await Promise.all([User.deleteMany(),WorkGroup.deleteMany(), Department.deleteMany()])
    })

    after(async()=>{
        await Promise.all([User.deleteMany(),WorkGroup.deleteMany(), Department.deleteMany()])
        await mongoose.disconnect()
    })
    
});
