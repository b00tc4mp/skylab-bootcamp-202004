require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { floor, random } = Math;
const createSummary = require('./create-summary')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose, models: { User, Summary,Meeting , WorkGroup} } = require('work-meeting-data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs');



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

        const workGroup = await WorkGroup.create({name: workGroupName, creator: userId})
        workGroupId = workGroup.id.toString()

        const meeting = await Meeting.create({ title: _title, content: _content, host: userId });
        meetingId = meeting.id.toString();
    })
    describe('asynchronous paths', () => {
        it('should succed to create a summary with a valid data', async () => {
            debugger
            const result = await createSummary(userId, workGroupId,meetingId, title, content)
            expect(result).to.be.not.undefined
            const [user, meeting, summary] = await Promise.all([User.findById(userId).lean(),
            Meeting.findById(meetingId).lean(),
            Summary.findOne({ title, content }).lean()]);

            expect(result._id.toString()).to.equal(summary._id.toString())
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


        });

        it('should fail to create summary if user repeat summary title', async () => {
            await Summary.create({ title, content, meeting: meetingId, workGroup: workGroupId })
            try {
                await createSummary(userId, workGroupId,meetingId, title, content)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal(`summary with title ${title} already exist`)
            }

        });
        it('should fail to create a summary when user does not exist', async () => {
            await User.deleteMany()
            try {
                await createSummary(userId, workGroupId,meetingId, title, content)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        });
        it('should fail to create a summary when workgroup does not exist', async () => {
            await WorkGroup.deleteMany()
            try {
                await createSummary(userId, workGroupId,meetingId, title, content)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
            }
        });

        it('should fail create a summary when meeting does not exist', async () => {
            await Meeting.deleteMany()
            try {

                await createSummary(userId, workGroupId,meetingId, title, content)

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`meeting with id ${meetingId} does not exist`)
            }
        });

    });

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            userId = random()
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = undefined
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = []
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = {}
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = false
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = null
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${userId} is not a string`);

            userId = ''
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

            userId = '    '
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

        });
        it('should fail on a non-string workGroupId', () => {
            workGroupId = random()
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = undefined
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = []
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = {}
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = false
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = null
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${workGroupId} is not a string`);

            workGroupId = ''
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

            workGroupId = '    '
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

        });

        it('should fail on a non-string meetingId', () => {
            userId='random userId'

            meetingId = random()
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId  = undefined
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId = []
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId  = {}
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId  = false
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId  = null
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${meetingId} is not a string`);

            meetingId  = ''
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

            meetingId  = '    '
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

        });

        it('should fail on a non-string title', () => {
            meetingId='random meetingId'

            title = random()
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title  = undefined
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title = []
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title  = {}
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title  = false
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title  = null
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${title} is not a string`);

            title  = ''
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

            title  = '    '
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

        });
        it('should fail on a non-string content', () => {
            title='random title'
            
            content = random();
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content  = undefined
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content = []
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content  = {}
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content  = false
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content  = null
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(TypeError, `${content} is not a string`);

            content  = ''
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

            content  = '    '
            expect(() => createSummary(userId, workGroupId,meetingId, title, content)).to.throw(Error, `string is empty or blank`);

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
