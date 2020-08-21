require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised } } = require('work-meeting-commons')
const createSummary = require('./create-summary')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Meeting, WorkGroup, Summary } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL
const bcrypt = require('bcryptjs')


describe('createSummary', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPaswword, userId;

    //workgroup-oriented variables
    let workGroupName, workGroupId

    //summary-oriented variables

    let title, content, summaryId;

    //meeting-oriented variables

    let _title, _content, meetingId;
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), Summary.deleteMany(), Meeting.deleteMany()])

    })
    beforeEach(async () => {
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
        title = `title-${random()}`
        content = `content-${random()}`

        //workGroup
        workGroupName = `name-${random()}`


        const user = await User.create({ name, surname, email, password: encryptedPaswword });
        userId = user.id.toString();
        const token = await jwtPromised.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1d' })
        context.storage = { token }
        const workGroup = await WorkGroup.create({ name: workGroupName, creator: userId })
        workGroupId = workGroup.id.toString()

        const meeting = await Meeting.create({ title: _title, content: _content, host: userId });
        meetingId = meeting.id.toString();
    })
    describe('asynchronous paths', () => {
        it('should succed to create a summary with a valid data', async () => {
           
            const result = await createSummary(workGroupId, meetingId, title, content)

            expect(result).to.be.not.undefined
            const [user, meeting, summary] = await Promise.all([User.findById(userId).lean(),
            Meeting.findById(meetingId).lean(),
            Summary.findOne({ title, content }).lean()]);
            expect(result._id).to.equal(summary._id.toString())
            expect(meeting).to.exist;
            expect(meeting.constructor.name).to.equal('Object');
            expect(meeting.summaries).to.be.instanceof(Array);
            expect(meeting.summaries.length).to.equal(1);
            expect(meeting.summaries[0].toString()).to.equal(summary._id.toString())

            expect(summary).to.exist
            expect(summary.constructor.name).to.equal('Object')
            expect(summary.title).to.equal(title)
            expect(summary.content).to.equal(content)
            expect(summary.meeting.toString()).to.equal(meetingId)
            expect(summary.workGroup.toString()).to.equal(workGroupId)


        })

        it('should fail to create summary if user repeat summary title', async () => {
            await Summary.create({ title, content, meeting: meetingId, workGroup: workGroupId })
            try {
                await createSummary(workGroupId, meetingId, title, content)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`summary with title ${title} already exist`)
            }

        });
        it('should fail to create a summary when user does not exist', async () => {
            await User.deleteMany()
            try {
                await createSummary(workGroupId, meetingId, title, content)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        });
        it('should fail to create a summary when workgroup does not exist', async () => {
            await WorkGroup.deleteMany()
            try {
                await createSummary(workGroupId, meetingId, title, content)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
            }
        });

        it('should fail create a summary when meeting does not exist', async () => {
            await Meeting.deleteMany()
            try {

                await createSummary(workGroupId, meetingId, title, content)

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`meeting with id ${meetingId} does not exist`)
            }
        });

    });

    describe('synchronous paths', () => {

        it('should fail on a non-string workGroupId', () => {
            workGroupId = random()
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = undefined
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = []
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = {}
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = false
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = null
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);



        });

        it('should fail on a non-string meetingId', () => {
            userId = 'random userId'

            meetingId = random()
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = undefined
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = []
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = {}
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = false
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = null
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);



        });

        it('should fail on a non-string title', () => {
            meetingId = 'random meetingId'

            title = random()
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = undefined
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = []
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = {}
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = false
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = null
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);



        });
        it('should fail on a non-string content', () => {
            title = 'random title'

            content = random();
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = undefined
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = []
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = {}
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = false
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = null
            expect(() => createSummary(workGroupId, meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);


        });
    });

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany()
        ]);
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            Meeting.deleteMany(),
            Summary.deleteMany()
        ]);
        await mongoose.disconnect();
    })

});
