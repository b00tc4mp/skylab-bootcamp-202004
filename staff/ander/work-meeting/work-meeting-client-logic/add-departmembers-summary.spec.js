require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const { random } = Math;
const addMembers = require('./add-departmembers-summary')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose, models: { User, Summary,Meeting ,Department, WorkGroup} } = require('work-meeting-data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs');
const context = require('./context')
context.API_URL = API_URL



describe('add-depart-members', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPaswword, userId;

    //workgroup-oriented variables
    let workGroupName, workGroupId

    //summary-oriented variables

    let title, content, summaryId;

    //meeting-oriented variables
    let _title, _content, meetingId;
    //department
    let departName, departmentId

    
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), Summary.deleteMany(), Meeting.deleteMany(), WorkGroup.deleteMany()])

    })
    beforeEach(async () => {
        debugger
        //user-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        encryptedPaswword = await bcrypt.hash(password, 10)

        //meeting-oriented
        _title = `title-${random()}`
        _content = `content-${random()}`

        //summary-oriented
        title = `sumTitle-${random()}`
        content = `sumContent-${random()}`


        //workGroup
        workGroupName = `name-${random()}`

        //department
        departName = `name-${random()}`


        const user = await User.create({ name, surname, email, password: encryptedPaswword });
        userId = user.id.toString();

        const workGroup = await WorkGroup.create({name: workGroupName, creator: userId})
        workGroupId = workGroup.id.toString()

        const meeting = await Meeting.create({ title: _title, content: _content, host: userId });
        meetingId = meeting.id.toString();
        const summary= await Summary.create({title, content, meeting: meetingId, workGroup: workGroupId, members:[]})
        summaryId = summary.id.toString()
        const department= await Department.create({name: departName, members:[userId], workGroup: workGroupId})
        debugger
        departmentId=department.id.toString()
    })
    describe('asynchronous paths', () => {
        it('should succed to create a summary with a valid data', async () => {
            
            const result = await addMembers(departmentId, summaryId)
            expect(result).to.be.undefined

            const summary= await Summary.findOne({ title, content }).lean();
            const user= await User.findById(userId).lean()

            expect(user.summaries).to.be.instanceOf(Array)
            expect(user.summaries.length).to.equal(1)
            expect(user.summaries[0].toString()).to.equal(summaryId)
            
            
            expect(summary).to.exist
            expect(summary.constructor.name).to.equal('Object')
            expect(summary.title).to.equal(title)
            expect(summary.content).to.equal(content)
            expect(summary.members[0].toString()).to.equal(userId)
            
           


        })

      
        it('should fail to add member in summary when department not exist', async () => {
            await Department.deleteMany()
            try {
                await addMembers(departmentId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`department with id ${departmentId} does not exist`)
            }
        });
        it('should fail to add member in summary when summary does not exist', async () => {
            await Summary.deleteMany()
            try {
                await addMembers(departmentId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`summary with id ${summaryId} does not exist`)
            }
        });

    });

    describe('synchronous paths', () => {
        it('should fail on a non-string departmentId', () => {
            departmentId = random()
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = undefined
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = []
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = {}
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = false
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = null
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${departmentId} is not a string`);

            departmentId = ''
            expect(() => addMembers(departmentId, summaryId)).to.throw(Error, `string is empty or blank`);

            departmentId = '    '
            expect(() => addMembers(departmentId, summaryId)).to.throw(Error, `string is empty or blank`);

        });
        it('should fail on a non-string department', () => {
            summaryId = random()
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = undefined
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = []
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = {}
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = false
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = null
            expect(() => addMembers(departmentId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`);

            summaryId = ''
            expect(() => addMembers(departmentId, summaryId)).to.throw(Error, `string is empty or blank`);

            summaryId = '    '
            expect(() => addMembers(departmentId, summaryId)).to.throw(Error, `string is empty or blank`);

        });

    });

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany(),
            Department.deleteMany()
        ]);
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany(),
            Department.deleteMany()
        ]);
        await mongoose.disconnect();
    })

});
