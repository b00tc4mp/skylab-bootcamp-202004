require('dotenv').config();
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const {random} = Math;
const createDepartment = require('./create-department');
const {expect} = require('chai');
const {errors:{UnexistenceError,DuplicityError}} = require('work-meeting-commons')
const {mongoose,models:{User,WorkGroup, Department}} = require('work-meeting-data')
const bcrypt = require('bcryptjs')
const context = require('./context')
context.API_URL = API_URL

describe('create-department', () => {
    //user-oriented variables
    let name,surname,email,password, encryptedPassword, userId, token

    //workgroup-oriented variables

    let _name, workGroupId

    //department-oriented variables

    let departmentName
    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(),WorkGroup.deleteMany(), Department.deleteMany()])
    
    beforeEach(async()=>{

        //user-oriented
        name=`name-${random()}`
        surname=`surname-${random()}`
        email=`email-${random()}@mail.com`
        password=`pass-${random()}`
        encryptedPassword=await bcrypt.hash(password,10)

        //workgroup-oriented
        _name=`name-${random()}`, workGroupId

        //department-oriented

        departmentName=`name-${random()}`

        const user= await User.create({name,surname,email,password:encryptedPassword})
        userId = user._id.toString()
        token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn: '1d'})
        context.storage= {token}
        const workgroup = await WorkGroup.create({name:_name, creator:userId})
        workGroupId= workgroup._id.toString()

    })
    })
    describe('asynchronous paths', () => {
        it('should succed to create a department with a valid data',async () => {
            
            const result = await createDepartment(workGroupId,departmentName)
            expect(result).to.be.undefined
            const [department, workGroup] = await Promise.all([Department.findOne({name:departmentName}),
                                                    WorkGroup.findById(workGroupId).lean()]) 
            
            
            
            expect(workGroup).to.exist
            expect(workGroup.constructor.name).to.equal('Object')
            expect(workGroup.departments).to.be.instanceOf(Array)
            expect(workGroup.departments.length).to.equal(1)
            expect(workGroup.departments[0]).to.be.instanceOf(Object)

         
            expect(department).to.be.exist
            expect(department.name).to.equal(departmentName)
            expect(department.id.toString()).to.equal(workGroup.departments[0].toString())
        

        });
        it('should fail to create department whern user not exist', async() => {
            await User.deleteMany()

            try {
                await createDepartment(workGroupId,departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

            }
            

        });
        it('should fail to create department whern user not exist', async() => {
            await WorkGroup.deleteMany()

            try {
                await createDepartment(workGroupId,departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
                
            }
            

        });

        it('should fail to create department when name already exist', async() => {
            await Department.create({ name: departmentName, workGroup: workGroupId })
           
            try {
                await createDepartment(workGroupId,departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`department name ${departmentName} already exist`)
            }
        });

        it('should fail to create department when user is not creator', async() => {
            await WorkGroup.findByIdAndUpdate(workGroupId, {creator: workGroupId})
            try {
                await createDepartment(workGroupId,departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} is not workgroup creator`)
            }
        });
       
        
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', async() => {
            
            token=random()
            context.storage = {token}
            debugger
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token=false
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token=[]
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token={}
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token=undefined
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token=null
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${token} is not a string`)
            
            token=''
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(Error,'string is empty or blank')
            
            token='    '
            context.storage = {token}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(Error,'string is empty or blank')
        });

        it('should fail when workgroupId is non-string', () => {
            
            workGroupId= random()
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= undefined
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= null
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= {}
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= []
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= false
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= ''
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
            
            workGroupId='     '
            expect(()=>createDepartment(workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
        });

        it('should fail if name non-string', () => {
            
            departmentName= random()
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= false
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= undefined
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= []
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= {}
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= null
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= ''
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
            
            departmentName= '    '
            expect(()=> createDepartment(workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
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
