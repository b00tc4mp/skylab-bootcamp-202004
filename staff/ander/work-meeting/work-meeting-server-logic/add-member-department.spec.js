require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process;
const { random } = Math;
const addMember = require('./add-member-department')
const { errors: { UnexistenceError, DuplicityError } } = require('work-meeting-commons')
const { mongoose, models: { User, WorkGroup, Department } } = require('work-meeting-data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs');


describe('add member department', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPassword, userId

    //workgroup-oriented variables
    let _name, workGroupId

    //department-oriented variables
    let departmentName, departmentId

    before(async () => {
        mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(),
        WorkGroup.deleteMany(),
        Department.deleteMany()])
    })
    beforeEach(async () => {

        //user-oriented
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id.toString();

        //workgroup-oriented
        _name = `name-${random()}`
        
        
        //department-oriented
        departmentName = `name-${random()}`
        

        const workGroup = await WorkGroup.create({ name: _name, creator: userId })
        workGroupId= workGroup.id.toString()
        debugger

        const department = await Department.create({name: departmentName, workGroup:workGroupId})
        departmentId=department.id.toString()
    })
    describe('asynchronous paths', () => {
        it('should succes with a valid data', async () => {
            debugger
            const result = await addMember(userId, workGroupId, departmentId)
            expect(result).to.be.undefined

            const [workGroup, department] = await Promise.all([WorkGroup.findById(workGroupId).lean(), Department.findById(departmentId)])
            expect(workGroup).to.exist
            expect(workGroup.constructor.name).to.equal('Object')
            expect(workGroup.departments).to.be.instanceOf(Array)
            debugger
            expect(department.workGroup.toString()).to.equal(workGroupId)
            expect(department.members[0].toString()).to.equal(userId)
           
        });

        it('should fail when user not exist', async () => {
            await User.deleteMany()
            try {
                await addMember(userId, workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }

        });

        it('should fail when workgroup not exist', async () => {

            await WorkGroup.deleteMany()
            try {
                await addMember(userId, workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)

            }
        });

        it('should fail when user is already member', async () => {
           
            await Department.findByIdAndUpdate(departmentId,{members:[userId]})
            try {
                await addMember(userId, workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`user with id ${userId} already added in departments`)

            }
        });
        it('should fail when department not exist', async () => {
           
            await Department.deleteMany()
            try {
                await addMember(userId, workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`department wirh id ${departmentId} does not exist`)

            }

        });
    });

    afterEach(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(),Department.deleteMany()])
    })
    after(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(),Department.deleteMany()])
        await mongoose.disconnect()
    })


});



