require('dotenv').config();
const {env: {TEST_MONGODB_URL:MONGODB_URL}} = process;
const {random} = Math;
const createDepartment = require('./create-department');
const {expect} = require('chai');
const {errors:{UnexistenceError,DuplicityError}} = require('work-meeting-commons')
const {mongoose,models:{User,WorkGroup, Department}} = require('work-meeting-data')
const bcrypt = require('bcryptjs')

describe('create-department', () => {
    //user-oriented variables
    let name,surname,email,password, encryptedPassword, userId

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

        const workgroup = await WorkGroup.create({name:_name, creator:userId})
        workGroupId= workgroup._id.toString()

    })
    })
    describe('asynchronous paths', () => {
        it('should succed to create a department with a valid data',async () => {
            
            const result = await createDepartment(userId,workGroupId,departmentName)
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
            debugger


        });
        it('should fail to create department whern user not exist', async() => {
            await User.deleteMany()

            try {
                await createDepartment(userId, workGroupId, departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

            }
            

        });
        it('should fail to create department whern user not exist', async() => {
            await WorkGroup.deleteMany()

            try {
                await createDepartment(userId, workGroupId, departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
                
            }
            

        });

        it('should fail to create department when name already exist', async() => {
            await Department.create({ name: departmentName, workGroup: workGroupId })
           
            try {
                await createDepartment(userId, workGroupId, departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`department name ${departmentName} already exist`)
            }
        });

        it('should fail to create department when user is not creator', async() => {
            await WorkGroup.findByIdAndUpdate(workGroupId, {creator: workGroupId})
            try {
                await createDepartment(userId,workGroupId,departmentName)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} is not workgroup creator`)
            }
        });
       
        
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            
            userId=random()
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=false
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=[]
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId={}
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=undefined
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=null
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${userId} is not a string`)
            
            userId=''
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(Error,'string is empty or blank')
            
            userId='    '
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(Error,'string is empty or blank')
        });

        it('should fail when workgroupId is non-string', () => {
            
            workGroupId= random()
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= undefined
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= null
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= {}
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= []
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= false
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${workGroupId} is not a string`)
            
            workGroupId= ''
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
            
            workGroupId='     '
            expect(()=>createDepartment(userId,workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
        });

        it('should fail if name non-string', () => {
            
            departmentName= random()
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= false
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= undefined
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= []
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= {}
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= null
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(TypeError,`${departmentName} is not a string`)
            
            departmentName= ''
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
            
            departmentName= '    '
            expect(()=> createDepartment(userId,workGroupId,departmentName)).to.throw(Error,`string is empty or blank`)
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
